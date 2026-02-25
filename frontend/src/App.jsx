import { useState, useEffect } from "react";
import Home from "./page/Home";
import Learn from "./page/Learn";
import { CURRENT_LANGUAGE,setCurrentLanguage, formatLanguagePair, getAvailableLanguages } from "./api/api";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedContext, setSelectedContext] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);

  useEffect(() => {
    loadAvailableLanguages();
  }, []);

  const loadAvailableLanguages = async () => {
    try {
      const languages = await getAvailableLanguages();
      setAvailableLanguages(languages);
    } catch (error) {
      console.error("Error loading languages:", error);
    } finally {
      setLoadingLanguages(false);
    }
  };

  const handleSelectContext = (context) => {
    setSelectedContext(context);
    setCurrentPage("level");
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    setCurrentPage("learn");
  };

  const handleBackToHome = () => {
    setSelectedContext(null);
    setSelectedLevel(null);
    setCurrentPage("home");
  };

  const handleBackToLevel = () => {
    setSelectedLevel(null);
    setCurrentPage("level");
  };

  const handleChangeLanguage = (newLanguage) => {
  if (newLanguage !== CURRENT_LANGUAGE) {
    // 1. Update the variable and localStorage via our API helper
    setCurrentLanguage(newLanguage);
    
    // 2. Close the dropdown
    setShowLanguageSwitcher(false);
    
    // 3. Option A: Reset state to go home and force data refresh
    setCurrentPage("home");
    setSelectedContext(null);
    setSelectedLevel(null);
    
    // Option B (Recommended): Force a quick reload to ensure all 
    // internal API states and caches are cleared for the new language
    window.location.reload(); 
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🎧</div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Learn Languages
                </h1>
                <p className="text-sm text-gray-600">Listen · Pause · Repeat</p>
              </div>
            </div>

            {/* Language Switcher Button */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageSwitcher(!showLanguageSwitcher)}
                className="flex items-center space-x-2 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-full transition-colors duration-200"
              >
                <span className="text-lg">🌍</span>
                <span className="text-sm font-medium text-indigo-900 hidden sm:inline">
                  {formatLanguagePair(CURRENT_LANGUAGE)}
                </span>
                <svg className={`w-4 h-4 text-indigo-900 transition-transform duration-200 ${showLanguageSwitcher ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Language Dropdown Menu */}
              {showLanguageSwitcher && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Available Languages</p>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {loadingLanguages ? (
                      <div className="p-4 text-center text-gray-500">
                        <p>Loading languages...</p>
                      </div>
                    ) : availableLanguages.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <p>No languages found</p>
                      </div>
                    ) : (
                      availableLanguages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => handleChangeLanguage(lang)}
                          className={`w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 ${
                            lang === CURRENT_LANGUAGE
                              ? 'bg-indigo-100 border-l-4 border-l-indigo-600'
                              : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">
                              {formatLanguagePair(lang)}
                            </span>
                            {lang === CURRENT_LANGUAGE && (
                              <span className="text-indigo-600">✓</span>
                            )}
                          </div>
                        </button>
                      ))
                    )}
                  </div>

                  <div className="p-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      💡 for any probléme check <code className="bg-gray-200 px-2 py-1 rounded text-gray-800">api.js</code>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {currentPage === "home" ? (
          <Home onSelectContext={handleSelectContext} />
        ) : currentPage === "level" ? (
          <LevelSelector
            context={selectedContext}
            onSelectLevel={handleSelectLevel}
            onBack={handleBackToHome}
          />
        ) : (
          <Learn
            context={selectedContext}
            level={selectedLevel}
            onBack={handleBackToHome}
            onBackToLevel={handleBackToLevel}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            Learning {formatLanguagePair(CURRENT_LANGUAGE)}
          </p>
          <p className="text-xs text-gray-500 mt-2">Master languages through real-world contexts</p>
        </div>
      </footer>
    </div>
  );
}

// Level Selector Component
function LevelSelector({ context, onSelectLevel, onBack }) {
  const levels = [
    {
      id: "beginner",
      label: "Beginner",
      emoji: "🌱",
      description: "Start your journey with simple phrases and basic vocabulary",
      difficulty: "Easy"
    },
    {
      id: "medium",
      label: "Medium",
      emoji: "🌿",
      description: "Build confidence with intermediate conversations and grammar",
      difficulty: "Moderate"
    },
    {
      id: "hard",
      label: "Hard",
      emoji: "🌳",
      description: "Challenge yourself with advanced sentences and complex dialogues",
      difficulty: "Advanced"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
      >
        <span>←</span>
        <span>Back to Contexts</span>
      </button>

      {/* Level Selection */}
      <div className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Select Difficulty Level
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose a level that matches your proficiency. You can always change it later!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => onSelectLevel(level.id)}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 text-center overflow-hidden hover:scale-105 transform"
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-6xl mb-4">{level.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{level.label}</h3>
                <p className="text-xs font-semibold text-indigo-600 mb-3 uppercase tracking-wide">
                  {level.difficulty}
                </p>
                <p className="text-sm text-gray-600">{level.description}</p>
              </div>

              {/* Border effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-300 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import Player from "../components/Players";
import { getSentences, getCurrentLanguage } from "../api/api";

export default function Learn({ context, level, onBack, onBackToLevel }) {
  const [sentences, setSentences] = useState([]);
  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState(2);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());

  useEffect(() => {
    // Check if language changed
    const lang = getCurrentLanguage();
    if (lang !== currentLanguage) {
      setCurrentLanguage(lang);
      // Reset when language changes
      setIndex(0);
    }
  }, [currentLanguage]);

  useEffect(() => {
    if (context && level) {
      loadSentences();
    }
  }, [context, level, currentLanguage]);

  const loadSentences = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSentences(context, level);
      setSentences(data);
      setIndex(0);
    } catch (err) {
      console.error("Error loading sentences:", err);
      setError("Failed to load sentences. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 text-lg font-medium">Loading sentences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
          <p className="text-red-700 font-semibold">{error}</p>
          <button
            onClick={onBackToLevel}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!sentences.length) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-gray-600 text-lg font-medium">No sentences found for this level.</p>
          <button
            onClick={onBackToLevel}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const sentence = sentences[index];
  const progress = ((index + 1) / sentences.length) * 100;

  const levelInfo = {
    beginner: { label: "Beginner", color: "bg-green-100 text-green-800", emoji: "🌱" },
    medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800", emoji: "🌿" },
    hard: { label: "Hard", color: "bg-red-100 text-red-800", emoji: "🌳" }
  };

  const currentLevelInfo = levelInfo[level] || levelInfo.beginner;

  return (
    <div className="space-y-6">
      {/* Back Button & Progress Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <button
          onClick={onBackToLevel}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
        >
          <span>←</span>
          <span>Back</span>
        </button>
        <div className={`px-4 py-2 rounded-full font-semibold flex items-center space-x-2 ${currentLevelInfo.color}`}>
          <span className="text-lg">{currentLevelInfo.emoji}</span>
          <span>{currentLevelInfo.label}</span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 font-medium">Lesson Progress</p>
          <p className="text-2xl font-bold text-indigo-600">
            {index + 1} / {sentences.length}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Player Card */}
      <div className="py-8">
        <Player sentence={sentence} delay={delay} setDelay={setDelay} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-center pt-8 flex-wrap">
        <button
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            index === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 active:scale-95"
          }`}
        >
          <span>←</span>
          <span>Previous</span>
        </button>

        <div className="px-6 py-3 bg-white border-2 border-indigo-300 rounded-lg font-semibold text-gray-700 flex items-center">
          {index + 1} / {sentences.length}
        </div>

        <button
          disabled={index === sentences.length - 1}
          onClick={() => setIndex(index + 1)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            index === sentences.length - 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 active:scale-95"
          }`}
        >
          <span>Next</span>
          <span>→</span>
        </button>
      </div>

      {/* Completion Message */}
      {index === sentences.length - 1 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-6 mt-8">
          <div className="flex items-start space-x-4">
            <span className="text-4xl">🎉</span>
            <div>
              <h3 className="font-bold text-green-900 text-lg mb-1">Great Job!</h3>
              <p className="text-green-700">
                You've completed this lesson! 
                {level === "beginner" && " Try the Medium level to challenge yourself!"}
                {level === "medium" && " Ready for the Hard level? Challenge yourself!"}
                {level === "hard" && " You're a master learner! Review or try another context."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
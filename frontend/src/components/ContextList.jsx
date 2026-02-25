import { useEffect, useState } from "react";
import { getContexts, getContextEmoji } from "../api/api";

export default function Home({ onSelectContext }) {
  const [contexts, setContexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const contextMetadata = {
    greetings: { label: "Greetings", description: "Basic hellos and goodbyes" },
    market: { label: "Market", description: "Shopping conversations" },
    restaurant: { label: "Restaurant", description: "Dining experiences" },
    directions: { label: "Directions", description: "Navigation & location" },
    school: { label: "School", description: "Academic conversations" },
    travel: { label: "Travel", description: "Journey essentials" },
    hotel: { label: "Hotel", description: "Accommodation & booking" },
    hospital: { label: "Hospital", description: "Medical conversations" },
    bank: { label: "Bank", description: "Financial transactions" },
    shopping: { label: "Shopping", description: "Store conversations" },
  };

  useEffect(() => {
    loadContexts();
  }, []);

  const loadContexts = async () => {
    try {
      setLoading(true);
      const data = await getContexts();
      setContexts(data);
      setError(null);
    } catch (err) {
      console.error("Error loading contexts:", err);
      setError("Failed to load contexts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 text-lg font-medium">Loading contexts...</p>
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
            onClick={loadContexts}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Choose Your Learning Path
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a context to practice real-world conversations. 
          Each lesson includes audio, pronunciation, and translations.
        </p>
      </div>

      {contexts.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
          <p className="text-yellow-700 font-semibold">No contexts available</p>
          <p className="text-sm text-yellow-600 mt-2">
            Please check if your JSON files are configured correctly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contexts.map((context) => {
            const metadata = contextMetadata[context] || { 
              label: context.charAt(0).toUpperCase() + context.slice(1),
              description: "Learn real-world conversations"
            };
            
            return (
              <button
                key={context}
                onClick={() => onSelectContext(context)}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 text-left overflow-hidden hover:scale-105 transform"
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{getContextEmoji(context)}</div>
                    <div className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{metadata.label}</h3>
                  <p className="text-sm text-gray-600">{metadata.description}</p>
                </div>

                {/* Border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-300 transition-colors duration-300" />
              </button>
            );
          })}
        </div>
      )}

      {/* Features Section */}
      <div className="mt-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-white/20">
              <span className="text-xl">🎧</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Listen</h4>
              <p className="text-sm text-white/90">Hear native speakers</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-white/20">
              <span className="text-xl">⏸️</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Pause</h4>
              <p className="text-sm text-white/90">Take your time to understand</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-white/20">
              <span className="text-xl">🔄</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Repeat</h4>
              <p className="text-sm text-white/90">Master pronunciation naturally</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
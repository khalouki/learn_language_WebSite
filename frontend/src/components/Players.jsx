import { useState } from "react";
import DelaySlider from "./DelaySlider";

const BASE_URL = "http://127.0.0.1:5000";

export default function Player({ sentence, delay, setDelay }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    setIsPlaying(true);
    try {
      // Your audio paths are already in JSON
      // Just concatenate with BASE_URL
      const sourceAudioUrl = BASE_URL + sentence.source_audio;
      const targetAudioUrl = BASE_URL + sentence.target_audio;
      
      console.log("Playing:", sourceAudioUrl); // Debug
      
      const sourceAudio = new Audio(sourceAudioUrl);
      const targetAudio = new Audio(targetAudioUrl);

      // Play source language audio
      sourceAudio.play();
      
      // Calculate when to play target (after source + delay)
      const sourceDuration = sourceAudio.duration || 2;
      const delayMs = delay * 1000;
      const totalWait = (sourceDuration * 1000) + delayMs;
      
      // Play target language after delay
      setTimeout(() => {
        targetAudio.play();
      }, totalWait);
      
      // Reset playing state after both audios finish
      setTimeout(() => {
        setIsPlaying(false);
      }, totalWait + (targetAudio.duration || 2) * 1000 + 500);
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  // Get language codes from audio path
  const getLanguageLabel = () => {
    try {
      const path = sentence.source_audio;
      // Extract language pair from path: /audio/beginner/en_es/market/001_en.mp3
      const match = path.match(/\/audio\/\w+\/(\w+_\w+)\//);
      if (match) {
        const [from, to] = match[1].split("_");
        return { from: from.toUpperCase(), to: to.toUpperCase() };
      }
    } catch (e) {
      console.log("Could not extract language from path");
    }
    return { from: "FROM", to: "TO" };
  };

  const languages = getLanguageLabel();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border-2 border-indigo-100">
      <div className="space-y-6">
        {/* Source Language */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <p className="text-sm font-semibold text-blue-600 mb-2 flex items-center space-x-2">
            <span className="text-lg">📖</span>
            <span>{languages.from}</span>
          </p>
          <p className="text-2xl font-bold text-gray-900">{sentence.source_text}</p>
        </div>

        {/* Play Button */}
        <div className="flex justify-center py-4">
          <button
            onClick={play}
            disabled={isPlaying}
            className={`flex items-center justify-center space-x-3 px-8 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isPlaying
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-xl"
            }`}
          >
            <span className="text-2xl">
              {isPlaying ? "⏳" : "▶"}
            </span>
            <span>{isPlaying ? "Playing..." : "Play"}</span>
          </button>
        </div>

        {/* Target Language */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <p className="text-sm font-semibold text-green-600 mb-2 flex items-center space-x-2">
            <span className="text-lg">📖</span>
            <span>{languages.to}</span>
          </p>
          <p className="text-2xl font-bold text-gray-900">{sentence.target_text}</p>
        </div>

        {/* Delay Slider */}
        <div className="pt-4">
          <DelaySlider delay={delay} onChange={setDelay} />
        </div>
      </div>
    </div>
  );
}
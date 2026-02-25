export default function DelaySlider({ delay, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-gray-700">
          Audio Delay
        </label>
        <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-bold text-lg">
          {delay}s
        </span>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={delay}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-gradient-to-r from-blue-200 to-indigo-300 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:from-blue-300 hover:to-indigo-400 transition-colors"
      />
      <div className="flex justify-between text-xs text-gray-500 px-1">
        <span>1s (Fast)</span>
        <span>5s (Slow)</span>
      </div>
    </div>
  );
}
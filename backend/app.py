from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
from pathlib import Path

app = Flask(__name__)
# Enable CORS for your frontend domain
CORS(app, origins=["https://922a-105-73-98-153.ngrok-free.app","http://localhost:5173"])

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
AUDIO_DIR = os.path.join(BASE_DIR, "audio")


# ========================
# Language Detection & Utils
# ========================

def get_available_languages():
    """Detect all available language pairs from JSON files"""
    languages = set()
    
    if not os.path.exists(DATA_DIR):
        return []
    
    # Look for files like: sentences_en_es_beginner.json
    for filename in os.listdir(DATA_DIR):
        if filename.startswith("sentences_") and filename.endswith("_beginner.json"):
            # Extract language pair from filename
            # Format: sentences_en_es_beginner.json → en_es
            parts = filename.replace("sentences_", "").replace("_beginner.json", "")
            if parts:
                languages.add(parts)
    
    return sorted(list(languages))


def get_sentences_file(language_pair, level):
    """
    Get the JSON file path based on language pair and level
    Example: en_es, beginner → sentences_en_es_beginner.json
    """
    filename = f"sentences_{language_pair}_{level}.json"
    return os.path.join(DATA_DIR, filename)


def load_sentences(language_pair, level="beginner"):
    """Load sentences from the level-specific JSON file"""
    file_path = get_sentences_file(language_pair, level)
    
    if not os.path.exists(file_path):
        return []
    
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return []


# ========================
# API Routes
# ========================

# Health check
@app.route("/")
def home():
    return jsonify({
        "status": "backend running",
        "available_languages": get_available_languages()
    })


# Get available language pairs
@app.route("/languages")
def languages():
    """Return all available language pairs"""
    langs = get_available_languages()
    return jsonify(langs)


# Get available contexts for a language pair
@app.route("/contexts")
def contexts():
    """Get contexts for a specific language pair"""
    language = request.args.get("language")
    
    if not language:
        return jsonify({"error": "language parameter is required"}), 400
    
    # Get contexts from beginner level (contexts are same for all levels)
    sentences = load_sentences(language, "beginner")
    
    if not sentences:
        return jsonify({"error": f"Language '{language}' not found"}), 404
    
    contexts_list = sorted(list(set(s["context"] for s in sentences)))
    return jsonify(contexts_list)


# Get sentences by language, context and level
@app.route("/sentences")
def sentences():
    language = request.args.get("language")
    context = request.args.get("context")
    level = request.args.get("level", "beginner")
    
    if not language:
        return jsonify({"error": "language parameter is required"}), 400
    if not context:
        return jsonify({"error": "context parameter is required"}), 400
    
    valid_levels = ["beginner", "medium", "hard"]
    if level not in valid_levels:
        return jsonify({"error": f"level must be one of {valid_levels}"}), 400
    
    # Load sentences from the level-specific file
    all_sentences = load_sentences(language, level)
    
    if not all_sentences:
        return jsonify({"error": f"No sentences found for language '{language}' and level '{level}'"}), 404
    
    # Filter by context
    result = [s for s in all_sentences if s["context"] == context]
    
    if not result:
        return jsonify({"error": f"No sentences found for context '{context}'"}), 404
    
    return jsonify(result)


# Serve audio files
# Route: /audio/beginner/en_es/market/001_en.mp3
# Maps to: audio/beginner/en_es/market/001_en.mp3
@app.route("/audio/<path:filename>")
def audio(filename):
    try:
        return send_from_directory(AUDIO_DIR, filename)
    except FileNotFoundError:
        return jsonify({"error": f"Audio file not found: {filename}"}), 404


# Debug endpoint to list all available files
@app.route("/debug/files")
def debug_files():
    """Debug endpoint to list all available language/context/level combinations"""
    debug_info = {
        "languages": get_available_languages(),
        "data_files": [],
        "audio_folders": []
    }
    
    # List data files
    if os.path.exists(DATA_DIR):
        debug_info["data_files"] = os.listdir(DATA_DIR)
    
    # List audio folders
    if os.path.exists(AUDIO_DIR):
        for level in os.listdir(AUDIO_DIR):
            level_path = os.path.join(AUDIO_DIR, level)
            if os.path.isdir(level_path):
                for lang_pair in os.listdir(level_path):
                    debug_info["audio_folders"].append(f"{level}/{lang_pair}")
    
    return jsonify(debug_info)


# Run app
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
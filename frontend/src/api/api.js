// api.js - Dynamic Language Switching
// You can change language in multiple ways:
// 1. Edit CURRENT_LANGUAGE below
// 2. Use setCurrentLanguage() function
// 3. Use language switcher in UI (recommended)


// Default language pair

// API Base URL
const API_BASE_URL = "http://127.0.0.1:5000";

//export const CURRENT_LANGUAGE = "en_de";
export let CURRENT_LANGUAGE = localStorage.getItem('currentLanguage') || "en_es";


// ========================
// Language Management
// ========================

/**
 * Get current language
 */

export const getCurrentLanguage = () => {
  return CURRENT_LANGUAGE;
};

/**
 * Set current language dynamically
 * Usage: setCurrentLanguage("ar_gr")
 * 
 * NOTE: This is stored in memory only!
 * To persist across page reloads, use localStorage or edit api.js line 5
 */
/**
 * Set current language dynamically
 */
export const setCurrentLanguage = (newLanguage) => {
  if (newLanguage && typeof newLanguage === 'string') {
    CURRENT_LANGUAGE = newLanguage; // This now works because of 'let'
    localStorage.setItem('currentLanguage', newLanguage);
    console.log(`Language switched to: ${newLanguage}`);
    return true;
  }
  return false;
};
/**
 * Load language from localStorage (on app startup)
 */
export const loadSavedLanguage = () => {
  const saved = localStorage.getItem('currentLanguage');
  if (saved) {
    CURRENT_LANGUAGE = saved;
    return saved;
  }
  return CURRENT_LANGUAGE;
};

/**
 * Get all available language pairs
 */
export const getAvailableLanguages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/languages`);
    if (!response.ok) throw new Error("Failed to fetch languages");
    return await response.json();
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
};

// ========================
// Context Management
// ========================

/**
 * Get contexts for current language
 */
export const getContexts = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/contexts?language=${CURRENT_LANGUAGE}`
    );
    if (!response.ok) throw new Error("Failed to fetch contexts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching contexts:", error);
    throw error;
  }
};

// ========================
// Sentences Management
// ========================

/**
 * Get sentences for a specific context and level
 * Automatically uses CURRENT_LANGUAGE
 */
export const getSentences = async (context, level = "beginner") => {
  try {
    if (!context) throw new Error("Context parameter is required");
    
    const response = await fetch(
      `${API_BASE_URL}/sentences?language=${CURRENT_LANGUAGE}&context=${context}&level=${level}`
    );
    
    if (!response.ok) throw new Error("Failed to fetch sentences");
    return await response.json();
  } catch (error) {
    console.error("Error fetching sentences:", error);
    throw error;
  }
};

// ========================
// Audio Management
// ========================

/**
 * Get full audio URL
 */
export const getAudioUrl = (audioPath) => {
  if (!audioPath) return null;
  return `${API_BASE_URL}${audioPath}`;
};

// ========================
// Helper Functions
// ========================

/**
 * Format language pair for display
 */
export const formatLanguagePair = (pair) => {
  const languageCodes = {
    en: "English",
    es: "Spanish",
    ar: "Arabic",
    gr: "German",
    de: "German",
    fr: "French",
    it: "Italian",
    pt: "Portuguese",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
    ru: "Russian",
    hi: "Hindi",
    tr: "Turkish",
    pl: "Polish",
  };

  const [from, to] = pair.split("_");
  const fromName = languageCodes[from] || from.toUpperCase();
  const toName = languageCodes[to] || to.toUpperCase();
  return `${fromName} → ${toName}`;
};

/**
 * Get emoji for language pair
 */
export const getLanguagePairEmoji = (pair) => {
  const emojis = {
    "en_es": "🌎",
    "en_fr": "🇫🇷",
    "en_de": "🇩🇪",
    "en_it": "🇮🇹",
    "en_pt": "🇵🇹",
    "ar_en": "🇸🇦",
    "ar_gr": "🇸🇦",
    "ar_de": "🇸🇦",
    "ar_fr": "🇸🇦",
    "fr_it": "🇫🇷",
    "zh_en": "🇨🇳",
    "ja_en": "🇯🇵",
    "ko_en": "🇰🇷",
    "ru_en": "🇷🇺",
  };
  return emojis[pair] || "🌍";
};

/**
 * Get emoji for context
 */
export const getContextEmoji = (context) => {
  const emojis = {
    "greetings": "👋",
    "market": "🛒",
    "restaurant": "🍽️",
    "directions": "🗺️",
    "school": "🎓",
    "travel": "✈️",
    "hotel": "🏨",
    "hospital": "🏥",
    "bank": "🏦",
    "shopping": "🛍️",
  };
  return emojis[context] || "📚";
};

/**
 * Check API health
 */
export const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
};

// Load saved language on module import
loadSavedLanguage();
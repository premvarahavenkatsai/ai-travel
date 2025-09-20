// Gemini API Configuration
const config = {
    GEMINI_API_KEY: 'AIzaSyCxhppRuwjkXQu98RdXtqiaSYLwOI_39SU', // Replace with your actual API key
    API_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
};

// Export the configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    window.config = config;
}
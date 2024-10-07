const fetch = require('node-fetch');

// Fetch results from YouTube
exports.fetchYoutubeResults = async (term) => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(term)}&key=${process.env.YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items; // Adjust based on actual API response structure
};

// Fetch results from Google Custom Search
exports.fetchArticleResults = async (term) => {
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(term)}&cx=${process.env.SEARCH_ENGINE_ID}&key=${process.env.GOOGLE_CUSTOM_SEARCH_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items; // Adjust based on actual API response structure
};

// Fetch results from academic papers (example)
exports.fetchAcademicResults = async (term) => {
    // You would replace this URL with your actual academic search API
    const url = `https://api.example.com/academic?query=${encodeURIComponent(term)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results; // Adjust based on actual API response structure
};

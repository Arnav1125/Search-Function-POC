const fetch = require('node-fetch');
require('dotenv').config();

// Utility function to search for YouTube videos
const searchYouTube = async (req, res) => {
    const query = req.query.q?.trim();
    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching data from YouTube API');
        }
        const data = await response.json();
        res.json(data.items);
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        res.status(500).json({ message: 'Error fetching YouTube data' });
    }
};

module.exports = { searchYouTube };

const axios = require('axios');

const searchArticles = async (req, res) => {
    const searchTerm = req.query.q;

    if (!searchTerm) {
        return res.status(400).json({ message: 'Search term is required' });
    }

    try {
        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchTerm)}&key=${process.env.GOOGLE_CUSTOM_SEARCH_API_KEY}&cx=${process.env.SEARCH_ENGINE_ID}`;


        const response = await axios.get(url);
        const articles = response.data.items.map(item => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet
        }));

        res.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Error fetching articles' });
    }
};

module.exports = { searchArticles };

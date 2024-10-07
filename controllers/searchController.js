const fetchService = require('../services/fetchService');

exports.search = async (req, res) => {
    const term = req.query.term;

    try {
        const youtubeResults = await fetchService.fetchYoutubeResults(term);
        const articleResults = await fetchService.fetchArticleResults(term);
        const academicResults = await fetchService.fetchAcademicResults(term);

        const combinedResults = {
            youtube: youtubeResults,
            articles: articleResults,
            academic: academicResults,
        };

        res.json(combinedResults);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).send('Error fetching search results');
    }
};

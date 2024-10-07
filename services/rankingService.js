// Ranking logic
const rankResults = (results) => {
    return results.map(result => {
        let score = 0;

        // Ranking for YouTube Videos
        if (result.type === 'youtube') {
            score += Math.min(result.views / 1000000, 10); // Cap views score at 10 for 1 million+ views
            score += Math.min(result.likes / 50000, 10); // Cap likes score at 10 for 50k+ likes
            score += result.relevanceScore || 0; // Add relevance score (if available)
        }

        // Ranking for Articles
        else if (result.type === 'article') {
            score += result.sourceAuthority || 0; // Score based on source authority (e.g., trusted sources)
            score += result.relevanceScore || 0;  // Relevance of the article to the search term
        }

        // Ranking for Blogs
        else if (result.type === 'blog') {
            const now = new Date();
            const blogDate = new Date(result.publishDate);
            const freshnessScore = (now - blogDate) / (1000 * 60 * 60 * 24 * 365); // Age in years
            score += Math.max(10 - freshnessScore, 0); // Freshness: newer blogs get a higher score
            score += Math.min(result.shares / 1000, 10); // Popularity: cap shares score at 10
            score += result.relevanceScore || 0; // Relevance score for blog posts
        }

        // Ranking for Academic Papers
        else if (result.type === 'academic') {
            score += Math.min(result.citationCount / 100, 10); // Cap citations at 100 for a max score of 10
            const publicationAge = (new Date().getFullYear()) - (new Date(result.publicationDate).getFullYear());
            score += Math.max(10 - publicationAge, 0); // Newer papers get a higher score
            score += result.relevanceScore || 0; // Add relevance score for academic papers
        }

        return { ...result, score };
    }).sort((a, b) => b.score - a.score); // Sort by highest score
};

module.exports = { rankResults };

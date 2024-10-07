const fetch = require('node-fetch');

// Function to search for academic papers on PubMed
const searchAcademicPapers = async (req, res) => {
    const searchTerm = req.query.q?.trim();

    if (!searchTerm) {
        return res.status(400).json({ message: 'Search term is required' });
    }

    try {
        // Step 1: Search for papers
        const pubmedSearchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(searchTerm)}&retmode=json`;
        const searchResponse = await fetch(pubmedSearchUrl);

        // Check if the response is OK
        if (!searchResponse.ok) {
            console.error(`Error fetching academic papers: ${searchResponse.status} ${searchResponse.statusText}`);
            return res.status(searchResponse.status).json({ message: 'Error fetching academic papers' });
        }

        const searchData = await searchResponse.json(); // Parse JSON response
        const paperIds = searchData.esearchresult.idlist;

        // Check if any papers were found
        if (paperIds.length === 0) {
            return res.json({ message: 'No papers found for the given search term.' });
        }

        // Step 2: Fetch details for each paper
        const papers = [];
        for (const id of paperIds) {
            const paperDetailsUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${id}&retmode=json`;
            const paperResponse = await fetch(paperDetailsUrl);

            if (!paperResponse.ok) {
                console.error(`Error fetching details for paper ID ${id}: ${paperResponse.statusText}`);
                continue; // Skip this paper
            }

            const paperData = await paperResponse.json();
            papers.push({
                title: paperData.result[id].title,
                link: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
                source: paperData.result[id].source
            });
        }

        // Send the papers back as a response
        res.json(papers.length > 0 ? papers : { message: 'No valid papers found.' });
    } catch (error) {
        console.error('Error fetching academic papers:', error);
        res.status(500).json({ message: 'Error fetching academic papers' });
    }
};

module.exports = { searchAcademicPapers };

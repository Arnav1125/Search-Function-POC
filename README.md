# Search Functionality POC

This is a proof of concept (POC) project that implements a search functionality for various resources such as YouTube videos, academic papers, and articles. The backend is built using Node.js and Express, and it connects to various APIs to fetch relevant search results.

## Features

- Search for YouTube videos
- Search for academic papers
- Search for articles
- Returns results in a structured format

## Technologies Used

- Node.js
- Express.js
- dotenv
- node-fetch (for API requests)


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/search-function-poc.git
   cd search-function-poc
## Install the dependencies:
npm install

## Create a .env file in the root directory and add your API keys as follows:
YOUTUBE_API_KEY=your_youtube_api_key
GOOGLE_CUSTOM_SEARCH_API_KEY=your_google_custom_search_api_key
SEARCH_ENGINE_ID=your_search_engine_id

## Start the server using 
node server.js
Access the API at http://localhost:3000/

## API Endpoints
# YouTube Search
GET  http://localhost:3000/youtube-search?q=search_term 
Returns a list of YouTube videos related to the search_term.
# Academic Search
GET http://localhost:3000/academic-search?q=search_term
Returns a list of academic papers related to the search_term.
# Article Search
GET http://localhost:3000/article-search?q=search_term
Returns a list of articles related to the search_term

## Documentation
This section outlines the approach taken in the project, the technologies used, and any challenges faced during development.
# Approach
The project aims to provide a unified search function that fetches results from various content sources, including YouTube, academic articles, and news articles. The backend is built using Node.js and Express, allowing for easy integration of multiple APIs.

# Technologies Used
Node.js
Express
dotenv
node-fetch
YouTube Data API
Google Custom Search API

# Challenges Faced
1. API Rate Limits: Encountered restrictions on the number of requests to the YouTube Data API. Implemented caching strategies to minimize repeated requests for the same queries.
2.Data Integration: Ensured that data from different sources was returned in a consistent format. Created a unified response structure to present search results neatly.
# Ranking and Integration of Content Sources
1.The results from each API are fetched independently and then combined in the backend.
2.A simple ranking mechanism was implemented based on the relevance of the search term, such as prioritizing YouTube results first, followed by academic articles and then news articles.
3.This ranking is based on the number of occurrences of the search term in the title and description.



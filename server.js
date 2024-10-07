const express = require('express');
const app = express();

const youtubeRoutes = require('./routes/youtubeRoutes');
const articleRoutes = require('./routes/articleRoutes');
const academicRoutes = require('./routes/academicRoutes');
const searchRoutes = require('./routes/searchRoutes');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use routes
app.use('/youtube-search', youtubeRoutes);
app.use('/article-search', articleRoutes);
app.use('/academic-search', academicRoutes);
app.use('/api/search', searchRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzkzMzFmOGZhOTk1ZDg3OTM0MjI1NzU2NTMxZTE0OCIsIm5iZiI6MTc0Mjk2NTg3MC4yOTc5OTk5LCJzdWIiOiI2N2UzOGM2ZTdiNzMxM2I1YWVmMDljZTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.L9CVa1VgILWdUoHdtp3_KfF579TV-mjCnS60M36IuEA';

// Fetch popular movies for the sidebar
async function fetchPopularMovies() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    displaySidebarMovies(data.results);
    displayMovies(data.results); // Display movies in the main content area
}

// Display movies in the sidebar
function displaySidebarMovies(movies) {
    const sidebarMovieList = document.getElementById('sidebar-movie-list');
    sidebarMovieList.innerHTML = '';
    
    movies.forEach(movie => {
        const movieItem = document.createElement('li');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        sidebarMovieList.appendChild(movieItem);
    });
}

// Display movies in the main content area
function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button onclick="playMovie('${movie.id}')">Watch</button>
        `;
        movieList.appendChild(movieItem);
    });
}

// Fetch movie data for the search query
async function searchMovies() {
    const query = document.getElementById('search').value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&language=en-US&page=1`;

    const response = await fetch(url);
    const data = await response.json();
    
    displaySearchResults(data.results);
}

// Display search results in the search section
function displaySearchResults(movies) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button onclick="playMovie('${movie.id}')">Watch</button>
        `;
        searchResults.appendChild(movieItem);
    });
}

// Play the movie by getting the stream link from Vidsrc API
async function playMovie(movieId) {
    const response = await fetch(`https://api.vidsrc.me/api/v1/streaming?tmdb_id=${movieId}`);
    const data = await response.json();
    
    if (data.status === 'success') {
        const videoUrl = data.data[0].file;
        document.getElementById('player').src = videoUrl;
        document.getElementById('movie-player').style.display = 'block';
    } else {
        alert('Unable to fetch movie stream');
    }
}

// Close the movie player
function closePlayer() {
    document.getElementById('movie-player').style.display = 'none';
    document.getElementById('player').src = '';
}

// Show a specific tab and hide others
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(`${tabName}-section`).style.display = 'block';
    const activeTabBtn = document.querySelector(`button[onclick="showTab('${tabName}')"]`);
    activeTabBtn.classList.add('active');
}

// Initialize the page by fetching popular movies
fetchPopularMovies();
showTab('home'); // Set home tab as active by default

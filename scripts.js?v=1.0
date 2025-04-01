const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzkzMzFmOGZhOTk1ZDg3OTM0MjI1NzU2NTMxZTE0OCIsIm5iZiI6MTc0Mjk2NTg3MC4yOTc5OTk5LCJzdWIiOiI2N2UzOGM2ZTdiNzMxM2I1YWVmMDljZTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.L9CVa1VgILWdUoHdtp3_KfF579TV-mjCnS60M36IuEA';
const movieList = document.getElementById('movie-list');

// Fetch popular movies from TMDB API
function fetchMovies() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      displayMovies(movies);
    })
    .catch(error => console.log('Error fetching data:', error));
}

// Display movies in the movie list
function displayMovies(movies) {
  movieList.innerHTML = ''; // Clear existing content
  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.className = 'movie-item';

    movieItem.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    movieList.appendChild(movieItem);
  });
}

// Search movies based on user input
function searchMovies() {
  const query = document.getElementById('search-query').value;
  if (!query) return;
  
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      displayMovies(movies);
    })
    .catch(error => console.log('Error fetching data:', error));
}

// Call fetchMovies on initial load
fetchMovies();

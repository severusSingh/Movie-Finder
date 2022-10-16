import React from 'react';
import { useEffect, useState } from 'react';
import SearchIcon from './search.svg';
import './App.css';
import MovieCard from './MovieCard';


const API_Url = 'https://www.omdbapi.com/?apikey=5f7f4edb';
function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async(title) => {
    const response = await fetch(`${API_Url}&s=${title}`);
    const data = await response.json();
    
    setMovies(data.Search);
  }

  useEffect (() =>{
    searchMovies('N/A');
  }, []);


  return (
    <div className='app'>
      <h1>Movie Finder</h1>

      <div className="search">
        <input 
          placeholder='Search for Movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img src={SearchIcon} alt="Search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <>
          <div className="empty">
            <h2>No movies found!</h2>
          </div>
          <div className='not'>
            <h3>Type Any Movie name in SearchBar</h3>
          </div>
        </>
      )}

    </div>
  );
}

export default App;

import './App.css';
import {getMovieList, searchMovie} from './api';
import { useEffect, useState } from 'react';

const App = () =>  {

  const [popularsMovies, setPopularMovies] = useState([]);

  useEffect(()=>{
    getMovieList().then((result) => {
      setPopularMovies(result) 
    })
  }, [])

  const PopularMoviesList = () => {
    return popularsMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
            <div className="Movie-title">{movie.title}</div>
            <img 
              className="Movie-img" 
              alt=""
              src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`}
            />
            <div className="Movie-date">{movie.release_date}</div>
            <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      )
    })
  }

  const search = async (q) => {
   if(q.length >= 3){
    const query = await searchMovie(q);
    setPopularMovies(query)
   }
  }
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Azizan Search Movie</h1>
        <input 
          placeholder='Seach Movie....' 
          class="Movie-search"
          onChange={({target}) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMoviesList />      
        </div>
      </header>
    </div>
  );
}

export default App;

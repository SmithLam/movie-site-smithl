import React,{useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList'


let API_KEY = process.env.REACT_APP_APIKEY

function App() {

let [movieList, setMovieList] = useState(null);
let [genreList, setGenreList] = useState(null);


const getMovie = async () => {
 let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
 let data = await fetch(url)
 let result = await data.json()
 setMovieList(result.results)
console.log("movies", result)
}

const getGenre = async () => {
  let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
  let data = await fetch(url)
  let genreResult = await data.json()
  setGenreList(genreResult.genres)
  console.log("genres", genreResult.genres)
}

useEffect(()=>{
  getMovie();
  getGenre();
},[]) 


if(movieList === null){
return (<div>loading</div>)
}

  return (
   <div>
  <h1>Smith Flix</h1>
  <div>
    <MovieList movieList ={movieList} genreList ={genreList}/>
  </div>
   </div>
  );
}

export default App;

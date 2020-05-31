import React,{useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList'
import RangeSliderComp from './components/RangeSliderComp'
import NavigationBar from './components/NavigationBar'
import {Form, Row, Col} from 'react-bootstrap'
// import ReactPaginate from 'react-paginate';
import popCornLogo from '../src/pop-corn-logo.png';
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";
import MovieNightPic from '../src/Movie-Night-Flyer.jpg';

const override = css`
  display: block;
  margin: 10% auto;
`;



const API_KEY = process.env.REACT_APP_APIKEY
let rating=0

function App() {

let [movieList, setMovieList] = useState(null);
let [OGMovies, setOGMovies] = useState([]);
let [genreList, setGenreList] = useState(null);
let [loading, setLoading] = useState(true);
let [trendName, setTrendName] = useState("now_playing")
let [totalPages, setTotalPages] = useState(0)
// let [bigTrendName, setBigTrendName] = useState(null);

// if (trendName === "now_playing"){
// setBigTrendName("Now Playing")
// }


const getMovie = async (page) => {
 let url = `https://api.themoviedb.org/3/movie/${trendName}?api_key=${API_KEY}&language=en-US&page=${page}`
 let data = await fetch(url)
 let result = await data.json()
 setMovieList(result.results)
 setOGMovies(result.results)
  console.log("movies", result)
  setTotalPages(result.total_pages)
}

const getGenre = async () => {
  let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
  let data = await fetch(url)
  let genreResult = await data.json()
  setGenreList(genreResult.genres)
  getMovie(1)
  console.log("genres", genreResult.genres)
}

const getDiscoverGenre = async (genre) => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`
  let data = await fetch(url)
  let result = await data.json()
  setMovieList(result.results)
}

const handlePageClick = (page) => {
  getMovie(page.selected + 1);
}



let sortByRating = (order) => {
  //const duplicatedMovieList = movieList.slice(0);
  const duplicatedMovieList = [...movieList]
  if (order===0){
    setMovieList(OGMovies)
  }
  else{
  const sortedMoveList = duplicatedMovieList.sort(function (a, b) {
    // return a.popularity - b.popularity;
    return (a.vote_average - b.vote_average) * order;
  })
  setMovieList(sortedMoveList);
  }
  ;
};

let unSort =() =>{
  getMovie(1)
  setMovieList(MovieList)
}




//useEffect
useEffect(()=>{
  getGenre();
},[totalPages, trendName]) ;

//loading
if(genreList === null || movieList === null){
return (<div className="sweet-loading">
<PacmanLoader
  css={override}
  size={125}
  color={"yellow"}
  loading={setLoading}
/>
</div>)
}


//render
return (
  <div className="wrapper">
   <NavigationBar popCornLogo={popCornLogo} getDiscoverGenre={getDiscoverGenre} sortByRating={sortByRating} unSort ={unSort} onTrendClick={setTrendName}/>
  {/* <div><RangeSliderComp movieList ={movieList}/></div> */}
  {/* <div>bigTrendName</div> */}

  {/* <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        /> */}


    <MovieList trendName={trendName} movieList ={movieList} genreList ={genreList} MovieNightPic={MovieNightPic}/>


    <footer className="mt-5 text-muted text-center text-small">
            <p className="mb-1">© 2020 Powered with by Mojave's Group Two</p>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="https://github.com/SmithLam">Smith Lam</a></li>
            </ul>
          </footer>
   </div>//end wrapper
  );
}

export default App;

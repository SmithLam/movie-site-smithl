import React,{useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList'
import RangeSliderComp from './components/RangeSliderComp'
import NavigationBar from './components/NavigationBar'
import Pagination from "react-js-pagination";
import popCornLogo from '../src/pop-corn-logo.png';
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";
import YoutubeModal from './components/YoutubeModal';


const override = css`
  display: block;
  margin: 10% auto;
`;



const API_KEY = process.env.REACT_APP_APIKEY

function App() {

let [movieList, setMovieList] = useState(null);
let [OGMovies, setOGMovies] = useState([]);
let [genreList, setGenreList] = useState(null);
let [loading, setLoading] = useState(true)
let [trendName, setTrendName] = useState("now_playing")
let [moviePage, setMoviePage] = useState({});
let [searchTerm, setSearchTerm] = useState(null);
let [searchGenre, setSearchGenre] = useState(null);
const [show, setShow] = useState(false);
let [movieID, setMovieID] = useState("")


const getGenre = async () => {
  let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
  let data = await fetch(url)
  let genreResult = await data.json()
  getMovie()
  setGenreList(genreResult.genres)
  console.log("genres", genreResult.genres)
}

const getMovie = async () => {
 let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
 let data = await fetch(url)
 let result = await data.json()
 setMoviePage(result)
 setMovieList(result.results)
 setOGMovies(result.results)
console.log("movies", result)
}

const getTrendMovie = async (trend) => {
  setActivePage(1);
  setTrendName(trend)
  let url = `https://api.themoviedb.org/3/movie/${trend}?api_key=${API_KEY}&language=en-US&page=1`
  let data = await fetch(url)
  let result = await data.json()
  setMoviePage(result)
  setMovieList(result.results)
  setOGMovies(result.results)
 console.log("movies", result)
 }
 

const getDiscoverGenre = async (genre) => {
  setActivePage(1);
  setSearchGenre(genre)
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`
  let data = await fetch(url)
  let result = await data.json()
  setMoviePage(result)
  setMovieList(result.results)
  setOGMovies(result.results)
}

//sort by Rating
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
  setMovieList(movieList)
}
//end sort by ratings


//searchByKeyword
const searchByKeyword = async (keyword, event) => {
  setActivePage(1);
  console.log(keyword)
  setSearchTerm(keyword);
  if(keyword === ''){
    getMovie(1)
    setMovieList(movieList);
    setOGMovies(movieList);
  } else {
  setMovieList(OGMovies.filter(movie=> movie.title.toLowerCase().includes(keyword.toLowerCase())));
  let url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${API_KEY}&language=en-US&page=1`
  let data = await fetch(url)
  let result = await data.json()
  console.log('data searched by keyword:', data);
  setMoviePage(result)
  setMovieList(result.results)
  setOGMovies(result.results)
  }
}

//Youtube{
 const searchYoutube = async (id) =>{
  handleShow()
  console.log("what is title id", id)
  let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  let data = await fetch(url)
  let movieresult = await data.json()
  console.log("What is result", movieresult.results[0])
  setMovieID(movieresult.results[0])
 }


 // pagination
 let [page, setActivePage] = useState(1);
 let handlePageChange = async (pageNumber)=> {
   setActivePage(pageNumber);
   console.log(`active page is ${pageNumber}`);
   console.log('key current is:', trendName);
   let url = ''
   if(searchTerm){
     url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${API_KEY}&language=en-US&page=${pageNumber}`
   } else if(searchGenre){
     url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${searchGenre}&page=${pageNumber}`
   } else {
     url = `https://api.themoviedb.org/3/movie/${trendName}?api_key=${API_KEY}&language=en-US&page=${pageNumber}`
   }
   let data = await fetch(url)
   let result = await data.json()
   setMoviePage(result)
   setMovieList(result.results)
 }

//modal
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


//useEffect
useEffect(()=>{
  getGenre();
},[]) ;

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
   <NavigationBar popCornLogo={popCornLogo} getDiscoverGenre={getDiscoverGenre} sortByRating={sortByRating} unSort ={unSort} getTrendMovie={getTrendMovie} searchByKeyword={searchByKeyword} />
  {/* <div><RangeSliderComp movieList ={movieList}/></div> */}
  {/* <div>bigTrendName</div> */}
  
    <Pagination className="pagination"
      hideDisabled
      prevPageText='Prev'
      nextPageText='Next'
      firstPageText='First'
      lastPageText='Last'
      activePage={page}
      itemsCountPerPage={20}
      totalItemsCount={moviePage.total_results}
      onChange={(pageNumber)=>handlePageChange(pageNumber)}
      itemClass="page-item"
      linkClass="page-link"
      />

    <YoutubeModal
        show={show}
        onHide={() => setShow(false)}
        movieID={movieID}
        >
    </YoutubeModal>


    <MovieList movieList ={movieList} searchYoutube={searchYoutube} handleShow={handleShow} genreList ={genreList}/>

    <Pagination className="pagination"
      hideDisabled
      prevPageText='Prev'
      nextPageText='Next'
      firstPageText='First'
      lastPageText='Last'
      activePage={page}
      itemsCountPerPage={20}
      totalItemsCount={moviePage.total_results}
      onChange={(pageNumber)=>handlePageChange(pageNumber)}
      itemClass="page-item"
      linkClass="page-link"
      />
    <footer className="mt-5 text-muted text-center text-small">
            <p className="mb-1">© 2020 Powered with by <a href="hhttps://www.themoviedb.org/">TMDB API</a></p>
            <ul className="list-inline">
              <li className="list-inline-item">Made by <a href="https://github.com/SmithLam">Smith Lam</a></li>
            </ul>
          </footer>
   </div>//end wrapper
  );
}

export default App;

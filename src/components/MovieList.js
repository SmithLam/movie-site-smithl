import React,{useEffect, useState} from 'react';
import {Card, ListGroup, ListGroupItem, Badge} from 'react-bootstrap'
import {Form, Row, Col} from 'react-bootstrap'

export default function movieList(props) {

    return (
        <div className="container-fluid">
          <div className="Row">
          <div className="col-md-12 d-flex flex-wrap justify-content-center">
            {props.movieList.map
            (item => 
                {return(
                    <div>
                  <Card id="card" className="bg-dark text-white">
                  <Card.Img id="card-image" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}` || props.MovieNightPic} alt="Card image" />
                  <Card.ImgOverlay>
                  <div id="card-content">
                  <Card.Title className="my-3"><a id="item-title" href={`https://www.themoviedb.org/movie/${item.id}?language=en-US`}>{item.title}</a></Card.Title>
                  <Card.Text className="my-2">{item.genre_ids.map(movieId => {
                          return (<Badge pill className="mr-2" variant="danger">{props.genreList.find(genre => genre.id === movieId).name}</Badge>) 
                      })}
                  </Card.Text>
                  <Card.Text>Ratings: {item.vote_average}</Card.Text>
                  <Card.Text>
                  <div id="overview-text">{item.overview}</div>
                  </Card.Text>
                  </div>
                </Card.ImgOverlay>
                </Card>

                  </div>
                
    
                )})}
          </div>
          </div>
        </div>
    )
}

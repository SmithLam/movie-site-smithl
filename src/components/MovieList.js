import React from 'react';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'


export default function movieList(props) {

    if(props.movieList === null){
            return (<div>loading</div>)
            }

    if(props.genreList=== null){
                return (<div>loading</div>)
                }
    

console.log("what are movie id ", props.movieList[0].genre_ids[0])
console.log("what are id in genre id", props.genreList[0].id)



    return (
        <div>
            {props.movieList.map
            (item => 
                {return(
                    <div>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>
                       {item.overview}
                      </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>{item.genre_ids.map(movieId => {
                          return (<p>{props.genreList.find(genreId => genreId.id === movieId).name}</p>) 


                      })}</ListGroupItem>
                      <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                      <ListGroupItem>Vestibulum at eros</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Card>
                  </div>
                
                
                // <div>{item.title}</div>
                )})}
        </div>
    )
}

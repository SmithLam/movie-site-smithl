import React from 'react'
import {Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'


export default function NavigationBar(props) {
    return (
        <Navbar collapseOnSelect className="sticky-top" expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
        <img
        alt=""
        src={props.popCornLogo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        />{' '}Smith's Movie Night</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="d-flex flex-row-reverse" href="#about">About</Nav.Link>
            <NavDropdown className="d-flex flex-row-reverse" title="Showing" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={()=> props.onTrendClick("now_playing")}>Currently Showing</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> props.onTrendClick("upcoming")}>Upcoming</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> props.onTrendClick("top_rated")}>Top Rated</NavDropdown.Item>
              </NavDropdown>
            <NavDropdown className="d-flex flex-row-reverse" title="Sort by" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={()=> props.sortByRating(-1)}>Ratings (Highest)</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> props.sortByRating(1)}>Ratings (Lowest)</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  onClick={()=> props.sortByRating(0)}>Reset</NavDropdown.Item>
              </NavDropdown>
            <NavDropdown className="d-flex flex-row-reverse" title="Genres" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={()=>props.getDiscoverGenre("28")}>Action</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>props.getDiscoverGenre("16")}>Animation</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>props.getDiscoverGenre("35")}>Comedy</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>props.getDiscoverGenre("80")}>Crime</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>props.getDiscoverGenre("99")}>Documentary</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>props.getDiscoverGenre("18")}>Drama</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>props.getDiscoverGenre("14")}>Fantasy</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>props.getDiscoverGenre("36")}>History</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>props.getDiscoverGenre("27")}>Horror</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>props.getDiscoverGenre("878")}>Science Fiction</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>props.getDiscoverGenre("10752")}>War</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>props.getDiscoverGenre("37")}>Western</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=> props.sortByRating(0)}>All</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <Form inline>
            <FormControl className="d-flex flex-row-reverse mr-sm-2" type="text"  placeholder="Search your movie here" />
            <Button  className="d-flex flex-row-reverse" variant="outline-secondary">Search</Button>
        </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

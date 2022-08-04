import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

function FavMovieList({ favMovie }) {
  const movies = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user);

  function removeMovie(movie_id) {
    let token = localStorage.getItem("token");
    const url = `https://myflix2022.herokuapp.com/users/${username}/movies/${movie._id}`;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        window.open(`/users/${user}`, "_self");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {favMovie.map((movie) => {
        return (
          <Col md={6}>
            <Card className="movie-card" key={movie._id}>
              <Card.Img
                className="movie-poster img-fluid"
                src={movie.ImagePath}
              />
              <Card.Body>
                <Card.Title> {movie.Title}</Card.Title>
                <Button onClick={() => removeMovie(movie._id)}>Remove</Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </div>
  );
}

FavMovieList.propTypes = {
  favMovie: PropTypes.string.isRequired,
};

export default FavMovieList;

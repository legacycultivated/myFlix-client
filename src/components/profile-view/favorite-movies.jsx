import React, { Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button, Card, Col, Figure, Row } from "react-bootstrap";

import "./profile-view.scss";

export function FavoriteMovies(props) {
  const { movies, favoriteMovies, currentUser, token } = props;

  const favoriteMoviesList = movies.filter((m) => {
    return favoriteMovies.includes(m._id);
  });

  const handleDelete = (movie, user) => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("user");
    console.log(movie);
    console.log(token);
    axios
      .delete(
        `https://myflix2022.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert(`${movie.Title} has been removed from your list.`);
      })
      .catch((e) => {
        console.log("Error");
      });
  };
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {favoriteMoviesList.length === 0 ? (
            <p>Fav list is empty! Add some movies!</p>
          ) : (
            favoriteMoviesList.map(({ ImagePath, Title, _id }) => {
              return (
                <Col
                  xs={12}
                  md={6}
                  lg={3}
                  key={movies._id}
                  className="fav-movie"
                >
                  <Figure>
                    <Link to={`/movies/${_id}`}>
                      <Figure.Image src={ImagePath} alt={Title} />

                      <Figure.Caption>{Title}</Figure.Caption>
                    </Link>
                  </Figure>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      handleDelete(_id);
                    }}
                  >
                    Remove
                  </Button>
                </Col>
              );
            })
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}

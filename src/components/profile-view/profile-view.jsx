import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { FavoriteMovieView } from "./favoritemovies";

import "./profile-view.scss";

import { Container, Row, Button, Card, Form, Col } from "react-bootstrap";

export function ProfileView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState({});
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [user, setUserData] = useState("");
  const [movies, setMovies] = useState([]);
  const User = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);

  const getUserData = () => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    axios
      .get(`https://myflix2022.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setUserData(response.data);
        setFavoriteMoviesList(response.data.FavoriteMovies);
        console.log(response);

        response.data.FavoriteMovies.forEach((movie_id) => {
          let favMovies = props.movies.filter(
            (movie) => movie._id === movie_id
          );
          setMovies(favMovies);
        });
      })
      .catch((error) => console.error(error));
  };

  // Delete Profile
  const handleDelete = (e) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios.delete(`https://myflix2022.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(`The account ${user.Username} was successfully deleted.`);
    localStorage.clear();
    window.open("/register", "_self");
  };
  // Update Profile
  const handleUpdate = () => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    axios
      .put(
        `https://myflix2022.herokuapp.com/users/${user}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      .then((response) => {
        alert("Your profile has been updated");
        localStorage.setItem("user", response.data.Username),
          console.log(response.data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <Row>
        <h3>Profile</h3>
      </Row>

      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter new email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="birthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            onChange={(e) => setBirthday(e.target.value)}
            value={birthday}
            type="date"
            placeholder="birthday"
          />
        </Form.Group>
      </Form>

      <Row>
        <Button className="mt-2 ml-3" onClick={handleUpdate}>
          Update your profile
        </Button>
        <Button className="mt-2 ml-4" onClick={handleDelete}>
          Delete your profile
        </Button>
      </Row>
      <Row className="mb-3 mt-4">
        <h4>Favorite movies:</h4>
      </Row>
      <Card className="fav-list">
        <Card.Body>
          {favoriteMoviesList.map((movie) => {
            <div key={movie._id}>
              <img src={movie.ImagePath} alt={movie.Title} />
              <Link to={`/movies/${movie._id}`}>
                <h4>{movie.Title}</h4>
              </Link>
            </div>;
          })}
        </Card.Body>
      </Card>
    </Container>
  );
}

ProfileView.propTypes = {
  profileView: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};

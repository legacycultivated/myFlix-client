import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      isRegistered: true,
    };
  }
  componentDidMount() {
    axios
      .get("https://myflix2022.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie = (movie) => {
    this.setState({ selectedMovie: movie });
  };

  onLoggedIn = (user) => {
    this.setState({ user });
  };

  setRegistered = (value) => {
    this.setState({ isRegistered: value });
  };

  render() {
    const { movies, selectedMovie, user, isRegistered } = this.state;

    // If user is not registered, render RegistrationView
    if (!isRegistered)
      return (
        <RegistrationView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          setRegistered={this.setRegistered}
        />
      );

    // If there's no user, the LoginView is rendered.
    // If there's a user logged in, the user details are passed as a prop to LoginView
    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          setRegistered={this.setRegistered}
        />
      );
    if (selectedMovie)
      return (
        <MovieView
          movie={selectedMovie}
          onBackClick={(newSelectedMovie) => {
            this.setSelectedMovie(newSelectedMovie);
          }}
        />
      );

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}

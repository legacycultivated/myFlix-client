import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        <button
          onClick={() => {
            alert("Nice!");
          }}
        >
          Click me!
        </button>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onClick={() => {
              this.state.selectedMovie = movie;
            }}
          />
        ))}
      </div>
    );
  }
}

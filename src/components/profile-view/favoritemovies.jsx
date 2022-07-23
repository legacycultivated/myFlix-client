import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Proptypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";

export function FavoriteMovieView(favoriteMoviesList) {
  return (
    <div>
      <h2>Favorite Movies</h2>

      {favoriteMoviesList.map((movie) => {
        return (
          <div key={movie._id}>
            <img src={movie.ImagePath} alt={movie.Title} />
            <Link to={`/movies/${movie._id}`}>
              <h4>{movie.Title}</h4>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

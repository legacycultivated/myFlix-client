import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

import "./movie-view.scss";
export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movie-view">
        <Row>
          <Col className="movie-poster">
            <img src={movie.ImagePath} />
          </Col>
        </Row>
        <Row className="movie-title">
          <Col className="label">Title: </Col>
          <Col className="value">{movie.Title}</Col>
        </Row>
        <Row className="movie-description">
          <Col className="label">Description: </Col>
          <Col className="value">{movie.Description}</Col>
        </Row>
        <Row>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </Row>
        <Button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </Container>
    );
  }
}

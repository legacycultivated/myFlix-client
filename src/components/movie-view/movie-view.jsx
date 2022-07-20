import React from "react";
import { Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";

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
        <Row className="movie-description">
          <Col className="label">Genre: </Col>
          <Col className="value">{movie.Genre.Name}</Col>
        </Row>
        <Row className="movie-description">
          <Col className="label">Director: </Col>
          <Col className="value">{movie.Director.Name}</Col>
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

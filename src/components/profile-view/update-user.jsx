import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";

import "./profile-view.scss";

export function UpdateUser(props) {
  const { user } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [values, setValues] = useState({
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
  });

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

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: "Username required" });
      isReq = false;
    } else if (username.length < 5) {
      setValues({
        ...values,
        usernameErr: "Username must be at least 5 characters long",
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: "Password required" });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: "Password must be at least 6 characters long",
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: "Email required" });
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues({ ...values, emailErr: "Enter valid email" });
      isReq = false;
    }
    return isReq;
  };

  // Update Profile
  const handleSubmit = () => {
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
        setPassword(response.data.Password);
        setEmail(response.data.Email);
        setBirthday(response.data.Birthday);
        localStorage.setItem("user", user);
        window.open(`/users/${user}`, "_self");
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  return (
    <>
      <h4>Edit profile</h4>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label className="label">Username:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          {values.userErr && <p>{values.userErr}</p>}
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="label">Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {values.passwordErr && <p>{values.passwordErr}</p>}
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label className="label">Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
          {values.emailErr && <p>{values.emailErr}</p>}
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
        <Form.Group>
          <Button className="edit" onClick={handleSubmit}>
            Update Profile
          </Button>
          <Button
            className="danger"
            variant="outline-danger"
            onClick={handleDelete}
          >
            Delete profile
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

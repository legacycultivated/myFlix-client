import React from "react";

export function UserInfo({ name, email }) {
  return (
    <>
      <h4>User Info</h4>
      <h6>Username:</h6> <p>{name}</p>
      <h6>Email:</h6> <p>{email}</p>
    </>
  );
}

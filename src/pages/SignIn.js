import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

import "./styles/signIn.scss";
import AlertMessage from "../components/AlertMessage";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const { logIn, error } = useUserAuth();
  const onLogin = (e) => {
    e.preventDefault();
    logIn(email, password);
  };
  return (
    <div className="signin">
      <>
        <h3>Sing In</h3>
        <p>Hey, enter your details to get sign in to your account</p>
      </>
      {error && (
        <AlertMessage error={error}/>
      )}
      <form onSubmit={onLogin}>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          required
          value={email}
          id="outlined-required"
          label="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="password"
          required
          value={password}
          id="outlined-required"
          label="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button variant="contained" type="submit" color="primary">
          LOGIN
        </Button>
        <br />
        <br />
        Or <br /><a onClick={()=>navigate("/signup")}>register now!</a>
      </form>
    </div>
  );
}

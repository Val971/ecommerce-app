import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { useUserAuth } from "../context/UserAuthContext";
import AlertMessage from '../components/AlertMessage'

import "./styles/signIn.scss";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const { signUp,error } = useUserAuth();
  let navigate = useNavigate();

  const onSignUp = (e) => {
    e.preventDefault();
    signUp(userName, email, password);
  };
  return (
    <div className="sign">
      <>
        <h3>Sing Up</h3>
        <p>Hey, enter your details to get sign in to your new account</p>
      </>
      {error && (
        <AlertMessage error={error}/>
      )}
      <form onSubmit={onSignUp}>
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        required
        value={userName}
        label="Enter your username"
        variant="outlined"
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        required
        value={email}
        label="Enter your email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="password"
        required
        value={password}
        label="Enter your password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button variant="contained" type="submit" color="primary">
        SIGN UP
      </Button>
      </form>
      <br/>
         Or <br />  Already have an account?{" "}
            <a onClick={()=>navigate("/signin")}>Login!</a>
    </div>
  );
}

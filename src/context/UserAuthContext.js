import React, { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../config/Config.js";
import { useNavigate } from "react-router-dom";

export const userAuthContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  let navigate = useNavigate();

  const handleUserInfo = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        setError(null);
        navigate("/");
        toast.success(`Welcome ${res.user.displayName}`);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const signUp = (username, email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        setError(null);
        setUser(auth.currentUser);
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const logOut = () => {
    return signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/signin");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <userAuthContext.Provider
      value={{
        logIn,
        signUp,
        logOut,
        setUser,
        user,
        loading,
        error,
        handleUserInfo,
        userInfo,
      }}
    >
      <ToastContainer />
      {children}
    </userAuthContext.Provider>
  );
}
export function useUserAuth() {
  return useContext(userAuthContext);
}

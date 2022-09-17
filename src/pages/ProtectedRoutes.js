import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { userAuthContext } from "../context/UserAuthContext";

const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(userAuthContext);
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return children;
};
export default ProtectedRoutes;

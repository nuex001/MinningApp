import React, { useContext } from "react";
import { Route, Navigate, useNavigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return !localStorage.token ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;

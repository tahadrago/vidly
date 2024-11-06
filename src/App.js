import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import { useEffect, useState } from "react";
// import Movieform from "./components/movieform";
import LoginForm from "./components/loginForm";
import Register from "./components/register";
import "react-toastify/dist/ReactToastify.css";
import "./main.css";
import Movieform2 from "./components/movieform2";
import auth from "./services/authService";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
    // console.log("user is", user);
  }, []);
  return (
    <div>
      <ToastContainer />
      <Navbar user={user} />
      <Routes>
        <Route path="/movies" element={<Movies user={user} />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <Movieform2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/new"
          element={
            <ProtectedRoute>
              <Movieform2 />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/movies/:id/*" element={<Navigate to="/not-found" />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
};

export default App;

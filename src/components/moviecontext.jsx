import React, { createContext, useState, useEffect } from "react";
import { getMovies } from "../services/movieService"; // Adjust the import to your service file
import http from "../services/httpService";
export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMovies();
      setMovies(movies.data);
    };
    fetchMovies();
  }, []);

  const addMovie = async (newMovie) => {
    try {
      const response = await http.post(
        "http://localhost:3900/api/movies",
        newMovie
      );
      setMovies([...movies, response.data]);
    } catch (error) {
      console.error(
        "Failed to add movie:",
        error.response?.data || error.message
      );
    }
  };

  const updateMovie = async (movieId, updatedMovie) => {
    try {
      const response = await http.put(
        `http://localhost:3900/api/movies/${movieId}`,
        updatedMovie
      );
      const { data } = response;
      setMovies((prevMovies) =>
        prevMovies.map((m) =>
          m._id === movieId ? { ...m, ...data } : m
        )
      ); // Use functional form
    } catch (error) {
      console.error(
        "Failed to update movie:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <MovieContext.Provider value={{ movies, setMovies, addMovie, updateMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

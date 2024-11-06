import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi";
import { MovieContext } from "./moviecontext";
import { getGenres } from "../services/genreService";
const MovieForm2 = () => {
  const navigate = useNavigate();
  const { addMovie, updateMovie, movies } = useContext(MovieContext);
  const [genres, setGenres] = useState([]);
  const [errors] = useState({});
  const { id: movieId } = useParams();
  const [data, setData] = useState({
    title: "",
    genre: "",
    numberInStock: "",
    rate: "",
  });

  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    rate: Joi.number().min(0).max(10).required().label("Rate"),
  });
  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await getGenres();
      // const fetchedGenres = [...data];
      setGenres(data); 
    };
    fetchGenres();
  }, []);


  useEffect(() => {
  if (!movieId) return; // If no movieId, we're adding a new movie
  
  // Only proceed if both movies and genres are loaded
  if (movies.length > 0 && genres.length > 0) {
    const movie = movies.find((m) => m._id === movieId);
    if (!movie) {
      navigate("/not-found");
    } else {
      setData({
        title: movie.title,
        genre: movie.genre._id, // Set genre by id
        numberInStock: movie.numberInStock,
        rate: movie.dailyRentalRate,
      });
    }
  }
}, [movieId, movies, genres, navigate]); // Add genres to dependencies
  
  const doSubmit = (formData) => {
    const selectedGenre = genres.find((g) => g._id === formData.genre);
    if (movieId) {
      const updatedMovie = {
        title: formData.title,
        genreId: selectedGenre._id,
        numberInStock: formData.numberInStock,
        dailyRentalRate: formData.rate,
        // liked: false,
      };
      updateMovie(movieId, updatedMovie);
    } else {
      const newMovie = {
        // _id: Date.now().toString(),
        title: formData.title,
        genreId: selectedGenre._id,
        numberInStock: formData.numberInStock,
        dailyRentalRate: formData.rate,
        // liked: false,
      };
      addMovie(newMovie);
    }
    navigate("/movies");
  };
  return (
    <div className="mt-6 max-w-[676px] flex flex-col justify-center mx-6 md:mx-auto">
      <h1 className="mb-3 text-3xl font-semibold">
        {movieId ? "Edit Movie" : "New Movie"}
      </h1>
      <Form
        schema={schema}
        initialData={data}
        onSubmit={doSubmit}
        btnName="Save"
        errors={errors}
      >
        <Input name="title" label="Title" autoFocus />
        <Input name="genre" label="Genre" options={genres} />
        <Input
          name="numberInStock"
          label="Number in Stock"
          type="number"
          step="1"
          min="0"
          max="100"
        />
        <Input name="rate" label="Rate" />
      </Form>
    </div>
  );
};

export default MovieForm2;

import React, { useState, useEffect, useMemo, useContext } from "react";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import { MovieContext } from "./moviecontext";
import _ from "lodash";
import SearchBox from "./common/searchBox";
import { deleteMovies } from "../services/movieService";
import { toast } from "react-toastify";
const Movies = ({ user }) => {
  // Get movies and setMovies from MovieContext
  const { movies, setMovies } = useContext(MovieContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [genres, setGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const Genres = async () => {
      const { data } = await getGenres();
      const fetchedGenres = [{ _id: "", name: "All Genres" }, ...data];
      setGenres(fetchedGenres); // Populate genres state
      setCurrentGenre(fetchedGenres[0]);
    };
    Genres();
  }, []);

  // Handle delete functionality
  const handleDelete = async (movie) => {
    const originalMovies = movies;
    const updatedMovies = originalMovies.filter((m) => m._id !== movie._id);
    setMovies(updatedMovies);
    try {
      await deleteMovies(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");
      setMovies(originalMovies);
    }
  };

  // Handle like functionality
  const handleLike = (movie) => {
    const updatedMovies = movies.map((m) =>
      m._id === movie._id ? { ...m, liked: !m.liked } : m
    );
    setMovies(updatedMovies);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle genre change
  const handleGenreChange = (genre) => {
    setCurrentPage(1);
    setCurrentGenre(genre);
    setSearchQuery("");
  };

  // Handle sorting
  const handleSorting = (sortedColumn) => {
    setSortColumn(sortedColumn);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentGenre(null);
    setCurrentPage(1);
  };
  // Filter and paginate movies
  const filteredMovies = useMemo(() => {
    let filtered = movies;
    if (currentGenre && currentGenre._id)
      filtered = movies.filter((m) => m.genre._id === currentGenre._id);
    if (searchQuery) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
      );
    }
    return filtered;
  }, [movies, currentGenre, searchQuery]);

  // Sort the filtered movies
  const sorted = useMemo(() => {
    return _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
  }, [filteredMovies, sortColumn]);

  // Paginate the filtered and sorted movies
  const moviesPag = paginate(sorted, currentPage, pageSize);

  if (filteredMovies.length === 0) {
    return (
      <p className="m-16 mt-8 md:text-lg">
        There are no movies in the database
      </p>
    );
  }

  return (
    <div className="mx-12 mt-8 md:text-lg md:mx-20 relative">
      <div className="flex space-x-6">
        <div data-aos="slide-right" className="w-1/4">
          <ListGroup
            genres={genres}
            onClick={handleGenreChange}
            currentGenre={currentGenre}
          />
        </div>
        <div data-aos="fade-up" className="w-3/4">
          <Link
            to="/movies/new" // Use `state` prop separately
            className={
              !user
                ? "hidden"
                : " bg-blue-600 text-white p-2 rounded-md px-4 hover:bg-blue-700"
            }
          >
            New Movie
          </Link>
          <h1 className={!user ? "mb-4" : "mb-4 mt-4 "}>
            Showing {filteredMovies.length} movies in the database.
          </h1>
          <SearchBox onChange={handleSearch} value={searchQuery} />
          <MoviesTable
            user={user}
            moviesPag={moviesPag}
            onLike={handleLike}
            onDelete={handleDelete}
            onSort={handleSorting}
            sortColumn={sortColumn}
          />
        </div>
      </div>
      <footer className="my-6">
        <Pagination
          itemsCount={filteredMovies.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </footer>
    </div>
  );
};

export default Movies;

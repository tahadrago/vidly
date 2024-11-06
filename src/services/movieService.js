import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/movies";
export function getMovies() {
  return http.get(apiEndpoint);
}
export function deleteMovies(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}

import axios from "axios";
import logger from "./logService";
// import * as Sentry from "@sentry/react";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurred.");
  }
  return Promise.reject(error);
});
function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
// axios.interceptors.response.use(null, error => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;

//   if (!expectedError) {
//     // console.log("logging the error", error);
//     // alert("An unexpected error occurred.");
//     logger.log(error);
//     toast.error("An unexpected error occurred.");
//   }

//   return Promise.reject(error);
// });

// export default {
//   get: axios.get,
//   post: axios.post,
//   put: axios.put,
//   delete: axios.delete
// };

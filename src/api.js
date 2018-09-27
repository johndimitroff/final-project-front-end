//this file sets up everything we're going to need consistently every time we do an axios request,
//so that we can use an abbreviated version of an axios request (api.get) everywhere else

import axios from "axios";

const api = axios.create({
  //the start of all our backend routes URLs
  baseURL: "http://localhost:4000/api",
  //allows axios to send cookies to the backend
  withCredentials: true
});

export default api;

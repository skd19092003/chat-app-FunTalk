import axios from "axios";

// Instead of: axios.post or axios.get("http://localhost:5001/api/auth/login", data)
//we will use this in frontend --> axiosInstance.post or .get("/auth/login", data);

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});

//basically we make api calls to backend using this axiosInstance and axios send cookies along with requests for authentication
//as backend uses cookie-parser for auth checking so we send cookies by using withcredentials: true



//detailed
/*What axios.create() does:
Creates a separate Axios instance: Instead of using the global axios object, it creates a new instance that you can configure independently.
Allows custom defaults: You can set default configuration that applies to all requests made with that instance, such as:
baseURL: Base URL for all requests
headers: Default headers
timeout: Request timeout
withCredentials: Whether to send cookies
And many other options */

/*In Development: baseURL = "http://localhost:5001/api"
Your backend runs on port 5001 (as seen in your backend's index.js)
Frontend runs on port 5173 (Vite default)
So it makes cross-origin requests to http://localhost:5001/api/...
In Production: baseURL = "/api"
Uses a relative path instead of localhost
Assumes the frontend and backend are served from the same domain/port
In your backend's index.js, you have production setup that serves static files and has a catch-all route, so /api requests will be handled by your backend's API routes */

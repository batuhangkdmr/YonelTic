const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5054/api"
    : "https://yonelotoyedekparca.com/api";

export default {
  API_BASE_URL,
}; 
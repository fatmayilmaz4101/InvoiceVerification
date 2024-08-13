import axios from "axios";

const API_BASE_URL = "http://localhost:5027/api";
const ApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
export default ApiClient;

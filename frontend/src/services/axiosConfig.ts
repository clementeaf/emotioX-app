import axios from "axios";
import { apiConfig } from "../config/apiConfig";

export const api = axios.create({
    baseURL: apiConfig.ApiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });
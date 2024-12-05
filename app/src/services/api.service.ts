import { BASE_API_URL } from "@/constants/envs";
import { ACCESS_TOKEN } from "@/constants/tokens";
import { cache } from "@/utils/cache.util";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_API_URL,
});

api.interceptors.request.use(async (initialConfig) => {
  const config = initialConfig;

  if (cache.has(ACCESS_TOKEN)) {
    config.headers["Authorization"] = `Bearer ${cache.getValue(ACCESS_TOKEN)}`;
  }

  return config;
});

export { api };

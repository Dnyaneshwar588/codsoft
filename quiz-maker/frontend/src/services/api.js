import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "/api"
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("quiz_auth");
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authService = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  me: () => api.get("/auth/me")
};

export const quizService = {
  list: () => api.get("/quizzes"),
  get: (id) => api.get(`/quizzes/${id}`),
  create: (payload) => api.post("/quizzes", payload),
  submit: (id, payload) => api.post(`/quizzes/${id}/submit`, payload)
};

export const resultService = {
  myResults: () => api.get("/results/my")
};

export default api;

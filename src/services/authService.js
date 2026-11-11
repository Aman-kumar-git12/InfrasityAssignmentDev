import axiosClient from "../api/axiosClient";

export const signup = (payload) => axiosClient.post("/auth/signup", payload);
export const login = (payload) => axiosClient.post("/auth/login", payload);
export const getMe = () => axiosClient.get("/auth/me");
export const logout = () => axiosClient.post("/auth/logout");

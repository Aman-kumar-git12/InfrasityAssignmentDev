import axiosClient from "../api/axiosClient";

export const getNotes = () => axiosClient.get("/notes");
export const getNote = (id) => axiosClient.get(`/notes/${id}`);
export const createNote = (payload) => axiosClient.post("/notes", payload);
export const updateNote = (id, payload) => axiosClient.put(`/notes/${id}`, payload);
export const deleteNote = (id) => axiosClient.delete(`/notes/${id}`);

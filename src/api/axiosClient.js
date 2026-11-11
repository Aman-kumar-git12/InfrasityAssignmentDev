import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

let onUnauthorized = () => {};
export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

// a 401 from these just means wrong password / not logged in, not an expired session
const AUTH_CHECK_URLS = ["/auth/login", "/auth/signup", "/auth/me"];

axiosClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;

    if (status === 401 && !AUTH_CHECK_URLS.includes(err.config?.url)) {
      onUnauthorized(message);
    }

    return Promise.reject({ status, message });
  }
);

export default axiosClient;

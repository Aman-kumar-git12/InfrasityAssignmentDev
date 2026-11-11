import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Loader from "../components/Loader";

const NotFoundPage = () => {
  const { pathname } = useLocation();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        await axiosClient.get(`/not-found${pathname}`);
      } catch (error) {
        setMessage(error.message);
      }
    };
    load();
  }, [pathname]);

  if (message === null) return <Loader />;

  return (
    <div className="container center">
      <h1>404</h1>
      <p>{message}</p>
      <Link to="/saved" className="btn">Home</Link>
    </div>
  );
};

export default NotFoundPage;

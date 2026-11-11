import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="hamburger" onClick={onMenuClick} aria-label="Open saved notes">
          <span />
          <span />
          <span />
        </button>
        <Link to="/saved" className="brand">
          Notes
        </Link>
      </div>

      <div className="nav-right">
        <span className="nav-user">{user?.name}</span>
        <button className="btn btn-outline btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

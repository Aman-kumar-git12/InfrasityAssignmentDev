import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`;

const Sidebar = ({ open, onClose }) => (
  <>
    {open && <div className="backdrop" onClick={onClose} />}

    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>Menu</h2>
        <button className="icon-btn" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/new" className={linkClass}>
          + New note
        </NavLink>
        <NavLink to="/saved" className={linkClass}>
          Saved notes
        </NavLink>
      </nav>
    </aside>
  </>
);

export default Sidebar;

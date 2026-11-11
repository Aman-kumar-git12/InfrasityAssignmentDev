import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Date(date).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

const NoteCard = ({ note, onDelete }) => (
  <article className="note-card">
    <time className="meta">{formatDate(note.updatedAt)}</time>
    <h3>{note.title}</h3>
    {note.content && <p className="note-preview">{note.content}</p>}

    <div className="card-actions">
      <Link to={`/saved/${note._id}/viewonly`} className="text-btn">
        View
      </Link>
      <Link to={`/saved/${note._id}/edit`} className="text-btn">
        Edit
      </Link>
      <button className="text-btn danger" onClick={() => onDelete(note)}>
        Delete
      </button>
    </div>
  </article>
);

export default NoteCard;

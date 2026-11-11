import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as noteService from "../services/noteService";
import useFlashAlert from "../hooks/useFlashAlert";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const NoteViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useFlashAlert();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const res = await noteService.getNote(id);
        setNote(res.data.note);
      } catch (error) {
        setAlert({ type: "error", text: error.message });
      } finally {
        setLoading(false);
      }
    };
    loadNote();
  }, [id, setAlert]);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await noteService.deleteNote(id);
      navigate("/saved", { state: { alert: { type: "success", text: res.message } } });
    } catch (error) {
      setAlert({ type: "error", text: error.message });
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Link to="/saved" className="back-link">
        Back to notes
      </Link>

      <Alert type={alert?.type} message={alert?.text} onClose={() => setAlert(null)} />

      {note && (
        <article className="note-view">
          <div className="page-header">
            <h1>{note.title}</h1>
            <div className="card-actions">
              <Link to={`/saved/${id}/edit`} className="btn btn-outline">
                Edit
              </Link>
              <button className="btn btn-danger" onClick={() => setConfirmOpen(true)}>
                Delete
              </button>
            </div>
          </div>
          <time className="meta">{new Date(note.updatedAt).toLocaleString()}</time>
          <p className="note-content">{note.content}</p>
        </article>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete note?"
        message={`"${note?.title}" will be permanently deleted.`}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default NoteViewPage;

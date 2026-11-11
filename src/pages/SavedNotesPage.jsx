import { useEffect, useState } from "react";
import * as noteService from "../services/noteService";
import useAuth from "../hooks/useAuth";
import useFlashAlert from "../hooks/useFlashAlert";
import NoteCard from "../components/NoteCard";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const SavedNotesPage = () => {
  const { authMessage, setAuthMessage } = useAuth();
  const [alert, setAlert] = useFlashAlert();
  const [notes, setNotes] = useState([]);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadNotes = async () => {
    try {
      const res = await noteService.getNotes();
      setNotes(res.data.notes);
      setEmptyMessage(res.message);
    } catch (error) {
      setAlert({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (authMessage) {
      setAlert(authMessage);
      setAuthMessage(null);
    }
  }, [authMessage, setAuthMessage, setAlert]);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await noteService.deleteNote(noteToDelete._id);
      setAlert({ type: "success", text: res.message });
      await loadNotes();
    } catch (error) {
      setAlert({ type: "error", text: error.message });
    } finally {
      setDeleting(false);
      setNoteToDelete(null);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Saved notes</h1>
        {!loading && notes.length > 0 && <span className="meta">{notes.length} total</span>}
      </div>

      <Alert type={alert?.type} message={alert?.text} onClose={() => setAlert(null)} />

      {loading ? (
        <Loader />
      ) : notes.length === 0 ? (
        <p className="empty">{emptyMessage}</p>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={setNoteToDelete} />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(noteToDelete)}
        title="Delete note?"
        message={`"${noteToDelete?.title}" will be permanently deleted.`}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setNoteToDelete(null)}
      />
    </>
  );
};

export default SavedNotesPage;

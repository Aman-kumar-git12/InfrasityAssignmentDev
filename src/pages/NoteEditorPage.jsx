import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as noteService from "../services/noteService";
import NoteForm from "../components/NoteForm";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const NoteEditorPage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(isEditing);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!isEditing) return;

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
  }, [id, isEditing]);

  const handleSubmit = async (values) => {
    try {
      const res = isEditing
        ? await noteService.updateNote(id, values)
        : await noteService.createNote(values);

      navigate(`/saved/${res.data.note._id}/viewonly`, {
        state: { alert: { type: "success", text: res.message } },
      });
    } catch (error) {
      setAlert({ type: "error", text: error.message });
    }
  };

  const handleCancel = () => navigate(isEditing ? `/saved/${id}/viewonly` : "/saved");

  if (loading) return <Loader />;

  const noteMissing = isEditing && !note;

  return (
    <>
      <div className="page-header">
        <h1>{isEditing ? "Edit note" : "New note"}</h1>
      </div>

      <Alert type={alert?.type} message={alert?.text} onClose={() => setAlert(null)} />

      {noteMissing ? (
        <Link to="/saved" className="back-link">
          Back to notes
        </Link>
      ) : (
        <section className="panel editor">
          <NoteForm
            initialTitle={note?.title}
            initialContent={note?.content}
            submitLabel={isEditing ? "Save changes" : "Create note"}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </section>
      )}
    </>
  );
};

export default NoteEditorPage;

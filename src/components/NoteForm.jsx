import { useState } from "react";

const NoteForm = ({ initialTitle = "", initialContent = "", submitLabel, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSubmit({ title, content });
    setSaving(false);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        className="title-input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Start writing..."
        rows={12}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn" disabled={saving}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;

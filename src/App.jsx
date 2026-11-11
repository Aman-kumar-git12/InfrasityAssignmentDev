import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import NotesLayout from "./components/NotesLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SavedNotesPage from "./pages/SavedNotesPage";
import NoteViewPage from "./pages/NoteViewPage";
import NoteEditorPage from "./pages/NoteEditorPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/saved" replace />} />

    <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />

    <Route element={<ProtectedRoute><NotesLayout /></ProtectedRoute>}>
      <Route path="/new" element={<NoteEditorPage key="new" />} />
      <Route path="/saved" element={<SavedNotesPage />} />
      <Route path="/saved/:id/viewonly" element={<NoteViewPage />} />
      <Route path="/saved/:id/edit" element={<NoteEditorPage key="edit" />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;

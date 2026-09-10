import { createNote } from "../../Api/noteApi";
import { useApp } from "../../Context";
import { getUser } from "../../Api/authStorage";

import "../Css/AddNote.css";
import { useState } from "react";

interface AddNotePopUpProps {
  onClose: () => void;
}

export const AddNotePopUp = ({ onClose }: AddNotePopUpProps) => {
  const user = getUser();
  const { setRespond } = useApp();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!user) return;

    try {
      setLoading(true);
      const data = await createNote(title, content, user.id);

      if (!data.success) {
        setRespond({
          message: data.error || "Failed to add note",
          type: "error",
        });
        setLoading(false);
        return;
      }

      setRespond({
        message: data.message || "Note added successfully!",
        type: "success",
      });
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Add note error:", error);
      setLoading(false);
      setRespond({
        message: "Something went wrong while adding the note.",
        type: "error",
      });
    }
  };

  return (
    <div className="add-note" onClick={onClose}>
      <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <input type="text" name="title" placeholder="Title" />

        <textarea name="content" placeholder="Content" />

        <button type="submit">
          {loading ? <div className="loader"></div> : "Add Note"}
        </button>
      </form>
    </div>
  );
};

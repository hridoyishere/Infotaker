import { useEffect, useState } from "react";
import { getNotes } from "../../Api/noteApi";
import { useApp } from "../../Context";
import { getUser } from "../../Api/authStorage";
import "../Css/Note.css";

export default function NotePage() {
  const user = getUser();

  const { setRespond, noteData, setNoteData } = useApp();

  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const handleNoteFetching = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const data = await getNotes(user.id);

      if (!data.success) {
        setRespond({
          message: data.error || "Failed to fetch Notes",
          type: "error",
        });

        return;
      }

      setNoteData(data.note);
    } catch (error) {
      console.error("Fetching Note error:", error);

      setRespond({
        message: "Something went wrong while fetching notes.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (index: number) => {
    // remove logic will go here
  };

  useEffect(() => {
    handleNoteFetching();
  }, []);

  return (
    <div className="note-page" onClick={() => setOpenMenu(null)}>
      <div className="note-page-header">
        <h1>My Notes</h1>
        <p>Keep your important notes here.</p>
      </div>

      <div className="notes-container">
        {loading ? (
          <p>Loading notes...</p>
        ) : noteData.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          noteData.map((note, index) => (
            <div className="note-card" key={note._id || index}>
              <button
                className="note-menu-btn"
                onClick={(e) => {
                  e.stopPropagation();

                  setOpenMenu(openMenu === index ? null : index);
                }}
                aria-label="Note options"
              >
                ⋮
              </button>

              {openMenu === index && (
                <div className="note-menu" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => handleRemove(index)}>Remove</button>
                </div>
              )}

              <h2>{note.title}</h2>

              <p>{note.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

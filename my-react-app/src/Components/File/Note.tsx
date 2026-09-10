import { useEffect, useState } from "react";
import { getNotes, removeNote } from "../../Api/noteApi";
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

  const handleRemove = async (id: string) => {
    if (!id || !user) return;

    try {
      setLoading(true);
      const data = await removeNote(id, user.id);

      if (!data.success) {
        setRespond({
          message: data.error || "Failed to delete site",
          type: "error",
        });
        setLoading(false);
        return;
      } else {
        setRespond({
          message: data.message || "Delete Successfull",
          type: "success",
        });
        setNoteData((currentSites) =>
          currentSites.filter((site) => site._id !== id),
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setRespond({
        message: "Something went wrong while delete site.",
        type: "error",
      });
    }
    setOpenMenu(null);
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
        {noteData.length === 0 ? (
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
                  <button
                    onClick={() => {
                      if (note._id) handleRemove(note._id);
                    }}
                    disabled={loading}
                  >
                    {loading ? <div className="loader"></div> : "Remove"}
                  </button>
                  <button>Copy</button>
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

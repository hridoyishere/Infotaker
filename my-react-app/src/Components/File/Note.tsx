import { useState } from "react";
import { noteData } from "../../Api/data";
import "../Css/Note.css";

export default function NotePage() {
  const [notes, setNotes] = useState(noteData);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const handleRemove = (index: number) => {
    setNotes((currentNotes) =>
      currentNotes.filter((_, noteIndex) => noteIndex !== index)
    );

    setOpenMenu(null);
  };

  return (
    <div
      className="note-page"
      onClick={() => setOpenMenu(null)}
    >

      <div className="note-page-header">
        <h1>My Notes</h1>
        <p>Keep your important notes here.</p>
      </div>

      <div className="notes-container">

        {notes.map((note, index) => (
          <div className="note-card" key={index}>

            <button
              className="note-menu-btn"
              onClick={(e) => {
                e.stopPropagation();

                setOpenMenu(
                  openMenu === index ? null : index
                );
              }}
              aria-label="Note options"
            >
              ⋮
            </button>

            {openMenu === index && (
              <div
                className="note-menu"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => handleRemove(index)}>
                  Remove
                </button>
              </div>
            )}

            <h2>{note.title}</h2>

            <p>{note.des}</p>

          </div>
        ))}

      </div>

    </div>
  );
}
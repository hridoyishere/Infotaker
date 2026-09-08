
import { noteData } from "../../Api/data";
import "../Css/Note.css";

export default function NotePage() {
  return (
    <div className="note-page">

      <div className="note-page-header">
        <h1>My Notes</h1>
        <p>Keep your important notes here.</p>
      </div>

      <div className="notes-container">
        {noteData.map((note, index) => (
          <div className="note-card" key={index}>

            <h2>{note.title}</h2>

            <p>{note.des}</p>

          </div>
        ))}
      </div>

    </div>
  );
}

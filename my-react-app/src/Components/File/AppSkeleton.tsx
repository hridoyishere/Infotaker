import "../Css/AppSkeleton.css";
export const AppCartSkeleton = () => {
  return (
    <div className="AppCart">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="site-card skeleton-card" key={index}>
          <div className="site-logo skeleton-box skeleton-logo" />
          <div className="skeleton-box skeleton-text" />
        </div>
      ))}
    </div>
  );
};


export const NotePageSkeleton = () => {
  return (
    <div className="note-page">
      <div className="note-page-header">
        <h1>My Notes</h1>
        <p>Keep your important notes here.</p>
      </div>

      <div className="notes-container">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="note-card skeleton-note-card" key={index}>
            <div className="skeleton-box skeleton-title" />
            <div className="skeleton-box skeleton-text-line" />
            <div className="skeleton-box skeleton-text-line short" />
          </div>
        ))}
      </div>
    </div>
  );
};

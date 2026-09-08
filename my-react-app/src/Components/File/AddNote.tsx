import "../Css/AddNote.css";

interface AddNotePopUpProps {
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
}

export const AddNotePopUp = ({
  onClose,
  onSubmit,
}: AddNotePopUpProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    onSubmit(title, content);
  };

  return (
    <div className="add-note" onClick={onClose}>
      <h2>Add Note</h2>

      <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          name="title"
          placeholder="Title"
        />

        <textarea
          name="content"
          placeholder="Content"
        />

        <button type="submit">
          Add Note
        </button>
      </form>
    </div>
  );
};
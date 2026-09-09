import "../Css/MessagePopUp.css";
import { useApp } from "../../Context";

export default function MessagePopUp() {
  const { respond, setRespond } = useApp();

  const handleClose = () => {
    setRespond({
      message: "",
      type: "",
    });
  };

  if (!respond.message) {
    return null;
  }

  return (
    <div
      className={`message-popup ${respond.type}`}
      onClick={handleClose}
    >
      <div className="message-icon">
        {respond.type === "success" ? "✓" : "×"}
      </div>

      <p>{respond.message}</p>

      <button
        className="message-close"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        ×
      </button>
    </div>
  );
}

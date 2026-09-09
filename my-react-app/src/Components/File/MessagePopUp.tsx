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
      className="message-overlay"
      onClick={handleClose}
    >
      <div
        className={`message-popup ${respond.type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="message-icon">
          {respond.type === "success" ? "✓" : "×"}
        </div>

        <h3>
          {respond.type === "success"
            ? "Success"
            : "Failed"}
        </h3>

        <p>{respond.message}</p>

        <button onClick={handleClose}>OK</button>
      </div>
    </div>
  );
}
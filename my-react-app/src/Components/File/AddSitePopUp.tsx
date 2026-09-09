import { useState } from "react";
import "../Css/AddSitePopUp.css";

interface AddSitePopUpProps {
  onClose: () => void;
  onSubmit: (name: string, url: string) => void;
}

export const AddSitePopUp = ({ onClose, onSubmit }: AddSitePopUpProps) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(name, url);
  };

  return (
    <>
      <div className="add-site-popup-backdrop" onClick={onClose} />

      <div className="add-site-popup">
        <h2>Add New Site</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="site-name">Site Name:</label>

          <input
            type="text"
            id="site-name"
            name="site-name"
            placeholder="Enter site name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="site-url">Site URL:</label>

          <input
            type="url"
            id="site-url"
            name="site-url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          <button type="submit">Add Site</button>
        </form>
      </div>
    </>
  );
};

import { AddSitePopUp } from "./AddSitePopUp";
import { ProfilePopUp } from "./ProfilePopUp";
import {AddNotePopUp} from "./AddNote.tsx";
import { Search, User, Plus, StickyNote, Globe } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../Context.tsx";
import "../Css/Navbar.css";

function Navbar() {
  const { shownote, setShownNote } = useApp();
  const [PopUP, setPopUP] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

  const openAddSitePopup = () => {
    setPopUP(true);
  };

  const closeAddSitePopup = () => {
    setPopUP(false);
  };

  const openProfilePopup = () => {
  setIsProfilePopupOpen(true);
};

const closeProfilePopup = () => {
  setIsProfilePopupOpen(false);
};

  const handleAddSite = (name: string, url: string) => {
    console.log("Site Name:", name);
    console.log("Site URL:", url);

    closeAddSitePopup();
  };

  return (
    <nav className="navbar">

       {isProfilePopupOpen && (
        <ProfilePopUp onClose={closeProfilePopup} />
       )}

      {PopUP && (
        shownote ? (
          <AddNotePopUp onClose={closeAddSitePopup} onSubmit={handleAddSite} />
        ) : (
          <AddSitePopUp onClose={closeAddSitePopup} onSubmit={handleAddSite} />
        )
      )}

      <div className="nav-container">

        {/* Brand Logo */}
        <div className="nav-logo">
          <a href="/">
            Your Sites<span>.</span>
          </a>
        </div>

        {/* Search Bar */}
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search by name"
          />

          <button type="submit" aria-label="Search">
            <Search size={18} />
          </button>
        </div>

        {/* Actions */}
        <div className="nav-actions">
          
          <button
            className="icon-btn"
            aria-label="Add Site"
            onClick={() => setShownNote(!shownote)}
          >
            {shownote ? <StickyNote size={22} /> : <Globe size={22} />}
          </button>

          <button
            className="icon-btn"
            aria-label="Add Site"
            onClick={openAddSitePopup}
          >
            <Plus size={22} />
          </button>

          <button
            className="icon-btn"
            aria-label="Account"
            onClick={openProfilePopup}
          >
            <User size={22} />
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;

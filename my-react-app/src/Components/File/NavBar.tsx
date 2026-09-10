import { AddSitePopUp } from "./AddSitePopUp";
import { ProfilePopUp } from "./ProfilePopUp";
import { AddNotePopUp } from "./AddNote.tsx";
import { Search, User, Plus, StickyNote, Globe } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../Context.tsx";
import { getUser } from "../../Api/authStorage.ts";
import { createSite } from "../../Api/siteApi.ts";
import "../Css/Navbar.css";

function Navbar() {
  const user = getUser();
  const { shownote, setShownNote, setRespond } = useApp();
  const [PopUP, setPopUP] = useState(false);
  const [loading,setloading]=useState(false)
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

  const handleAddSite = async (name: string, url: string) => {
  if (!user) return;

  try {
    setloading(true)
    const data = await createSite(name, url, user.id);

    if (!data.success) {
      setRespond({
        message: data.error || "Failed to add site",
        type: "error",
      });
      setloading(false)
      return;
    }

    setRespond({
      message: data.message || "Site added successfully!",
      type: "success",
    });
    setloading(false)
    setPopUP(false);
  } catch (error) {
    console.error("Add site error:", error);
    setloading(false)
    setRespond({
      message: "Something went wrong while adding the site.",
      type: "error",
    });
  }
};

  return (
    <nav className="navbar">
      {isProfilePopupOpen && <ProfilePopUp onClose={closeProfilePopup} />}

      {PopUP &&
        (shownote ? (
          <AddNotePopUp onClose={closeAddSitePopup} />
        ) : (
          <AddSitePopUp onClose={closeAddSitePopup} onSubmit={handleAddSite} loading={loading} />
        ))}

      <div className="nav-container">
        {/* Brand Logo */}
        <div className="nav-logo">
          <span>Notes</span>
        </div>

        {/* Search Bar */}
        <div className="nav-search">
          <input type="text" placeholder="Search by name" />

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

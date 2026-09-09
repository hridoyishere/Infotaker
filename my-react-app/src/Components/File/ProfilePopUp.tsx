import { getUser } from "../../Api/authStorage";

import "../Css/ProfilePopUp.css";

interface ProfilePopUpProps {
  onClose: () => void;
}

export const ProfilePopUp = ({ onClose }: ProfilePopUpProps) => {
  const User=getUser()

  const LogOut = ()=>{
    localStorage.clear()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="profile-popup-backdrop"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="profile-popup">

        {/* Profile Header */}
        <div className="profile-header">

          <div className="profile-avatar">
            H
          </div>

          <div className="profile-info">
            <h3>{User?.name}</h3>
            <p>{User?.email}</p>
          </div>

        </div>

        {/* Menu */}
        <div className="profile-menu">

          <button
            className="profile-menu-item logout"
            onClick={() => {
              LogOut()
              onClose();
              window.location.reload();
            }}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </div>
    </>
  );
};

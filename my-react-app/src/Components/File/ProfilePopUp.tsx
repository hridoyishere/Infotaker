import "../Css/ProfilePopUp.css";

interface ProfilePopUpProps {
  onClose: () => void;
}

export const ProfilePopUp = ({ onClose }: ProfilePopUpProps) => {
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
            <h3>Hridoy</h3>
            <p>hridoy@example.com</p>
          </div>

        </div>

        {/* Menu */}
        <div className="profile-menu">

          <button className="profile-menu-item">
            <span>✏️</span>
            Edit Profile
          </button>

          <button className="profile-menu-item">
            <span>⚙️</span>
            Settings
          </button>

          <button
            className="profile-menu-item logout"
            onClick={() => {
              console.log("Logout");
              onClose();
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

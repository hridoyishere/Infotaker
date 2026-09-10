import { useEffect, useState } from "react";
import { getSites, removeSite } from "../../Api/siteApi";
import { getUser } from "../../Api/authStorage";
import { useApp } from "../../Context";
import "../Css/AppCart.css";

export default function AppCart() {
  const user = getUser();

  const { siteData, setSiteData, setRespond } = useApp();
  const [loading, setloading] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Remove site
  const handleRemove = async (id: string) => {
    if (!id || !user) return;

    try {
      setloading(true);
      const data = await removeSite(id, user.id);

      if (!data.success) {
        setRespond({
          message: data.error || "Failed to delete site",
          type: "error",
        });
        setloading(false);
        return;
      } else {
        setRespond({
          message: data.message || "Delete Successfull",
          type: "success",
        });
        setSiteData((currentSites) =>
          currentSites.filter((site) => site._id !== id),
        );
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      setRespond({
        message: "Something went wrong while delete site.",
        type: "error",
      });
    }
    setOpenMenu(null);
  };

  // Fetch user's sites
  const handleSiteFetching = async () => {
    if (!user) return;

    try {
      const data = await getSites(user.id);

      if (!data.success) {
        setRespond({
          message: data.error || "Failed to fetch sites",
          type: "error",
        });
        return;
      }
      setSiteData(data.sites);
    } catch (error) {
      console.error("Fetching sites error:", error);
      setRespond({
        message: "Something went wrong while fetching sites.",
        type: "error",
      });
    }
  };

  // Fetch sites when component loads
  useEffect(() => {
    handleSiteFetching();
  }, []);

  return (
    <div className="AppCart" onClick={() => setOpenMenu(null)}>
      {siteData.map((site) => (
        <div className="site-card" key={site._id}>
          {/* Three-dot button */}
          <button
            className="site-menu-btn"
            onClick={(e) => {
              e.stopPropagation();

              setOpenMenu(openMenu === site._id ? null : (site._id ?? null));
            }}
            aria-label="Site options"
          >
            ⋮
          </button>

          {/* Menu */}
          {openMenu === site._id && (
            <div className="site-menu" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  if (site._id) {
                    handleRemove(site._id);
                  }
                }}
                disabled={loading}
              >
                {loading ? <div className="loader"></div> : "Remove"}
              </button>
            </div>
          )}

          {/* Site */}
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="site-link"
          >
            <div className="site-logo">
              <img
                src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=64`}
                alt={`${site.name} logo`}
              />
            </div>

            <span className="site-name">{site.name}</span>
          </a>
        </div>
      ))}
    </div>
  );
}

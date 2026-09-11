import { useEffect, useState,useMemo } from "react";
import { getSites, removeSite } from "../../Api/siteApi";
import { getUser } from "../../Api/authStorage";
import { useApp } from "../../Context";
import { AppCartSkeleton } from "./AppSkeleton";
import "../Css/AppCart.css";

export default function AppCart() {
  const user = getUser();

  const { siteData, setSiteData, setRespond, searchTerm } = useApp();
  const [loading, setloading] = useState(false);
  const [skeletonloading, setskeletonloading] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredSites = useMemo(() => {
    const term = (searchTerm || "").trim().toLowerCase();
    if (!term) return siteData;

    return siteData.filter((site) => {
      const name = (site.name || "").toLowerCase();
      const url = (site.url || "").toLowerCase();
      return name.includes(term) || url.includes(term);
    });
  }, [siteData, searchTerm]);

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
      setskeletonloading(true);
      const data = await getSites(user.id);

      if (!data.success) {
        setRespond({
          message: data.error || "Failed to fetch sites",
          type: "error",
        });
        return;
      }
      setSiteData(data.sites);
      setskeletonloading(false);
    } catch (error) {
      setskeletonloading(false);
      console.error("Fetching sites error:", error);
      setRespond({
        message: "Something went wrong while fetching sites.",
        type: "error",
      });
    }
  };

  const call = () => {
    if (siteData.length === 0) {
      handleSiteFetching();
    }
  };
  useEffect(() => {
    call();
  }, []);

  if (skeletonloading) {
    return <AppCartSkeleton />;
  }

  if (siteData.length === 0) {
    return (
      <div className="not-found">
        <h2>Not Found! Create or refresh.</h2>
        <button type="button" onClick={handleSiteFetching}>
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="AppCart" onClick={() => setOpenMenu(null)}>
      {filteredSites.length === 0 ? (
        <div className="nofound">
          <p>No results for "{searchTerm}"!</p>
        </div>
      ) : (
        filteredSites.map((site) => (
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
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(site.url);
                    setOpenMenu(null);
                  }}
                >
                  Copy
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
        ))
      )}
    </div>
  );
}

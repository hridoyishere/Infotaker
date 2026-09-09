import { useState } from "react";
import { siteData } from "../../Api/data";
import "../Css/AppCart.css";

export default function AppCart() {
  const [sites, setSites] = useState(siteData);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleRemove = (name: string) => {
    setSites((currentSites) =>
      currentSites.filter((site) => site.name !== name)
    );

    setOpenMenu(null);
  };

  return (
    <div
      className="AppCart"
      onClick={() => setOpenMenu(null)}
    >
      {sites.map((site) => (
        <div className="site-card" key={site.name}>

          {/* Three-dot button */}
          <button
            className="site-menu-btn"
            onClick={(e) => {
              e.stopPropagation();

              setOpenMenu(
                openMenu === site.name ? null : site.name
              );
            }}
            aria-label="Site options"
          >
            ⋮
          </button>

          {/* Menu */}
          {openMenu === site.name && (
            <div
              className="site-menu"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => handleRemove(site.name)}>
                Remove
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

            <span className="site-name">
              {site.name}
            </span>
          </a>

        </div>
      ))}
    </div>
  );
}

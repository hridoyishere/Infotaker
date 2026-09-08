
import { siteData } from "../../Api/data";
import "../Css/AppCart.css";

export default function AppCart() {
  return (
    <div className="AppCart">
      {siteData.map((site) => (
        <a
          key={site.name}
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="site-card"
        >
          <div className="site-letter">
            {site.name[0]}
          </div>

          <span className="site-name">
            {site.name}
          </span>
        </a>
      ))}
    </div>
  );
}
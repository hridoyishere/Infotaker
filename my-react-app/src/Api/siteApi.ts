import type { SiteData } from "./data";

const API_URL = "http://localhost:5000/api/sites";

export const getSites = async (): Promise<SiteData[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to get sites");
  }

  return response.json();
};

export const createSite = async (name: string, url: string ): Promise<SiteData> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      url,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create site");
  }

  return response.json();
};
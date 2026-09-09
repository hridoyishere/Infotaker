export interface SiteData {
  _id?: string;
  userid: string;
  name: string;
  url: string;
}

export interface SiteResponse {
  success: boolean;
  message?: string;
  error?: string;
  sites: SiteData[];
}

export interface CreateSiteResponse {
  success: boolean;
  message?: string;
  error?: string;
  site?: SiteData;
}

const API_URL = "http://localhost:5000/api/sites";

export const createSite = async (
  name: string,
  url: string,
  userid: string,
): Promise<CreateSiteResponse> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      url,
      userid,
    }),
  });

  return response.json();
};

export const getSites = async (
  userid: string,
): Promise<SiteResponse> => {
  const response = await fetch(`${API_URL}/${userid}`);

  if (!response.ok) {
    throw new Error("Failed to get sites");
  }

  return response.json();
};
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

export interface RemoveSiteResponse {
  success: boolean;
  message?: string;
  error?: string;
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

export const getSites = async ( userid: string,): Promise<SiteResponse> => {

  const response = await fetch(`${API_URL}/${userid}`);

  return response.json();
};

export const removeSite = async (  siteid: string, userid: string ): Promise<RemoveSiteResponse> => {
  const response = await fetch(`${API_URL}/${siteid}/${userid}`, {
    method: "DELETE",
  });

  return response.json();
};
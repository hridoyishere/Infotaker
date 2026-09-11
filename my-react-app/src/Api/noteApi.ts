export interface NoteData {
  _id?: string;
  userid: string;
  title: string;
  text: string;
}

export interface CreateNoteResponse {
  success: boolean;
  message?: string;
  error?: string;
  note?: NoteData;
}
export interface NoteResponse {
  success: boolean;
  message?: string;
  error?: string;
  note: NoteData[];
}

export interface RemoveNoteResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export const createNote = async (
  title: string,
  text: string,
  userid: string,
): Promise<CreateNoteResponse> => {
  const response = await fetch(`${API_URL}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      text,
      userid,
    }),
  });

  return response.json();
};

export const getNotes = async (userid: string): Promise<NoteResponse> => {
  const response = await fetch(`${API_URL}/api/notes/${userid}`);

  return response.json();
};

export const removeNote = async (
  noteid: string,
  userid: string,
): Promise<RemoveNoteResponse> => {
  const response = await fetch(`${API_URL}/api/notes/${noteid}/${userid}`, {
    method: "DELETE",
  });

  return response.json();
};

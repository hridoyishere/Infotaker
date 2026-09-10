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
const API_URL = "http://localhost:5000/api/notes";

export const createNote = async (
  title: string,
  text: string,
  userid: string,
): Promise<CreateNoteResponse> => {
  const response = await fetch(API_URL, {
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
  const response = await fetch(`${API_URL}/${userid}`);

  return response.json();
};

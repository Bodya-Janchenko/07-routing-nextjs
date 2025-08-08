import axios from "axios";
import type { Note } from "../types/note";
import type { NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  searchNote?: string,
  page?: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      headers: {
        Authorization: `Bearer ${KEY}`,
      },
      params: {
        ...(searchNote !== "" && { search: searchNote }),
        page,
        perPage: 12,
      },
    }
  );

  return response.data;
};

interface CreateNoteProps {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (newNote: CreateNoteProps): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  return response.data;
};

export const getSingleNote = async (id: string) => {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  return response.data;
};

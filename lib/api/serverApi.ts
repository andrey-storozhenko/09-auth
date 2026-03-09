import { cookies } from 'next/headers';
import { nextServer } from './api';
import type { User } from "@/types/user";
import type { Note } from "@/types/note";

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchServerNotes = async (title: string, page: number, category?: string): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      search: title,
      page,
      perPage: 10,
      sortBy: "created",
      tag: category,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
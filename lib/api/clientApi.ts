import type { Note } from "@/types/note";
import type { NoteFormValues } from '@/types/note';
import { nextServer } from './api';
import type { User } from "@/types/user";

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (title: string, page: number, category?: string) => {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      search: title,
      page,
      perPage: 10,
      sortBy: "created",
      tag: category,
    }
  });
  return response.data;
};

export const createNote = async ({ title, content, tag }: NoteFormValues): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", {
    title,
    content,
    tag,
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get('/auth/session');
  return res.data;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type UpdateUserRequest = {
  username?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
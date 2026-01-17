import axios from "axios";
import type { Note, NoteFormValues } from "../types/note";


const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
});

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}



export async function fetchNotes(
    page: number = 1,
    search: string = '',
    tag?: string
): Promise<FetchNotesResponse> {
    const { data } = await axiosInstance.get<FetchNotesResponse>("/notes", {
        params: {
            search,
            page,
            perPage: 12,
            tag,
        },
    });
    return data;
}


export async function createNote(newNote: NoteFormValues): Promise<Note> {
    const { data } = await axiosInstance.post<Note>(`/notes`, newNote);
    return data;
}



export async function deleteNote(id: string): Promise<Note> {
    const { data } = await axiosInstance.delete<Note>(`/notes/${id}`);
    return data;
}



export async function fetchNoteById(id: Note['id']) {
    const { data } = await axiosInstance.get<Note>(`/notes/${id}`);
    return data;
}



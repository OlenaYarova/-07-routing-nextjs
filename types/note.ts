export type NoteTag = "Todo"| "Work" | "Personal" | "Shopping" |"Meeting";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormValues {
    title: string;
    content?: string;
    tag: NoteTag;
}


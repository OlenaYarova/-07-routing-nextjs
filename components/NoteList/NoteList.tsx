import css from '@/components/NoteList/NoteList.module.css'
import type { Note } from '../../.next/types/note';
 import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast'
import { deleteNote } from '@/lib/api'
import Link from "next/link";


interface NoteListProps{
    notes: Note[];
}
 
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,

    onMutate: (id: string) => setDeleteId(id),
  
    onSettled: () => {
      setDeleteId(null);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
  },
    onSuccess: () => {
      toast.success("Note delete!");
  },
    onError: () => {
      toast.error("Failed to delete. Please try again");
    },
    });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => {
        return (
          <li key={id} className={css.listItem}>
            <h2 className={css.title}> {title}</h2>
            <p className={css.content}> {content}</p>
            <div className={css.footer}>
              <span className={css.tag}> {tag}</span>
                <Link className={css.link} href={`/notes/${id}`}>View details</Link>
              <button className={css.button}
                disabled={deleteId === id}
                onClick={() => deleteNoteMutation.mutate(id)}
              >Delete</button>
            </div>
          </li>);
      })}
    </ul>
  );    
          }
 
   

     
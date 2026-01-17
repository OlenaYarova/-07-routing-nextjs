"use client"
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';


const NotePreviewClient = () => {
    const { id } = useParams<{ id: string }>();

    const router = useRouter();
    
      const handleClickBack = () => {
    router.back();
  };


    const { data: note,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error || !note)  return <p>Something went wrong.</p> ;
    
    const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

    return (
        <Modal onClose={handleClickBack}>
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                    <p className={css.date}>{formattedDate}</p>
                    <button className={css.backBtn} onClick={handleClickBack}>Back</button>
            </div>
            </div>
            </Modal>
    );

};


export default NotePreviewClient;
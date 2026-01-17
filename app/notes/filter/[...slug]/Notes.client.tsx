'use client';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox'
import NoteList from "@/components/NoteList/NoteList"
import Pagination from '@/components/Pagination/Pagination'
import React, { useEffect, useState } from 'react'
import { fetchNotes } from '@/lib/api'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from 'react-hot-toast'
import {useDebouncedCallback} from 'use-debounce'
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

type NotesClientsProps = {
	tag?: string;
    // page: number;
    // query: string;
  
}

export default function NotesClient({tag}: NotesClientsProps) {
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	
function openModal(): void{
	setIsModalOpen(true);
}
	function closeModal(): void{
		setIsModalOpen(false);
}

	const { data, isSuccess } = useQuery({
		queryKey: ["notes", page, query, tag],
		queryFn: () => fetchNotes(page, query.trim(),tag),
		placeholderData: keepPreviousData,
		refetchOnMount: false,
		
	})

	useEffect(() => {
		if (isSuccess && data && data.notes.length === 0) {
			toast.error('No notes.');
		}
	}, [isSuccess, data]
	);

	const notes = data?.notes || [];
	const totalPages = data?.totalPages || 0;

	
	const handleChangeQuery = useDebouncedCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPage(1),
			setQuery(event.target.value)
		}, 1000
	);
	

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox onChange={handleChangeQuery} />
				{totalPages > 1 &&
					(
						<Pagination
							totalPages={totalPages}
							page={page}
							onSetPage={setPage}
						/>
					
					)}
				<button className={css.button} onClick={openModal}> Create note </button>
			</header>
			
			{notes.length > 0 && <NoteList notes={notes} />}
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<NoteForm onCloseModal={closeModal} />
				</Modal>
			)}
			<Toaster />
			
		</div>
	);
}


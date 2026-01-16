import {fetchNotes } from '@/lib/api'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from '../../Notes.client';




interface NotesByCategoryProps {
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<{
        page?: string; 
        query?: string;
    }>
};

export default async function NotesByCategory({ params, searchParams }: NotesByCategoryProps) {
    const { slug } = await params;
    const tag = slug[0] === 'all' ? undefined : slug[0];
    
    const { page, query } = await searchParams;
    const pageNumber = Number(page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', pageNumber, query, tag],
        queryFn: () => fetchNotes(pageNumber, query, tag),
    });

  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesClient tag={tag}/>
</HydrationBoundary>
  );
}

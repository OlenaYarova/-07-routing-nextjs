import NotePreviewClient from "./NotePreview.client";
import { fetchNoteById} from '@/lib/api';
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";

interface NotePreviewProps{
    params: Promise<{ id: string }>;
}
const NotePreview = async({params}:NotePreviewProps)=> {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient/>
       </HydrationBoundary>
    );
};
export default NotePreview;
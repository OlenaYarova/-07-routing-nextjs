import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";

type NotesProps={
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
}

export default async function NotesPages({ searchParams }: NotesProps) {
  const { page = "1", query = "" } = await searchParams;
  const pageNumber = Number(page) || 1;
  const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
    queryKey: ["notes",pageNumber, query],
    queryFn:()=> fetchNotes(pageNumber, query),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient page={pageNumber} query={query}/>
    </HydrationBoundary>
  );
    
}

import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { FetchNotesResponse } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const response = await fetchNotes(category);

  const initialData: FetchNotesResponse = await fetchNotes("", 1);

  if (response?.notes?.length > 0) {
    return <NoteList notes={response.notes} />;
  }

  return <NotesClient initialData={initialData} />;
};

export default NotesByCategory;

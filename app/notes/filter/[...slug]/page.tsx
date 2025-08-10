import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const formatTag = (tag?: string) => {
  if (!tag || tag.toLowerCase() === "all") return undefined;
  return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = formatTag(slug?.[0]);

  const initialData = await fetchNotes("", 1, category);
  return <NotesClient initialData={initialData} initialTag={category} />;
};

export default NotesByCategory;

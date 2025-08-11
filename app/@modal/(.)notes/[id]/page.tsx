// import { getSingleNote } from "@/lib/api";
// import NoteModal from "@/components/Modal/Modal";

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NotePreview = async ({ params }: Props) => {
//   const { id } = await params;
//   const note = await getSingleNote(id);

//   return (
//     <NoteModal>
//       <h2>{note.title}</h2>
//       <p>{note.content}</p>
//     </NoteModal>
//   );
// };

// export default NotePreview;

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;

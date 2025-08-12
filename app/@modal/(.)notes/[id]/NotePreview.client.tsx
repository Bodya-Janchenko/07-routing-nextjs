// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import { getSingleNote } from "@/lib/api";
// import css from "./NotePreview.module.css";
// import Modal from "@/components/Modal/Modal";
// import { useRouter } from "next/navigation";

// type NotePreviewProps = {
//   id?: string;
// };

// const NoteDetailsClient = () => {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();
//   const close = () => router.back();

//   const {
//     data: note,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["note", id],
//     queryFn: () => getSingleNote(id),
//     refetchOnMount: false,
//   });

//   if (isLoading) return <p>Loading, please wait...</p>;
//   if (error || !note) return <p>Something went wrong.</p>;

//   const formattedDate = note.updatedAt
//     ? `Updated at: ${note.updatedAt}`
//     : `Created at: ${note.createdAt}`;

//   return (
//     <Modal>
//       <button onClick={close} className={css.backBtn}>
//         ×
//       </button>
//       <div className={css.header}>
//         <h2>{note.title}</h2>
//       </div>
//       <p className={css.content}>{note.content}</p>
//       <p className={css.date}>{formattedDate}</p>
//     </Modal>
//   );
// };

// export default NoteDetailsClient;

"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { getSingleNote } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

type NotePreviewProps = {
  id?: string;
};

const NoteDetailsClient: React.FC<NotePreviewProps> = ({ id: propId }) => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = propId ?? params.id;

  const close = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
    enabled: Boolean(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={close}>
      <button onClick={close} className={css.backBtn}>
        ×
      </button>
      <div className={css.header}>
        <h2>{note.title}</h2>
      </div>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>{formattedDate}</p>
    </Modal>
  );
};

export default NoteDetailsClient;

"use client";

import css from "./Notes.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import NoteModal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Toaster } from "react-hot-toast";
import type { FetchNotesResponse } from "@/lib/api";

type Props = {
  initialData: FetchNotesResponse;
};

export default function NotesClient({ initialData }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [debounceSearchQuery] = useDebounce(searchQuery, 300);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debounceSearchQuery, currentPage],
    queryFn: () => fetchNotes(debounceSearchQuery, currentPage),
    placeholderData: keepPreviousData,
    initialData:
      currentPage === 1 && debounceSearchQuery === "" ? initialData : undefined,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const changeSearchQuery = (newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  };

  const toogleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            toogleModal();
          }}
        >
          Create Note +
        </button>
      </header>

      {isModalOpen && (
        <NoteModal onClose={toogleModal}>
          <NoteForm onClose={toogleModal} />
        </NoteModal>
      )}

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes: {(error as Error).message}</p>}

      {notes.length > 0 && <NoteList notes={notes} />}
      {notes.length === 0 && !isLoading && !isError && <p>No notes found.</p>}
    </div>
  );
}

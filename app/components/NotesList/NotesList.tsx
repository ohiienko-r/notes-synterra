"use client";

import { memo, useState, useCallback, useMemo } from "react";
import { useError } from "@/app/Contexts";
import Note from "../Note/Note";
import Modal from "../Modal/Modal";
import UniversalForm from "../UniversalForm/UniversalForm";
import Loader from "../Loader/Loader";
import { updateNote, deleteNote } from "@/app/actions";
import { updateNoteLocal, deleteNoteLocal } from "@/app/db";
import { NoteItem } from "@/app/types";

type NotesListPropTypes = {
  data: NoteItem[] | null;
};

const NotesList = memo(function NotesList({ data }: NotesListPropTypes) {
  const [selected, setSelected] = useState<NoteItem | null>(null);
  const { setError } = useError();

  const handleShowModal = useCallback((note: NoteItem) => {
    setSelected(note);
  }, []);

  const handleOnClose = useCallback(() => {
    setSelected(null);
  }, []);

  const handleUpdateNote = useCallback(
    async (title: string | null, body: string | null) => {
      handleOnClose();

      if (!selected) return;

      try {
        await updateNoteLocal(selected.id, {
          title: title ?? "",
          body: body ?? "",
        });
      } catch (e) {
        console.error(e);
        setError({ status: 500, statusText: JSON.stringify(e) });
        return;
      }

      //As long as sync is not required we'll just send a request
      //if there is an internet connection. However for a future implementations
      //we'll have to get a response from endpoint for sync purposes.
      if (window.navigator.onLine) {
        const response = await updateNote(selected.id, title ?? "", body ?? "");

        if ("status" in response) {
          console.error(
            `Failed to update note: ${response.status} - ${response.statusText}`
          );
          setError(response);
        }
      }
    },
    [selected, handleOnClose, setError]
  );

  const handleDeleteNote = useCallback(
    async (id: string) => {
      try {
        await deleteNoteLocal(id);
      } catch (e) {
        console.error(e);
        setError({ status: 500, statusText: JSON.stringify(e) });
        return;
      }

      //As long as sync is not required we'll just send a request
      //if there is an internet connection. However for a future implementations
      //we'll have to get a response from endpoint for sync purposes
      if (window.navigator.onLine) {
        const result = await deleteNote(id);

        if (result) {
          console.error(
            `Failed to delete note: ${result.status} - ${result.statusText}`
          );
          setError(result);
        }
      }
    },
    [setError]
  );

  const memoizedNotesList = useMemo(() => {
    return data?.map((note) => (
      <Note
        key={note.id}
        userId={note.userId}
        id={note.id}
        title={note.title}
        body={note.body}
        onEdit={handleShowModal}
        onDelete={handleDeleteNote}
      />
    ));
  }, [data, handleShowModal, handleDeleteNote]);

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      {memoizedNotesList}
      <Modal open={!!selected} onClose={handleOnClose}>
        <UniversalForm
          title={selected?.title}
          body={selected?.body}
          onSubmit={handleUpdateNote}
        />
      </Modal>
    </>
  );
});

export default NotesList;

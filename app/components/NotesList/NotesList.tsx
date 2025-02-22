"use client";

import { memo, useState, useCallback, useMemo } from "react";
import Note from "../Note/Note";
import Modal from "../Modal/Modal";
import UniversalForm from "../UniversalForm/UniversalForm";
import Loader from "../Loader/Loader";
import { NoteItem } from "@/app/types";

type NotesListPropTypes = {
  data: NoteItem[] | null;
};

const NotesList = memo(function NotesList({ data }: NotesListPropTypes) {
  const [selected, setSelected] = useState<NoteItem | null>(null);

  const handleShowModal = useCallback((note: NoteItem) => {
    setSelected(note);
  }, []);

  const handleOnClose = useCallback(() => {
    setSelected(null);
  }, []);

  const handleSubmit = useCallback(
    (title: string | null, body: string | null) => {
      console.log({ title, body });
      handleOnClose();
    },
    [handleOnClose]
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
        onDelete={() => {}}
      />
    ));
  }, [data, handleShowModal]);

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
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
});

export default NotesList;

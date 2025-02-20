"use client";

import React, { useState, useCallback } from "react";
import Note from "../Note/Note";
import Modal from "../Modal/Modal";
import UniversalForm from "../UniversalForm/UniversalForm";
import { Post } from "@/app/types";

type NotesListPropTypes = {
  data: Post[];
};

function NotesList({ data }: NotesListPropTypes) {
  const [selected, setSelected] = useState<Post | null>(null);

  const handleShowModal = useCallback((note: Post) => {
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

  return (
    <>
      {data.map((note) => (
        <Note
          key={note.id}
          userId={note.userId}
          id={note.id}
          title={note.title}
          body={note.body}
          onEdit={handleShowModal}
          onDelete={() => {}}
        />
      ))}
      <Modal open={!!selected} onClose={handleOnClose}>
        <UniversalForm
          title={selected?.title}
          body={selected?.body}
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
}

export default NotesList;

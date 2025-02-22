"use client";

import { useCallback, useState } from "react";
import { Icon, Modal, UniversalForm } from "..";
import { createNoteLocal } from "@/app/db";
import { createNote, getRandomUUID } from "@/app/actions";

function AddButtonWithModal() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleOnClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleSubmit = useCallback(
    async (title: string | null, body: string | null) => {
      handleOnClose();

      if (window.navigator.onLine) {
        const generatedNoteId = await getRandomUUID();
        const response = await createNote(
          generatedNoteId,
          1,
          title ?? "",
          body ?? ""
        );

        if ("status" in response) {
          //TODO: throw an error
          return;
        }

        //Because of the primary key must be a string,
        //I had to mutate a response
        const newNote = { ...response, id: JSON.stringify(response.id) };

        console.log(newNote);

        await createNoteLocal(newNote);
      } else {
        await createNoteLocal({
          id: JSON.stringify(Math.random() * 1000000000),
          userId: 1,
          title: title ?? "",
          body: body ?? "",
        });
      }
    },
    [handleOnClose]
  );

  return (
    <>
      <button
        className="border-none outline-none p-0 m-0 bg-none fixed bottom-6 right-8 z-10 w-12 h-12 flex justify-center items-center bg-[#c395d5] rounded-full hover:bg-[#a07bd6] transition-colors"
        onClick={handleShowModal}
      >
        <Icon.Add />
      </button>
      <Modal open={modalVisible} onClose={handleOnClose}>
        <UniversalForm onSubmit={handleSubmit} />
      </Modal>
    </>
  );
}

export default AddButtonWithModal;

"use client";

import { useCallback, useState } from "react";
import { useError } from "@/app/Contexts";
import { Icon, Modal, UniversalForm } from "..";
import { createNoteLocal } from "@/app/db";
import { createNote } from "@/app/actions";

//The resason why is this component separated - to isolate state update
//so the whole list doesn't unnecesserily rerenders
function AddButtonWithModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const { setError } = useError();

  const handleShowModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleOnClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleSubmit = useCallback(
    async (title: string | null, body: string | null) => {
      handleOnClose();

      const generatedNoteId =
        window.crypto?.randomUUID?.() ||
        `offline-${Math.random() * 1000000000}`;

      try {
        await createNoteLocal({
          id: generatedNoteId,
          userId: 1,
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
      //we'll have to get a response from endpoint to update an ID localy
      //because API generates it in response to post creation
      if (window.navigator.onLine) {
        const response = await createNote(
          generatedNoteId,
          1,
          title ?? "",
          body ?? ""
        );

        if ("status" in response) {
          console.error(
            `Failed to create a note: ${response.status} - ${response.statusText}`
          );
          setError(response);
        }
      }
    },
    [handleOnClose, setError]
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

"use client";

import { useCallback, useState } from "react";
import { Icon, Modal, UniversalForm } from "..";

function AddButtonWithModal() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleOnClose = useCallback(() => {
    setModalVisible(false);
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

"use client";

import { useCallback, useState } from "react";
import { Icon, Modal } from "..";

function AddButtonWithModal() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleOnClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <>
      <button
        className="border-none outline-none p-0 m-0 bg-none absolute bottom-5 right-5 z-10 w-10 h-10 flex justify-center items-center bg-[#c395d5] rounded-full"
        onClick={handleShowModal}
      >
        <Icon.Add />
      </button>
      <Modal open={modalVisible} onClose={handleOnClose}>
        <form></form>
      </Modal>
    </>
  );
}

export default AddButtonWithModal;

"use client";

import { FormEvent, useCallback, useState } from "react";
import { Icon, Modal } from "..";

function AddButtonWithModal() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleOnClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const name = formData.get("name");
      const note = formData.get("note");

      console.log({ name, note });
      e.currentTarget.reset();

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
        <form onSubmit={handleSubmit} className="p-1 flex flex-col gap-3 ">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-2 outline-none bg-inherit border-b border-[#817e89]"
          />
          <textarea
            name="note"
            placeholder="Create note..."
            className="p-2 outline-none bg-inherit border-b border-[#817e89] resize-none"
            rows={10}
          ></textarea>
          <input
            type="submit"
            value="Create"
            className="py-2 px-4 rounded-md bg-[#af95d6] cursor-pointer font-medium text-white hover:bg-[#a07bd6] transition-colors"
          />
        </form>
      </Modal>
    </>
  );
}

export default AddButtonWithModal;

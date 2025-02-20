"use client";

import { ReactNode, useCallback, useEffect, useRef } from "react";
import { Icon } from "..";

type ModalPropTypes = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ open, onClose, children }: ModalPropTypes) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleCloseModal = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (dialogRef.current) {
      if (open) {
        dialogRef.current.showModal();
      } else {
        handleCloseModal();
      }
    }
  }, [open, handleCloseModal]);

  return (
    <dialog
      ref={dialogRef}
      className="p-1 border border-solid border-gray-600 rounded-lg w-1/4"
    >
      <div className="flex justify-end">
        <button
          onClick={handleCloseModal}
          className="border-none outline-none p-0 m-0 bg-none hover:text-[#af95d6] transition-colors"
        >
          <Icon.Close />
        </button>
      </div>
      <div>{children}</div>
    </dialog>
  );
}

export default Modal;

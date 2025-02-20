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

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [open]);

  const handleCloseModal = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
      onClose();
    }
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="p-1 border border-solid border-gray-600 rounded-lg"
    >
      <div>
        <button
          onClick={handleCloseModal}
          className="border-none outline-none p-0 m-0 bg-none"
        >
          <Icon.Close />
        </button>
      </div>
      <div>{children}</div>
    </dialog>
  );
}

export default Modal;

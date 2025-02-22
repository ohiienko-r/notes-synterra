"use client";

import { MouseEvent } from "react";
import { Icon } from "..";
import { NoteItem } from "@/app/types";

type NotePropTypes = {
  userId: number;
  id: string;
  title: string;
  body: string;
  onEdit: (note: NoteItem) => void;
  onDelete: (id: string) => void;
};

function Note({ userId, id, title, body, onEdit, onDelete }: NotePropTypes) {
  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit({ userId, id, title, body });
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div className="bg-[#2a1222] h-fit border border-[#817e89] rounded-md cursor-pointer">
      <h2 className="font-bold p-2 border-b border-[#817e89]">{title}</h2>
      <p className="mt-2 p-2 border-b border-[#817e89]">{body}</p>
      <div className="p-2 flex items-center justify-end gap-2">
        <button
          onClick={handleEdit}
          className="border-none outline-none p-0 m-0 bg-none hover:text-[#be5767] transition-colors"
          title="Edit"
        >
          <Icon.Edit />
        </button>
        <button
          onClick={handleDelete}
          className="border-none outline-none p-0 m-0 bg-none hover:text-[#be5767] transition-colors"
          title="Delete"
        >
          <Icon.Delete />
        </button>
      </div>
    </div>
  );
}

export default Note;

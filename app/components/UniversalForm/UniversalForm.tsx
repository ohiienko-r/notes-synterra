"use client";

import { useCallback, FormEvent } from "react";

type UniversalFormPropTypes = {
  title?: string;
  body?: string;
  onSubmit: (title: string | null, body: string | null) => void;
};

function UniversalForm({ title, body, onSubmit }: UniversalFormPropTypes) {
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const name = formData.get("name");
      const note = formData.get("note");

      e.currentTarget.reset();

      onSubmit(
        typeof name === "string" ? name : null,
        typeof note === "string" ? note : null
      );
    },
    [onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="p-1 flex flex-col gap-3 ">
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="p-2 outline-none bg-inherit border-b border-[#817e89]"
        defaultValue={title}
      />
      <textarea
        name="note"
        placeholder="Create note..."
        className="p-2 outline-none bg-inherit border-b border-[#817e89] resize-none"
        rows={10}
        defaultValue={body}
      ></textarea>
      <input
        type="submit"
        value="Submit"
        className="py-2 px-4 rounded-md bg-[#af95d6] cursor-pointer font-medium text-white hover:bg-[#a07bd6] transition-colors"
      />
    </form>
  );
}

export default UniversalForm;

"use client";

type NotePropTypes = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function Note({ userId, id, title, body }: NotePropTypes) {
  return (
    <div className="bg-[#eacb5e] text-black h-fit p-1 rounded-lg cursor-pointer">
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2">{body}</p>
    </div>
  );
}

export default Note;

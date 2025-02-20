"use client";

type NotePropTypes = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function Note({ userId, id, title, body }: NotePropTypes) {
  return (
    <div className="bg-[#2a1222] h-fit p-2 border border-[#817e89] rounded-md cursor-pointer">
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2">{body}</p>
    </div>
  );
}

export default Note;

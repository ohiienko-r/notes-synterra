export type NoteItem = {
  userId: number;
  id: string;
  title: string;
  body: string;
};

export type ResponseError = {
  status: number | undefined;
  statusText: string | undefined;
};

"use client";

import { useState, useEffect } from "react";
import { db, closeNotesCollection } from "./db";
import { useError } from "./Contexts";
import { NotesList, Modal } from "./components";
import { fetchNotes } from "./actions";
import { NoteItem } from "./types";

export default function Home() {
  const [data, setData] = useState<NoteItem[] | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { statusText, setError, resetError } = useError();

  useEffect(() => {
    return () => {
      closeNotesCollection().catch(console.error);
    };
  }, []);

  useEffect(() => {
    async function initialize() {
      if (!db.notes) return;
      try {
        //As long as I understood the task and
        //API doesn't persist changes I desided to implement
        //posts fetching only in case local DB's collection is empty
        //and app is online, otherwise local data is used.
        const existingNotes = await db.notes.find().exec();

        if (existingNotes.length === 0 && window.navigator.onLine) {
          const response = await fetchNotes();

          if (!Array.isArray(response)) {
            setError(response);
            return;
          }

          if (response && response.length > 0) {
            await db.notes.bulkInsert(response);
          }
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing:", error);
        setIsInitialized(true);
      }
    }

    initialize();
  }, [setError]);

  useEffect(() => {
    if (!isInitialized || !db.notes) return;

    const subscription = db.notes.find().$.subscribe((docs) => {
      const notesData = docs.map((d) => d.toJSON());
      setData(notesData);
    });

    return () => subscription.unsubscribe();
  }, [isInitialized]);

  const handleErrorModalClose = () => {
    setIsInitialized(true);
    resetError();
  };

  return (
    <>
      <NotesList data={data} />
      <Modal open={!!statusText} onClose={handleErrorModalClose}>
        <div className="p-4 flex flex-col gap-2">
          <h2 className="font-bold text-red-500">Error!</h2>
          <p>{`An error occured: ${statusText}`}</p>
          <button
            onClick={handleErrorModalClose}
            className="py-2 px-4 bg-red-500 self-end rounded-lg font-bold"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}

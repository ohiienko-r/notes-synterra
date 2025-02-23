"use client";

import { createRxDatabase } from "rxdb/plugins/core";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { NoteItem } from "./types";

//Init schema for rxDB
const schema = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 500,
    },
    userId: {
      type: "integer",
    },
    title: {
      type: "string",
    },
    body: {
      type: "string",
    },
  },
  required: ["id", "userId"],
};

//Create DB instance
export const db = await createRxDatabase({
  name: "notes",
  storage: wrappedValidateAjvStorage({
    storage: getRxStorageDexie(),
  }),
});

//Add a collection
if (db) {
  try {
    await db.addCollections({
      notes: { schema },
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * Closes a collection. Used on page unmounts.
 */
export async function closeNotesCollection(): Promise<void> {
  if (db.notes) {
    await db.notes.close();
  }
}

/**
 * Adds a new note object to local DB.
 * @param {NoteItem} note - a new note object.
 * @returns void.
 */
export async function createNoteLocal(note: NoteItem): Promise<void> {
  if (!db.notes) return;

  await db.notes.insert(note).catch(console.error);
}

/**
 * Updates a note with provided ID in local DB.
 * @param {string} id - note ID.
 * @param {{ title?: string; body?: string }} updateObject - an objbect that contains updated note title and body.
 * @returns void.
 */
export async function updateNoteLocal(
  id: string,
  updateObject: { title?: string; body?: string }
): Promise<void> {
  if (!db.notes) return;

  const noteToUpdate = db.notes.findOne({ selector: { id } });

  await noteToUpdate.patch(updateObject);
}

/**
 * Deletes a note with provided ID from local DB.
 * @param {string} id - note ID.
 * @returns void.
 */
export async function deleteNoteLocal(id: string): Promise<void> {
  if (!db.notes) return;

  const noteToDelete = db.notes.findOne({ selector: { id } });

  await noteToDelete.remove();
}

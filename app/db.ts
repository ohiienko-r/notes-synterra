"use client";

import { createRxDatabase } from "rxdb/plugins/core";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { NoteItem } from "./types";

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

export const db = await createRxDatabase({
  name: "notes",
  storage: wrappedValidateAjvStorage({
    storage: getRxStorageDexie(),
  }),
});

if (db) {
  try {
    await db.addCollections({
      notes: { schema },
    });
  } catch (e) {
    console.error(e);
  }
}

export async function closeNotesCollection() {
  if (db.notes) {
    await db.notes.close();
  }
}

export async function createNoteLocal(note: NoteItem) {
  if (!db.notes) return;
  await db.notes.insert(note).catch(console.error);
}

export async function updateNoteLocal() {
  if (!db.notes) return;
}

"use server";

import { NoteItem, ResponseError } from "./types";

/**
 * Fetches a posts from mock API.
 * @returns a list of posts from remote server
 */
export async function fetchNotes(): Promise<NoteItem[] | ResponseError> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      console.error(`Failed to fetch posts: ${response.statusText}`);
      return { status: response.status, statusText: response.statusText };
    }

    const data: NoteItem[] = await response.json();

    if (
      !Array.isArray(data) ||
      !data.every((post) => post.id && post.title && post.body)
    ) {
      console.error("Invalid post data structure");
      return {
        status: 500,
        statusText: "Invalid post data structure",
      };
    }

    const notes = data.map((note) => {
      return { ...note, id: JSON.stringify(note.id) };
    });

    return notes;
  } catch (e) {
    console.error("Error fetching posts:", e);
    return { status: 500, statusText: JSON.stringify(e) };
  }
}

/**
 * Creates new note record in mock server.
 * @param {string} id - note ID.
 * @param {number} userId - user ID.
 * @param {string} title - note title.
 * @param {string} body - note text.
 * @returns - resulting new note object or error object.
 */
export async function createNote(
  id: string,
  userId: number,
  title: string,
  body: string
): Promise<NoteItem | ResponseError> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, userId, title, body }),
    });

    if (!response.ok) {
      console.error(`Failed to create a note: ${response.statusText}`);
      return { status: response.status, statusText: response.statusText };
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return { status: 500, statusText: JSON.stringify(e) };
  }
}

/**
 * Updates a note record in mock server.
 * @param {string} id - ntoe ID.
 * @param {string} title - note title.
 * @param {string} body - note text.
 * @returns an object with updated note fileds and ID.
 */
export async function updateNote(
  id: string,
  title: string,
  body: string
): Promise<Partial<NoteItem> | ResponseError> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      }
    );

    if (!response.ok) {
      console.error(`Failed to update a note: ${response.statusText}`);
      return { status: response.status, statusText: response.statusText };
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return { status: 500, statusText: JSON.stringify(e) };
  }
}

/**
 * Deletes a note record in mock server.
 * @param {string} id - note ID.
 * @returns either void or Error object in case of error.
 */
export async function deleteNote(id: string): Promise<void | ResponseError> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      console.error(`Failed to delete a note: ${response.statusText}`);
      return { status: response.status, statusText: response.statusText };
    }
  } catch (e) {
    console.error(e);
    return { status: 500, statusText: JSON.stringify(e) };
  }
}

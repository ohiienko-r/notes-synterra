"use server";

import { Post } from "./types";

export async function fetchPosts(): Promise<Post[] | null> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      console.error(`Failed to fetch posts: ${response.statusText}`);
      return null;
    }

    const data: Post[] = await response.json();

    if (
      !Array.isArray(data) ||
      !data.every((post) => post.id && post.title && post.body)
    ) {
      console.error("Invalid post data structure");
      return null;
    }

    return data;
  } catch (e) {
    console.error("Error fetching posts:", e);
    return null;
  }
}

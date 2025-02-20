import { fetchPosts } from "./actions";
import { NotesList } from "./components";

export default async function Home() {
  const posts = await fetchPosts();

  if (!posts) {
    console.error("Failed to fetch posts!");
    return <>No data to display...</>;
  }

  return <NotesList data={posts} />;
}

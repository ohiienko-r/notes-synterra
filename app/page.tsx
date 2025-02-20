import { Note } from "./components";
import { fetchPosts } from "./actions";

export default async function Home() {
  const posts = await fetchPosts();

  if (!posts) {
    console.error("Failed to fetch posts!");
  }

  return (
    <>
      {posts?.map(({ userId, id, title, body }) => (
        <Note key={id} userId={userId} id={id} title={title} body={body} />
      ))}
    </>
  );
}

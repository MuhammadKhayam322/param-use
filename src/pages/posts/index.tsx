import Link from "next/link";
import { GetServerSideProps } from "next";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  return {
    props: { posts },
  };
};

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <main className="min-h-screen bg-gray-400 py-10 px-4">
      <div className="mx-auto bg-white h-20 mt-10 rounded-lg shadow-md  p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
          All Posts
        </h1>
        <Link href="/todos" className="text-white underline-none bg-blue-500 p-2 rounded-lg mb-6">
          View To-Do List
        </Link>
        <div className="text-center flex justify-center mb-6">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 12).map((post, index) => (
            <li
              key={post.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <Link href={`/posts/${post.id}`}>
                <div className="cursor-pointer">
                  {/* Image */}
                  <img
                    src={`https://picsum.photos/id/${50 + index}/600/300`}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {post.body}
                    </p>
                    <span className="text-sm text-gray-500 mt-3 inline-block">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default PostList;

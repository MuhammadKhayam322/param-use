import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const ost: Post = await res.json();

  return {
    props: { ost },
  };
  
};

const PostDetail = ({ ost }: { ost: Post }) => {
  const router = useRouter();

  if (!ost) {
    return <p className="text-center text-red-600">Post not found</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/posts"
          className="inline-block mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Back to all posts
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Image */}
          <img
            src={`https://picsum.photos/id/${49 + ost.id}/800/400`}
            alt={ost.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <h1 className="text-3xl font-bold text-gray-800 mb-4">{ost.title}</h1>
          <p className="text-gray-700 text-lg leading-relaxed">{ost.body}</p>
          <p className="text-sm text-gray-500 mt-6">
            Post ID: {ost.id} | User ID: {ost.userId}
          </p>
        </div>
      </div>
    </main>
  );
};

export default PostDetail;


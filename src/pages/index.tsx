import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Welcome to the Blog
        </h1>
        <Link
          href="/posts"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
        >
          View All Posts
        </Link>
      </div>
    </main>
  );
};

export default Home;

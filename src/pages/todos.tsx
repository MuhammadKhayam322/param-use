import { GetServerSideProps } from "next";
import Link from "next/link";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
  const todos: Todo[] = await res.json();

  return {
    props: { todos },
  };
};

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto ">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          To-Do List
        </h1>

        <div className="text-center mb-6">
          <Link
            href="/"
            className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
          >
            Back to Home
          </Link>
        </div>

        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`p-4 rounded-xl shadow ${
                todo.completed ? "bg-green-100" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <p
                  className={`text-lg ${
                    todo.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </p>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    todo.completed
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default TodoList;

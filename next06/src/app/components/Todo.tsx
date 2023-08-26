"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState, useTransition } from "react";
import { FaTrash } from "react-icons/fa";

export default function Todo(todo: Todo) {
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  const isMutating = isPending || isFetching;

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsFetching(true);

    const res = await fetch(`http://127.0.0.1:3500/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed,
      }),
    });

    await res.json();

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsFetching(true);

    const res = await fetch(`http://127.0.0.1:3500/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
      }),
    });

    await res.json();

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <article
      className="my-4 flex justify-between items-center"
      style={{ opacity: !isMutating ? 1 : 0.7 }}
    >
      <label className="text-2xl hover:underline">
        <Link href={`/edit/${todo.id}`}>{todo.title}</Link>
      </label>
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={todo.completed}
          disabled={isPending}
          onChange={handleChange}
          className="min-w-[2rem] min-h-[2rem]"
        />
        <button
          disabled={isPending}
          onClick={handleDelete}
          className="p-3 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-red-400 hover:cursor-pointer hover:bg-red-300"
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
}

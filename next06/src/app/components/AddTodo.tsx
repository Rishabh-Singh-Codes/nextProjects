"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";

const initState: Partial<Todo> = {
  userId: 1,
  title: "",
};

export default function AddTodo() {
  const router = useRouter();
  const path = usePathname();
  const [data, setData] = useState(initState);
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isPending || isFetching;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, userId } = data;

    setIsFetching(true);

    const res = await fetch("http://127.0.0.1:3500/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        title,
      }),
    });

    await res.json();

    setIsFetching(false);

    setData((prevData) => ({
      ...prevData,
      title: "",
    }));

    startTransition(() => {
      if (path === "/add") {
        router.push("/");
      } else {
        router.refresh();
      }
    });
  };

  const content = (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center"
      style={{ opacity: !isMutating ? 1 : 0.7 }}
    >
      <input
        type="text"
        id="title"
        name="title"
        value={data.title}
        onChange={handleChange}
        className="text-2xl p-1 rounded-lg flex-grow w-full"
        placeholder="New Todo"
        autoFocus
      />

      <button className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-green-500 hover:cursor-pointer hover:bg-green-400">
        Submit
      </button>
    </form>
  );

  return content;
}

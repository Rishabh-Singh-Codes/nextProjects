"use client";

import { ChangeEvent, FormEvent, useState } from "react";

const initState = {
  name: "",
  email: "",
  desc: "",
};

export default function Form() {
  const [data, setData] = useState(initState);
  let canSubmit = [...Object.values(data)].every(Boolean);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {

    let name = e.target.name;
    console.log('name', name)

    setData(prevData => ({...prevData, [name]: e.target.value}));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("data: ", data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Form</h1>

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Rishabh"
      />

      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Rishabh"
      />

      <label htmlFor="desc">Description:</label>
      <textarea
        id="desc"
        name="desc"
        value={data.desc}
        onChange={handleChange}
        placeholder="Rishabh"
      />

      <button disabled={!canSubmit}>Submit</button>
    </form>
  );
}

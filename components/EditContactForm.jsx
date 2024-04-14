"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditContactForm({ id, name, email, phone , gender }) {
  
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);
  const [newGender, setNewGender] = useState(gender);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newEmail, newPhone, newGender }),
      });

      if (!res.ok) {
        throw new Error("Failed to update contact");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

      <input
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Full name"
      />

      <input
        onChange={(e) => setNewEmail(e.target.value)}
        value={newEmail}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="e-mail"
      />

      <input
        onChange={(e) => setNewPhone(e.target.value)}
        value={newPhone}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="phone number"
      />

      <div>
        Gender:
        <label>
          <input
            type="radio"
            value="male"
            checked={newGender === "male"}
            onChange={() => setNewGender("male")}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            value="female"
            checked={newGender === "female"}
            onChange={() => setNewGender("female")}
          />{" "}
          Female
        </label>
      </div>

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(""); 

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !gender) { 
      alert("Name, email, phone number, and gender are required."); 
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, gender }), 
      });

      if (res.ok) {
        router.push("/contactList");
      } else {
        throw new Error("Failed to create a contact");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Full name"
      />

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="e-mail"
      />

      <input
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phone}
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
            checked={gender === "male"}
            onChange={() => setGender("male")}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            value="female"
            checked={gender === "female"}
            onChange={() => setGender("female")}
          />{" "}
          Female
        </label>
      </div>

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Contact
      </button>
    </form>
  );
}

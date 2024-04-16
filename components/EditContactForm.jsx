"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLogout } from 'react-icons/ai';

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
      router.push("/contactList");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="relative overflow-hidden w-full h-full" style={{ backgroundImage: 'url("/image.png")', backgroundSize: '50%', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', top: '100%', left: '20%', rotate:'25.63deg', transform: 'translate(-50%, -50%)', width: '150%', height: '150%', borderRadius: '50%', backgroundColor: '#083F46', opacity: '1.0', pointerEvents: 'none' }}></div>

        <div className="relative z-10">
          {/* Content for the left half */}

          <div className="ml-[22%] mt-12">
            <img src="/logo2.png" alt="twc logo" className="w-[90px] mb-2 " />
            <img src="/contacts portal.png" alt="contact" className="w-[140px]" />
          </div>

          <div className="grid h-screen justify-start items-center ml-[22%] my-20">

            <div className=" text-white mb-auto" >
              <h1 className="text-5xl font-bold my-5 ">New Contact</h1> 
          
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

              <div className="flex mt-10">
                <button
                  onClick={() => signOut()}
                  className="flex items-center bg-none text-white text-xl font-semibold mb-[15%] ml-auto underline"
                > 
                  <AiOutlineLogout className="w-10 h-10 transform scale-x-[-1]" /> 
                  <span className="ml-2">logout</span>
                </button>
              </div>
            </div>
          </div>            
        </div>
      </div>
    </div>
  );
}

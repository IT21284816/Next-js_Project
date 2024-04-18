"use client";

import { useState } from "react";
import Image from "next/image";
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

  const signOut = () => {
    window.location.href = '/';
  };
  return (
    <div className="flex h-screen">
      <div className="relative overflow-hidden w-full h-full" style={{ backgroundImage: 'url("/image.png")', backgroundSize: '50%', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', top: '100%', left: '20%', rotate:'25.63deg', transform: 'translate(-50%, -50%)', width: '150%', height: '150%', borderRadius: '50%', backgroundColor: '#083F46', opacity: '1.0', pointerEvents: 'none' }}></div>

        <div className="relative z-10">          

          <div className="ml-[22%] mt-12">
          <a href="/">
             <Image src="/logo2.png" alt="twc logo" width={90} height={90} className="mb-2" />
              <Image src="/contacts portal.png" alt="contact" width={140} height={140} />            
            </a>
          </div>

          <div className="grid h-screen justify-start items-center ml-[22%] my-20">

            <div className=" text-white mb-auto" >
              <h1 className="text-5xl font-bold my-10 ">Contact Update</h1> 
          
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">

              <div className="space-x-10">
                <input
                  onChange={(e) => setNewName(e.target.value)}
                  value={newName}
                  className="rounded-[20px] text-black bg-white placeholder-[#083F46] font-semibold"
                  type="text"
                  placeholder="Full name"
                />

                <input
                  onChange={(e) => setNewEmail(e.target.value)}
                  value={newEmail}
                  className="rounded-[20px] text-black bg-white placeholder-[#083F46] font-semibold"
                  type="text"
                  placeholder="e-mail"
                />
                </div>

                <div className="flex flex-row space-y-4 mt-5">
                <input
                  onChange={(e) => setNewPhone(e.target.value)}
                  value={newPhone}
                  className="rounded-[20px] text-black bg-white placeholder-[#083F46] font-semibold"
                  type="text"
                  placeholder="phone number"
                />

<div className="ml-12 flex flex-row space-x-16">
                    <span>Gender:</span>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="male"
                        checked={gender === "male"}
                        onChange={() => setNewGender("male")}
                        className="absolute opacity-0 h-0 w-0"
                      />
                      <span className="h-5 w-5 flex items-center justify-center border border-gray-300 rounded-full mr-2">
                        <span className={`h-3 w-3 rounded-full ${gender === "male" ? "bg-blue-500" : ""}`}></span>
                      </span>
                      Male
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="female"
                        checked={gender === "female"}
                        onChange={() => setNewGender("female")}
                        className="absolute opacity-0 h-0 w-0"
                      />
                      <span className="h-5 w-5 flex items-center justify-center border border-gray-300 rounded-full mr-2">
                        <span className={`h-3 w-3 rounded-full ${gender === "female" ? "bg-pink-500" : ""}`}></span>
                      </span>
                      Female
                    </label>
                  </div>
                </div>

                <button className="bg-none font-bold text-white py-3 px-10 w-fit border border-white rounded-[30px] mt-20">
                  update contact
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

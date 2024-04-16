"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AiOutlineLogout } from 'react-icons/ai'; // Import the AiOutlineLogout icon

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

  const { data: session } = useSession();

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
          
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-10">
                <div className="space-x-10">
                  <input className="rounded-[20px] text-black bg-white placeholder-[#083F46] font-semibold"
                    onChange={(e) => setName(e.target.value)}
                    value={name}              
                    type="text"
                    placeholder="Full name"
                  />

                  <input className="rounded-[20px] text-black bg-white placeholder-[#083F46] font-semibold"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}              
                    type="text"
                    placeholder="e-mail"
                  />
                </div>

                <div className="flex flex-row space-y-4">
                  <input className="rounded-[20px] text-black bg-white placeholder-[#083F46] font-semibold"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phone}              
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
                        onChange={() => setGender("male")}
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
                        onChange={() => setGender("female")}
                        className="absolute opacity-0 h-0 w-0"
                      />
                      <span className="h-5 w-5 flex items-center justify-center border border-gray-300 rounded-full mr-2">
                        <span className={`h-3 w-3 rounded-full ${gender === "female" ? "bg-pink-500" : ""}`}></span>
                      </span>
                      Female
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-none font-bold text-white py-3 px-10 w-fit border border-white rounded-[30px] mt-20"
                >
                  add your first contact
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
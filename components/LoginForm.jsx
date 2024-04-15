"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <div className="relative overflow-hidden w-3/5 min-h-screen" style={{ backgroundImage: 'url("/image.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-custom-color" style={{ clipPath: 'circle(100% at 0 50%)' }}></div>
        <div className="relative z-10">
          {/* Content for the left half */}
          
          <div className="grid h-screen justify-start items-center ml-[10%]">
      <div className=" text-white mb-5" >
        <h1 className="text-4xl font-bold my-4 ">Hi there,</h1>

        <div className="text-2xl font-medium mb-16">
        <p> Welcome to our</p>
        <p> contacts portal</p>
        </div>

        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
          <input className="rounded-[20px] bg-white placeholder-[#083F46] font-semibold"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="e-mail"
          />
          <input className="rounded-[20px] bg-white placeholder-[#083F46] font-semibold"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />

          <div className ="flex mt-6">
          <button className="bg-[#083F46] rounded-[20px] w-[100px] h-[40px] text-white font-semibold cursor-pointer px-6 py-2  border border-white">
            login
          </button>
          <Link className="text-sm mt-3 text-right text-[18px] ml-4" href={"/register"}>
            or <span className="underline">Click here to Register</span>
          </Link>
          </div>
         
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-5">
              {error}
            </div>
          )}

          
        </form>
      </div>
    </div>

        </div>
      </div>
      <div className="w-2/5 min-h-screen" style={{ backgroundImage: 'url("/image.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Content for the right half */}
        
        <div className="flex flex-col justify-center items-start h-screen gap-4 ml-5">
            <img src="/logo.png" alt="twc logo" className="mb-0 w-[150px]" />
            <img src="/contacts.png" alt="contact" className="mt-0 w-[200px]" />
        </div>


        

      </div>
    </div>
  );
}

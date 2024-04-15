"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("All fields are necessary.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="flex">
      <div className="relative overflow-hidden w-3/5 min-h-screen" style={{ backgroundImage: 'url("/image.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-custom-color" style={{ clipPath: 'circle(100% at 0 50%)' }}></div>
        <div className="relative z-10">


          <div className="grid h-screen justify-start items-center ml-[10%]">
      <div className=" text-white ">
        <h1 className="text-4xl font-bold my-10">Register Now !</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <input className="rounded-[20px] bg-white placeholder-[#083F46] font-semibold"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="e-mail"
          />
          <input className="rounded-[20px] bg-white placeholder-[#083F46] font-semibold"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <input className="rounded-[20px] bg-white placeholder-[#083F46] font-semibold"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="confirm password"
          />
          <button className="bg-[#083F46] rounded-[20px] w-[120px] h-[40px] text-white font-semibold cursor-pointer px-6 py-2  border border-white">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-left text-[18px] ml-4" href={"/"}>
           <span className="underline">&lt; Back to Login</span>
          </Link>
        </form>
      </div>
    </div>


          <Link href="/home">
        <button className="bg-blue-500 text-white font-bold px-6 py-2 mt-3">
          Add Contact
        </button>
          </Link>
        </div>
      </div>
      <div className="w-2/5 min-h-screen" style={{ backgroundImage: 'url("/image.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        

        <div className="flex flex-col justify-center items-start h-screen gap-4 ml-5">
            <img src="/logo.png" alt="twc logo" className="mb-0 w-[150px]" />
            <img src="/contacts.png" alt="contact" className="mt-0 w-[200px]" />
        </div>

      </div>
    </div>
  );
}

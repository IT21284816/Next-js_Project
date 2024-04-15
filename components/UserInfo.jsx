"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";


export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen">
      <div className="relative overflow-hidden w-full h-full" style={{ backgroundImage: 'url("/image.png")', backgroundSize: '50%', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', top: '100%', left: '20%', rotate:'25.63deg', transform: 'translate(-50%, -50%)', width: '150%', height: '150%', borderRadius: '50%', backgroundColor: '#083F46', opacity: '1.0', pointerEvents: 'none' }}></div>

        <div className="relative z-10">
          {/* Content for the left half */}

            <div className="ml-[20%] mt-12">
            <img src="/logo2.png" alt="twc logo" className="w-[90px] mb-2 " />
            <img src="/contacts portal.png" alt="contact" className="w-[140px]" />
            </div>
          

          <div className="grid h-screen justify-start items-center ml-[20%]">

          <div className=" text-white mt-10" >
        <h1 className="text-6xl font-bold my-5 ">Welcome,</h1> 

        <div className="text-3xl font-medium mb-auto font-mono">
        <p>This is where your contacts will live. Click the button below</p>
        <p>to add a new contact.</p>
        </div>
        </div>

        <Link href="/addContact">
        <button className="bg-blue-500 text-white font-bold px-6 py-2 mb-auto">
        add your first contact
        </button>
      </Link>

      <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mb-auto"
        >
          Log Out
        </button>


            
      {/* <div className="text-white">
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        
      </div> */}
    </div> 
          
        </div>
      </div>
    </div>
  );
}

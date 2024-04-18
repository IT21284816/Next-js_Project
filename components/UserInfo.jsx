"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineLogout } from "react-icons/ai";


export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen">
      <div className="relative overflow-hidden w-full h-full" style={{ backgroundImage: 'url("/image.png")', backgroundSize: '50%', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', top: '100%', left: '20%', rotate:'25.63deg', transform: 'translate(-50%, -50%)', width: '150%', height: '150%', borderRadius: '50%', backgroundColor: '#083F46', opacity: '1.0', pointerEvents: 'none' }}></div>

        <div className="relative z-10">
          {/* Content for the left half */}

            <div className="ml-[22%] mt-12">
            <Image src="/logo2.png" alt="twc logo" width={90} height={90} className="mb-2" />
              <Image src="/contacts portal.png" alt="contact" width={140} height={140} />            
            </div>
          

          <div className="grid h-screen justify-start items-center ml-[22%]">

          <div className=" text-white mt-10" >
        <h1 className="text-6xl font-bold my-5 ">Welcome,</h1> 

        <div className="text-3xl font-medium mb-auto font-mono">
        <p>This is where your contacts will live. Click the button below</p>
        <p>to add a new contact.</p>
        </div>
        </div>

        <Link href="/addContact">
        <button className="bg-none rounded-[20px] w-auto h-auto text-white font-semibold cursor-pointer px-6 py-2  border border-white">
        add your first contact
        </button>
      </Link>

      <div className="flex">
      <button
        onClick={() => signOut()}
        className="flex items-center bg-none text-white text-xl font-semibold mb-[15%] ml-auto underline"> 
        <AiOutlineLogout className="w-10 h-10 transform scale-x-[-1]" /> 
        <span className="ml-2">logout</span>
      </button>
    </div>


            
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

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi';
import { FcBusinesswoman, FcBusinessman } from 'react-icons/fc';
import { AiOutlineLogout } from 'react-icons/ai';

const getContacts = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/contacts', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch contacts');
    }

    return res.json();
  } catch (error) {
    throw new Error('Error loading contacts: ' + error.message);
  }
};

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { contacts } = await getContacts();
        setContacts(contacts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const signOut = () => {
    window.location.href = '/';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative overflow-hidden w-full h-full" style={{ backgroundImage: 'url("/image.png")', backgroundSize: '50%', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', top: '70%', left: '20%', rotate: '25.63deg', transform: 'translate(-50%, -50%)', width: '150%', height: '110%', borderRadius: '50%', backgroundColor: '#083F46', opacity: '1.0', pointerEvents: 'none' }}></div>
        <div className="relative z-10">
          <div className="ml-[25%] mt-12">
            <a href="/">
              <img src="/logo2.png" alt="twc logo" className="w-[90px] mb-2 " />
              <img src="/contacts portal.png" alt="contact" className="w-[140px]" />
            </a>
          </div>
          <div className="grid h-screen justify-start items-center ml-[25%] my-20">
            <div className=" text-white mb-auto">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold my-5">Contacts</h1>
                <Link href="/addContact">
                  <button className="bg-none font-bold text-white py-2 px-8 w-fit border border-white rounded-[30px]">Add New Contact</button>
                </Link>
              </div>
              <table className="border-collapse w-full bg-white text-[#083F46] rounded-[20px]">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-4"></th>
                    <th className="px-4 py-4">Full Name</th>
                    <th className="px-4 py-4">Gender</th>
                    <th className="px-4 py-4">E-mail</th>
                    <th className="px-4 py-4">Phone Number</th>
                    <th className="px-4 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((t) => (
                    <tr key={t._id}>
                      <td className="px-4 py-4">{t.gender === 'male' ? <FcBusinessman size={30} /> : <FcBusinesswoman size={30} />}</td>
                      <td className="px-4 py-4">{t.name}</td>
                      <td className="px-4 py-4">{t.gender}</td>
                      <td className="px-4 py-4">{t.email}</td>
                      <td className="px-4 py-4">{t.phone}</td>
                      <td className="px-4 py-4 flex gap-2">
                        <Link href={`/editContact/${t._id}`}>
                          <HiPencilAlt size={24} />
                        </Link>
                        <RemoveBtn id={t._id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex mt-20">
                <button onClick={() => signOut()} className="flex items-center bg-none text-white text-xl font-semibold mb-[10%] ml-auto underline">
                  <AiOutlineLogout className="w-10 h-10 transform scale-x-[-1]" />
                  <span className="ml-2">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

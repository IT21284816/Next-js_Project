"use client";

import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id, name }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const removeContact = async () => {
    const res = await fetch(`http://localhost:3000/api/contacts?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
       router.push('/contactList');
       window.location.reload();
    }
  };

  const handleConfirm = () => {
    removeContact();
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="text-red-400">
        <HiOutlineTrash size={24} />
      </button>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-20 backdrop-filter backdrop-blur-lg">
          <div className="bg-white p-8 rounded-[20px] shadow-lg">
            <p className="mb-4 font-semibold">Do you want to delete the contact "{name}" ?</p>
            <div className="flex justify-center">
              <button onClick={handleConfirm} className="mr-4 bg-[#083F46] text-white py-2 px-6 rounded-[20px]">
                Yes
              </button>
              <button onClick={() => setShowModal(false)} className="font-semibold px-4 rounded-[20px] border-2 border-[#083F46]">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

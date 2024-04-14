import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { FcBusinesswoman, FcBusinessman  } from "react-icons/fc";

const getContacts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/contacts", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch contacts");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading contacts: ", error);
    
  }
};

export default async function ContactsList() {
  const { contacts } = await getContacts();

  return (
    <table className="border-collapse w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-400 px-4 py-2">Icon</th>
          <th className="border border-gray-400 px-4 py-2">Name</th>
          <th className="border border-gray-400 px-4 py-2">Gender</th>
          <th className="border border-gray-400 px-4 py-2">Email</th>
          <th className="border border-gray-400 px-4 py-2">Phone</th>          
          <th className="border border-gray-400 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((t) => (
          <tr key={t._id}>
            <td className="border border-gray-400 px-4 py-2">
              {t.gender === "male" ? (
                <FcBusinessman  size={24} />
              ) : (
                <FcBusinesswoman  size={24} />
              )}
            </td>
            <td className="border border-gray-400 px-4 py-2">{t.name}</td>
            <td className="border border-gray-400 px-4 py-2">{t.gender}</td>
            <td className="border border-gray-400 px-4 py-2">{t.email}</td>
            <td className="border border-gray-400 px-4 py-2">{t.phone}</td>            
            <td className="border border-gray-400 px-4 py-2 flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editContact/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import EditContactForm from "@/components/EditContactForm";

const getContactById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/contacts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch contact");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditContact({ params }) {
  const { id } = params;
  const { contact } = await getContactById(id);
  const { name, email, phone, gender } = contact;

  return <EditContactForm id={id} name={name} email={email} phone={phone} gender={gender} />;
}

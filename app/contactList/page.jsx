// pages/dashboard.js

import PrivateRoute from '@/components/PrivateRoute';
import ContactsList from '@/components/ContactsList';
import { getSession } from 'next-auth/react';

export default function Dashboard({ contacts }) {
  return (
    <PrivateRoute>
      <ContactsList contacts={contacts} />
    </PrivateRoute>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/', // Redirect to login page if not authenticated
        permanent: false,
      },
    };
  }

  try {
    const res = await fetch("http://localhost:3000/api/contacts", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch contacts");
    }

    const contacts = await res.json();

    return {
      props: { contacts },
    };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {
      props: { contacts: [] }, // Return empty contacts array on error
    };
  }
}

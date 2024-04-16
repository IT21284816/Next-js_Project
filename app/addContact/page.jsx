import AddContact from '@/components/addContact';
import PrivateRoute from '@/components/PrivateRoute';

export default function AddContactPage() {
  return (
    <PrivateRoute>
      <AddContact />
    </PrivateRoute>
  );
}

import React, { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { fetchUsers, createUser, updateUser, deleteUser } from "./services/api";
import "./styles.css";


function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await fetchUsers();
    setUsers(res.data);
  };

  const handleSubmit = async (data) => {
    if (selectedUser) {
      await updateUser(selectedUser.id, data);
    } else {
      await createUser(data);
    }
    loadUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div className="container" >
      <h2 className="Heading">React CRUD Application</h2>

      <UserForm
        onSubmit={handleSubmit}
        selectedUser={selectedUser}
        clearSelection={() => setSelectedUser(null)}
      />

      <UserList
        users={users}
        onEdit={setSelectedUser}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;

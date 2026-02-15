import React from "react";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div>
      <h3 className="Heading">User List</h3>

      {users.map(user => (
        <div key={user.id} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
          <p><strong>{user.firstName} {user.lastName}</strong></p>
          <p>{user.email}</p>
          <p>{user.phone}</p>

          <button onClick={() => onEdit(user)} className="btnEdit">Edit</button>
          <button onClick={() => onDelete(user.id) }className="btnDelete">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;

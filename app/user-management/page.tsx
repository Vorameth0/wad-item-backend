"use client";

import { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  status: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);

  async function loadUsers() {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUsers(data);
  }

  async function deleteUser(id: string) {
    await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });
    loadUsers();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>User Management</h1>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.status}</td>
              <td>
                <button onClick={() => deleteUser(u._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

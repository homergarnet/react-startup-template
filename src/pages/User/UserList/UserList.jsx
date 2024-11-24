import React from "react";

import userData from "../../../__mocks__/userDummy.json";
const UserList = () => {
  return (
    <div>
      <h1>User List</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Role</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.email}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.role}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

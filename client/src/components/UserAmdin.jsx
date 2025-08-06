import React from 'react';
import { deleteUserById } from '../services/userServices';

const UserAmdin = ({ allUsers, setUpdateUserlist, user }) => {
  const handleDeleteUser = async (id) => {
    deleteUserById(id);

    setUpdateUserlist((prev) => prev + 1);
  };

  return (
    <>
      {user.role?.includes('admin') ? (
        <div>
          {console.log('user in admin: ', user)}
          <h2>User Admin</h2>
          <ul className="userlist">
            <div className="category-wrapper">
              <div>Roles</div>
              <div>Username</div>
              <div>Email</div>
              <div>Id</div>
              <div className="button-container"></div>
            </div>
            {allUsers &&
              allUsers.map((user) => (
                <li key={user._id}>
                  <div>
                    {user.role.map((role, index) => (
                      <span key={index} className="role-tag">
                        {role}
                      </span>
                    ))}
                  </div>
                  <div>{user.userName}</div>
                  <div>{user.email}</div>
                  <div>{user._id} </div>
                  <div className="button-container">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="delete-button">
                      Delete User
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div>Access denied</div>
      )}
    </>
  );
};

export default UserAmdin;

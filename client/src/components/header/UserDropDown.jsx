import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getUserById } from '../../services/userServices';

const UserDropDown = ({ JWT, setJWT, setUser, user }) => {
  useEffect(() => {
    if (!user._id) {
      const decode = jwtDecode(JWT);

      console.log('runnung get user data');
      const getUser = async (id) => {
        const userInfo = await getUserById(id, JWT);

        console.log(userInfo);

        setUser(userInfo.data);
      };

      getUser(decode.id);
    }
  }, [JWT]);

  const handleLogoutButton = () => {
    setJWT('');
    localStorage.removeItem('jwt-cuddle');
  };

  return (
    <div className="dropdown-menu-wrapper login-menu">
      <div>
        <ul className="logged-in-user">
          <b>Logged in as</b>
          <li>{user.userName}</li>
          <li>
            <span>{user._id}</span>
          </li>
        </ul>
        <ul>
          <b>Roles</b>
          {user.role?.map((role, index) => (
            <li className="capitalize" key={index}>
              {role}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => handleLogoutButton()}>Logout</button>
    </div>
  );
};

export default UserDropDown;

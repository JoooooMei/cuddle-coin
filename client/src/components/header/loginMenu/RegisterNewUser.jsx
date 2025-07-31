import React from 'react';
import { useState } from 'react';
import { addUser } from '../../../services/userServices';
import { newUserAlert } from '../../../services/alertServices';
import { loginUser } from '../../../services/authServices';

const RegisterNewUser = ({ setNewUser, setJWT }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: [],
  });
  const [inputAlert, setInputAlert] = useState(undefined);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newRoles = checked
        ? [...prev.role, value]
        : prev.role.filter((role) => role !== value);

      return {
        ...prev,
        role: newRoles,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewUser(formData);

    const success = await addUser(formData);

    if (success.success) {
      const userCredentials = {
        email: formData.email,
        password: formData.password,
      };

      loginAfterRegister(userCredentials);

      setFormData({
        userName: '',
        email: '',
        password: '',
        role: [],
      });
    } else {
      formAlert(success.message);
    }
  };

  const loginAfterRegister = async (userCredentials) => {
    const login = await loginUser(userCredentials);

    if (login.success) {
      setJWT(login.data.token);
      window.location.reload();
    }
  };

  const formAlert = (message) => {
    const alert = newUserAlert(message);

    setInputAlert(alert);

    setTimeout(() => {
      setInputAlert(undefined);
    }, 4000);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <div>
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          name="userName"
          id="userName"
          value={formData.userName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={inputAlert?.type === 'role' ? 'roles alert' : 'roles'}>
        <h4>Roles:</h4>
        <div className="checkboxes">
          <div>
            <input
              type="checkbox"
              id="role-user"
              value="user"
              checked={formData.role.includes('user')}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="role-user">User</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="role-admin"
              value="admin"
              checked={formData.role.includes('admin')}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="role-admin">Admin</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="role-miner"
              value="miner"
              checked={formData.role.includes('miner')}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="role-miner">Miner</label>
          </div>
        </div>
      </div>
      <div className="submit-wrapper">
        {inputAlert && (
          <div className="alertMessage">
            <p>{inputAlert.message}</p>
          </div>
        )}
        <button type="submit">Create account</button>
      </div>
    </form>
  );
};

export default RegisterNewUser;

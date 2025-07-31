import React, { useState } from 'react';
import { loginUser } from '../../../services/authServices';

const LogIn = ({ setJWT, setLoginMenu }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    const login = await loginUser(user);

    if (login.success) {
      setJWT(login.data.token);
      setLoginMenu(false);
    } else {
      failedLogin(login.message);
    }
  };

  const failedLogin = (errorMessage) => {
    setLoginError(errorMessage);

    setTimeout(() => {
      setLoginError(false);
    }, 2000);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Login</button>
      {loginError && <p className="login-error">{loginError}</p>}
    </form>
  );
};

export default LogIn;

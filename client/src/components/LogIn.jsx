import React, { useState } from 'react';
import { loginUser } from '../services/authServices';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    console.log(user);

    const loginToken = await loginUser(user);
    console.log('JWT token', loginToken);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {console.log(email)}
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LogIn;

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import LOGIN_MUTATION from '../graphql/mutations/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { email, password } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default Login;
import React, { useState, useContext, useEffect } from 'react'
import { StateContext } from '../contexts';

import { useResource } from "react-request-hook";


export default function Login() {
  const [username, setUsername] = useState('')
  const [loginFailed, setLoginFailed] = useState(false)
  const [password, setPassword] = useState('')

  const { dispatch } = useContext(StateContext);

  const [user, login] = useResource((username, password) => ({
    url: "auth/login",
    method: "post",
    data: { username, password },
  }));

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setLoginFailed(true);
      } else {
        setLoginFailed(false);
        dispatch({
          type: "LOGIN",
          username: user.data.username,
          access_token: user.data.access_token,
        });
      }
    }
  }, [user]);

  return (
    <>
      {loginFailed && (
        <span style={{ color: "red" }}>Login Failed</span>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(username, password);
        }}
      >
        <label htmlFor="login-username">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          name="login-username"
          id="login-username"
        />
        <label htmlFor="login-password">Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} name="login-password" id="login-password" />
        <input type="submit" value="Login" disabled={username.length === 0} />
      </form>
    </>
  );
}

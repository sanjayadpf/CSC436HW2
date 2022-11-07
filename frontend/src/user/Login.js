import React, { useState, useContext, useEffect } from 'react'
import { StateContext } from '../contexts';

import { useResource } from "react-request-hook";


export default function Login() {
  const [ username, setUsername ] = useState('')
    const [ loginFailed, setLoginFailed ] = useState(false)
    const [ password, setPassword ] = useState('')

    const {dispatch } = useContext(StateContext);

    const [user, login] = useResource((username, password) => ({
        url: "/login",
        method: "post",
        data: {email: username, password },
      }));

    useEffect(() => {
        if (user?.data?.user) {
          setLoginFailed(false);
          dispatch({ type: "LOGIN", username: user.data.user.email });
        }
    
        if (user?.error) {
          console.log(user?.error);
          setLoginFailed(true);
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
      <input type="password" value = {password} onChange = {(event) =>setPassword(event.target.value)} name="login-password" id="login-password"/>
      <input type="submit" value="Login" disabled={username.length === 0} />
    </form>
    </>
  );
}

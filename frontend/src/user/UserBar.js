import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { useContext } from 'react'
import { StateContext } from '../contexts'

export default function UserBar() {
  const { state } = useContext(StateContext);
  if (state.user) {
    return <Logout/>;
  } else {
    return (
      <>
        <Login/>
        <Register/>
      </>
    );
  }
}

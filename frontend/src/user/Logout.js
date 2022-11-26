import { useContext } from "react";
import { StateContext } from "../contexts";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        dispatch({ type: "CLEAR_TODOS" });
        navigate(`/`);
      }}
    >
      Logged in as: <b>{user.username}</b>
      <input type="submit" value="Logout" />
    </form>
  );
}

import React, { useEffect, useContext } from "react";
import { useResource } from "react-request-hook";
import { useParams, useNavigate } from "react-router-dom";

import { StateContext } from "../contexts";

import Todo from "../todo/Todo";

export default function TodoPage() {
  const { id } = useParams();
  const { state, dispatch } = useContext(StateContext);


  const [todo, getTodo] = useResource(() => ({
    url: `/todo/${id}`,
    method: "get",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  useEffect(getTodo, [id]);

  return (
    <div>
      {(todo && todo.data) ? <Todo {...todo.data} /> : "Loading..."}
      <hr />
    </div>
  );
}
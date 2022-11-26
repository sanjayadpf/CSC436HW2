import { formatDate } from "./Format.js";
import { useState, useContext, useEffect } from "react";
//import { v4 as uuidv4 } from "uuid";

import { StateContext } from '../contexts'
import { useResource } from "react-request-hook";
import { useNavigate } from "react-router-dom";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //const [uid] = useState(uuidv4());

  const [error, setError] = useState(false);

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const navigate = useNavigate();

  const [todo, createTodo] = useResource(({ title, description, author, dateCreated, checked, completed, username }) => ({
    url: '/todos',
    method: 'post',
    headers: { "Authorization": `${state.user.access_token}` },
    data: { title, description, author, dateCreated, checked, completed, username }
  }))

  useEffect(() => {
    if (todo?.error) {
      setError(true);
    }
    if (todo?.isLoading === false && todo?.data) {
      dispatch({
        type: "CREATE_TODO",
        title: todo.data.title,
        description: todo.data.description,
        author: todo.data.author,
        dateCreated: todo.data.dateCreated,
        checked: todo.data.checked,
        completed: todo.data.completed,
        id: todo.data._id,
        username: todo.data.username
      });
      navigate(`/`);
    }
  }, [todo]);


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo({
          title,
          description,
          author: user,
          dateCreated: formatDate(new Date(Date.now())),
          checked: false,
          completed: "",
          username: user.username
        });
      }}
    >
      <div>
        Author: <b>{user.username}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input type="submit" value="Create" />
    </form>
  );
}

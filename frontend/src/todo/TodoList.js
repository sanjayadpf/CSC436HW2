import Todo from "./Todo";
import { formatDate } from "./Format.js";
import { StateContext } from '../contexts';
import { useContext } from 'react';
import { useResource } from 'react-request-hook';

export default function TodoList() {

  const { state, dispatch } = useContext(StateContext);
  const { todos } = state;

  const [todoDel, deleteTodo] = useResource(({ id }) => ({
    url: `/todos/${id}`,
    method: 'delete',
    headers: {"Authorization": `${state.user.access_token}`}
  }));

  const [ todoPat, putTodo ] = useResource(({ id, title, description, author, dateCreated, checked, completed }) => ({
    url: `/todo/${id}`,
    method: 'put',
    headers: {"Authorization": `${state.user.access_token}`},
    data: {title, description, author, dateCreated, checked, completed},
    }));


  return (
    <div>
      {todos.map((p, i) => (
        <div key={p._id}>
          <Todo {...p} />
          <input id="check" type="checkbox" checked={p.checked} onChange={() => {
            putTodo({ id: p._id, title: p.title, description: p.description, author: p.author, dateCreated: p.dateCreated, checked: !(p.checked), completed: ((p.completed === "")) ? formatDate(new Date(Date.now())) : "" });
            dispatch({ type: "TOGGLE_TODO", id: p.id, checked: p.checked })
          }} />
          <br />
          <input type="submit" value="Delete" onClick={e => {
            e.preventDefault();
            deleteTodo({ id: p._id });
            dispatch({ type: "DELETE_TODO", id: p.id })
          }} />
        </div>
      ))}
    </div>
  );
}

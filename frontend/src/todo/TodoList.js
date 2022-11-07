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
    method: 'delete'
  }));

  const [todoPatch, patchTodo] = useResource(({ id, checked, completed }) => ({
    url: `/todos/${id}`,
    method: 'patch',
    data: { checked, completed }
  }));


  return (
    <div>
      {todos.map((p, i) => (
        <>
          <Todo {...p} />
          <input id="check" type="checkbox" checked={p.checked} onChange={() => {
            patchTodo({ id: p.id, checked: !(p.checked), completed: ((p.completed === "")) ? formatDate(new Date(Date.now())) : "" });
            dispatch({ type: "TOGGLE_TODO", id: p.id, checked: p.checked })
          }} />
          <br />
          <input type="submit" value="Delete" onClick={e => {
            e.preventDefault();
            deleteTodo({ id: p.id });
            dispatch({ type: "DELETE_TODO", id: p.id })
          }} />
        </>
      ))}
    </div>
  );
}

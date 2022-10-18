import Todo from "./Todo";

export default function TodoList({ todos = [], dispatch }) {
  return (
    <div>
      {todos.map((p, i) => (
        <>
          <Todo {...p} key={p.id} />
          <input id="check" type="checkbox" onChange={() => dispatch({ type: "TOGGLE_TODO", id: p.id, checked: p.checked })} />
          <br />
          <input type="submit" value="Delete" onClick={e => { e.preventDefault(); dispatch({ type: "DELETE_TODO", id: p.id }); }} />
        </>
      ))}
    </div>
  );
}

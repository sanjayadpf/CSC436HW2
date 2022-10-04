import { formatDate } from "./todo/Format.js";
import {useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import CreateTodo from "./todo/CreateTodo";

import appReducer from "./reducers";

function App() {
  const initialTodos = [
    {
      title: "Todo #01",
      description: "CSC 436 HW1",
      author: "Sanjaya",
      dateCreated: formatDate(new Date("Sep 27 2022 17:30:00")),
      id: uuidv4(),
    },
    {
      title: "Todo #02",
      description: "CSC 436 HW2",
      author: "Dilshan",
      dateCreated: formatDate(new Date("Oct 04 2022 17:30:00")),
      id: uuidv4(),
    },
  ];

  // Don't manage global state like this in a real app
  // const [globalState, updateGlobalState] = useState({
  //   user: "",
  //   posts: [],
  //   comments: []
  // })
  // updateGlobalState({ ...globalState, user: "Paul" })

  //const [user, setUser] = useState("");

  //const [user, dispatchUser] = useReducer(userReducer, "");

  //const [posts, setPosts] = useState(initialPosts);
  //const [posts, dispatchPosts] = useReducer(postReducer, initialPosts);

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: initialTodos,
  });

  return (
    <div>
      <UserBar user={state.user} dispatch={dispatch} />
      <TodoList todos={state.todos} />
      {state.user && (
        <CreateTodo user={state.user} todos={state.todos} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;

import { formatDate } from "./todo/Format.js";
import React, { useState, useReducer, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";

import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import CreateTodo from "./todo/CreateTodo";

import appReducer from "./reducers";
import ClearCompletedTodo from "./todo/ClearCompletedTodo.js";
import { useResource } from "react-request-hook";
import { StateContext } from './contexts'

function App() {
  /*  const initialTodos = [
     {
       title: "Todo #01",
       description: "CSC 436 HW1",
       author: "Sanjaya",
       dateCreated: formatDate(new Date("Sep 27 2022 17:30:00")),
       checked: false,
       completed: "",
       id: uuidv4(),
     },
     {
       title: "Todo #02",
       description: "CSC 436 HW2",
       author: "Dilshan",
       dateCreated: formatDate(new Date("Oct 04 2022 17:30:00")),
       checked: false,
       completed: "",
       id: uuidv4(),
     },
   ]; */



  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  const [todos, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));

  useEffect(getTodos, []);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: "FETCH_POSTS", todos: todos.data.reverse() });
    }
  }, [todos]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <UserBar />
        <TodoList />
        <div style={{ marginTop: 100 }}>
          <ClearCompletedTodo />
        </div>
        {state.user && <CreateTodo />}
      </StateContext.Provider>
    </div>
  );
}

export default App;

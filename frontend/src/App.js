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

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage"; 
import Layout from "./pages/Layout";


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

 /* const [todos, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));*/

  //useEffect(getTodos, []);

  /*useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: "FETCH_POSTS", todos: todos.data.reverse() });
    }
  }, [todos]);*/

  return (
    <div>
        <StateContext.Provider value={{state, dispatch}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
              </Route>
              <Route path="/todo" element={<Layout />}>
                <Route path="/todo/create" element={<CreateTodo />} />
                <Route path="/todo/:id" element={<TodoPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </StateContext.Provider>
    </div>
  );
}

export default App;

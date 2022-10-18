import { formatDate } from "./todo/Format.js";
function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: action.dateCreated,
        checked: action.checked,
        completed: action.completed,
        id: action.id
      }
      return [newTodo, ...state];
    case "DELETE_TODO":
      return state.filter((item) => item.id !== action.id);
    case "TOGGLE_TODO":
      const newList = state.map((item) => {
        if (item.id === action.id) {
          const toggledItem = { ...item, checked: !item.checked, completed: ((item.completed === "")) ? formatDate(new Date(Date.now())) : "" };
          return toggledItem;
        }
        return item;
      })
      return newList;
    case "CLEAR_COMPLETED_TODO":
      return state.filter((item) => item.checked !== true);

    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}
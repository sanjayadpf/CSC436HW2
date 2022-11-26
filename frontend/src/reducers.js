import { formatDate } from "./todo/Format.js";
function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        username: action.username,
        access_token: action.access_token,
      };
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
        _id: action.id,
        username: action.username
      }
      return [newTodo, ...state];
    case "DELETE_TODO":
      return state.filter((item) => item._id !== action.id);
    case "TOGGLE_TODO":
      const newList = state.map((item) => {
        if (item._id === action.id) {
          const toggledItem = { ...item, checked: !item.checked, completed: ((item.completed === "")) ? formatDate(new Date(Date.now())) : "" };
          return toggledItem;
        }
        return item;
      })
      return newList;
    case "CLEAR_COMPLETED_TODO":
      return state.filter((item) => item.checked !== true);
    case "FETCH_POSTS":
      return action.todos;
    case "CLEAR_TODOS":
      return [];
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
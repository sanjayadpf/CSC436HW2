import { Link } from "react-router-dom";

export default function Todo({ title, description, author, dateCreated, checked, completed, _id, username }) {
  return (
    <div>
      <h2>{title}</h2>
      <Link to={`/todo/${_id}`}> <h3 style={{ color: "black" }}>{title}</h3> </Link>
      <div>{description}</div>
      <div>
        <br />
        <small>Created On: <b> {dateCreated} </b></small>
        <br />
        <small>Status: <b>{checked ? "Completed" : "Incompleted"}</b></small>
        <br />
        <small>Finished On: <b>{completed}</b></small>
        <br />
        <h4><i>Posted By: {username}</i></h4>
      </div>
    </div>
  );
}


export default function Todo({ title, description, author, dateCreated, checked, completed }) {
  return (
    <div>
      <h2>{title}</h2>
      <div>{description}</div>
      <div>
        <br />
        <small>Created On: <b> {dateCreated} </b></small>
        <br />
        <small>Status: <b>{checked ? "Completed" : "Incompleted"}</b></small>
        <br />
        <small>Finished On: <b>{completed}</b></small>
        <br />
        <h4><i>Posted By: {author}</i></h4>
      </div>
    </div>
  );
}

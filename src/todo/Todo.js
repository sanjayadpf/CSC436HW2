import { useState } from 'react'
import { formatDate } from "./Format.js";

export default function Todo({ title, description, author,dateCreated }) {

  const [checked, setChecked] = useState(false)
  const [completed, setStatus] = useState("");

  const handleCheckBox = (event) => {
    if(event.target.checked){
      setStatus(formatDate(new Date(Date.now())));
    }
    else{
      setStatus("");
    }
    setChecked(!checked)
  }

  return (
    <div>
      <h2>{title}</h2>
      <div>{description}</div>
      <div>
                <br/>
                <small>Created On: <b> {dateCreated} </b></small>
                <br/>
                <small>Status: <b>{checked ? "Completed" : "Incompleted"}</b></small>
                <input id="check" type="checkbox" onChange={handleCheckBox}/>
                <br/>
                <small>Finished On: <b>{completed}</b></small>
                <br/>
                <h4><i>Posted By: {author}</i></h4>
        </div>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState(""); //Default to empty string

  const handleAdd = () => {
    axios
      .post("http://localhost:3001/add", { task })
      .then((result) => {
        setTask(""); //Clear the input field after adding the task
        // Optionally call a parent function to update the list
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Add Your Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add Task
      </button>
    </div>
  );
}

export default Create;

import React, { useEffect, useState } from "react";
import Create from "./Create.jsx";
import axios from "axios";
import {
  BsFillCheckCircleFill,
  BsCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

function Home() {
  //we need to display our list todo's, So for that we need a variable
  const [todos, setTodos] = useState([]); //Store todos //we will store all our todo into this 'todo' variable

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);



  const handleEdit = (id) => {
    axios
      .put("http://localhost:3001/update/" + id)
      .then((result) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: true } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };


  
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then((result) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      <br />
      {todos.length === 0 ? (
        <div>
          <h3>No Record</h3>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <BsFillTrashFill
                className="icon"
                onClick={() => handleDelete(todo._id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;

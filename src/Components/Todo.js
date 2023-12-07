import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";

import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
 const [editId,setEditId] = useState ("")
 const [duplicateError, setDuplicateError] = useState(false);


 const addTodo = () => {
   if (todo !== '' && todo.trim()!=='') {
      
     if (!todos.some(item => item.list === todo)) {
       setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
       setTodo("");
       setDuplicateError(false)
     }
     else {
    setDuplicateError(true)
   }
   }
  
  
   if (editId)
   {
     const editTodo = todos.find((todo) => todo.id === editId)
     console.log("last result", editTodo)
     const updateTodo = todos.map((item) => item.id === editTodo.id
       ? (item = { id: item.id, list: todo })
       : (item = { id: item.id, list: item.list }))
     setTodos(updateTodo)
     setEditId(0)
     setTodo("")

     
     }
};


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputRef = useRef("null");

  const onDelete = (id) => { 
    const data = todos.filter((item) => item.id !== id)
    setTodos(data)
  }

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      
      if (list.id === id)
      {
        return({...list, status:!list.status})
      }
      return list
    })
    setTodos(complete)
     }

  const onEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
    console.log(editTodo)
    

  }
  
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="Container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(event) => {
            setTodo(event.target.value);
             setDuplicateError(false);
          }}
        />
       

        <button onClick={addTodo}>{editId?'EDIT':'ADD' }</button>
      </form>
      <div>
        <ul className="list">
          {todos.map((items) => (
            <li className="list-items">
              <div className="list-items-list" id={items.status ? 'list_item' :''}>{items.list}</div>
              <span> 
                <IoMdDoneAll
                  className="list-items-icons"
                  id="complete"
                  title="complete"
                  onClick={()=>onComplete(items.id)}
                />
                <FiEdit className="list-items-icons"
                  id="edit" title="edit"
                onClick={()=>onEdit(items.id)}/>
           
                <MdDelete
                  className="list-items-icons"
                  id="delete"
                  title="delete"
                  onClick={() => onDelete(items.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
       {/* {duplicateError && <p className="error-message">Please Check Todo is Empty OR Todo name already exists!</p>} */}
    </div>
  );
}

export default Todo;

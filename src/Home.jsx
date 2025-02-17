import React, { useState, useEffect } from "react";
import "./home.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { db, collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from "./firebase"; // Import Firestore methods

function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch todos from Firestore
  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const loadedTodos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(loadedTodos);
    };

    fetchTodos();
  }, []);

  // Add or Update task in Firestore and update the state instantly
  const handleAddOrUpdate = async () => {
    if (task.trim() === "") return;

    if (isEditing) {
      const todoRef = doc(db, "todos", editId);
      await updateDoc(todoRef, { task });

      // Update the todo state locally to reflect the change instantly
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editId ? { ...todo, task } : todo
        )
      );

      setIsEditing(false);
      setEditId(null);
    } else {
      const todoCollection = collection(db, "todos");
      const docRef = await addDoc(todoCollection, { task });

      // Add the new task to the state instantly
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: docRef.id, task }
      ]);
    }

    setTask(""); // Reset input field
  };

  // Delete task from Firestore and update the state instantly
  const handleDelete = async (id) => {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef); // Remove task from Firestore

    // Remove the task from the local state to reflect the change instantly
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Edit task
  const handleEdit = (todo) => {
    setTask(todo.task);
    setIsEditing(true);
    setEditId(todo.id);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      
      {/* Input Section for Adding/Editing Tasks */}
      <div className="input-container">
        <input
          type="text"
          value={task}
          placeholder="Add a new task..."
          onChange={(e) => setTask(e.target.value)} // Update task state
        />
        <button onClick={handleAddOrUpdate}>
          {isEditing ? <FaEdit /> : <FaPlus />} {/* Show edit or add icon */}
        </button>
      </div>
      
      {/* Todo List */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.task}</span>
            <div className="icons">
              <FaEdit onClick={() => handleEdit(todo)} className="edit-icon" />
              <FaTrash onClick={() => handleDelete(todo.id)} className="delete-icon" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

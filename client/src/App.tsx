import { useState, useEffect } from 'react';
import styles from './styles/app.module.scss';
import { FaCheckCircle } from 'react-icons/fa';
import { BsTrash2Fill } from 'react-icons/bs';
import { ImPencil2 } from 'react-icons/im';
import { BiAlarm } from 'react-icons/bi';

const API = process.env.REACT_APP_API_URL;

interface Todo {
  id: number;
  todo: string;
  complete: boolean;
}

function App() {
  const [complete] = useState(false);
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  //get the todos from database
  useEffect(() => {
    getAllTodos();
  }, [todos]);
  //
  //this function saves the todos in the database
  const saveTodo = async () => {
    const data = await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo,
        complete,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log('Error:', error));
    setTodos([...todos, data]);
    setTodo('');
  };

  //this function gets all the todos from the database
  const getAllTodos = async () => {
    await fetch(`${API}/todos`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('data not fetch');
        }
        return res.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => console.log('Error:', error));
  };

  //this function deletes the todo
  const deleteTodo = async (id: number) => {
    const data = await fetch(`${API}/todos/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
    setTodos(todos.filter((todo) => todo.id !== data.id));
  };

  //this function updates the complete state of the todo
  const completeTodo = async (id: number) => {
    const data = await fetch(`${API}/todos/${id}`, { method: 'PUT' })
      .then((res) => res.json())
      .catch((error) => console.log('Error:', error));
    const item = todos.find((item) => item.id === data.id);
    if (item) {
      item.complete = !item.complete;
      await fetch(`${API}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complete: item.complete }),
      })
        .then((res) => res.json())
        .catch((error) => console.log('Error:', error));
    }
  };

  //this function updates the todo
  const updateTodo = async (id: number) => {
    const data = await fetch(`${API}/todos/${id}/complete`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo,
        complete,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log('Error:', error));
    setTodos([...todos, data]);
    setTodo('');
  };
  return (
    <div className={styles.app}>
      <div>
        {todos.length === 0 ? (
          <h2 className={styles.header}>Add todos</h2>
        ) : todos.length === 1 ? (
          <h2 className={styles.header}>You have one todo</h2>
        ) : (
          <h2 className={styles.header}>You have {todos.length} todos</h2>
        )}
      </div>
      <div className={styles.appWrapper}>
        <div className={styles.inputWrapper}>
          <input
            type='text'
            placeholder='insert a todo'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button onClick={saveTodo} disabled={todo.trim() === ''}>
            save todo
          </button>
        </div>
        {todos.map((item, index) => (
          <div key={index} className={styles.container}>
            <h2
              className={`${
                item.complete ? styles.complete : styles.incomplete
              }`}
            >
              {item.todo}
            </h2>
            <div className={styles.btn_container}>
              <button
                onClick={() => deleteTodo(item.id)}
                className={styles.deleteTodo}
              >
                <BsTrash2Fill className={styles.react_icons} />
              </button>

              {item.complete ? (
                <FaCheckCircle
                  className={styles.completeReactIcon}
                  onClick={() => completeTodo(item.id)}
                />
              ) : (
                <button
                  className={styles.incompleteReactIcon}
                  onClick={() => completeTodo(item.id)}
                >
                  <BiAlarm className={styles.react_icons} />
                </button>
              )}
              <button
                className={styles.updataTodoBtn}
                onClick={() => updateTodo(item.id)}
                disabled={todo.trim() === ''}
              >
                <ImPencil2 className={`${styles.react_icons}`} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;

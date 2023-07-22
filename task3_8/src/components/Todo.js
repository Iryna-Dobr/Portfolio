import { useState, useEffect } from 'react';

const Todo = () => {

  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => {
        console.log(err);
      })
  }

  function handleChange(id) {
    setTodos(todos.filter((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }))

  }

  return (
    <div>
      Todo List
      <ul>
        {todos.map((todo) => (
          <li className='todo'>{todo.title}
            <input type="checkbox" checked={todo.completed} onClick={() => handleChange(todo.id)} />
          </li>
        ))
        }
      </ul>
    </div>
  );
}

export default Todo;

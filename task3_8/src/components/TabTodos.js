import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Todos = () => {
    const { id } = useParams();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <ul>
                {todos.map((todo) => (
                    <li className='todo'>{todo.title}
                        <input type="checkbox" checked={todo.completed} />
                    </li>
                ))
                }
            </ul>
        </div>
    )
}
export default Todos;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faCamera } from '@fortawesome/free-solid-svg-icons';

import './detail.css';
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Albums from "./TabAlbums";
import Todos from "./TabTodos";
import UserPosts from "./TabPosts";

const Detail = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [toggle, setToggle] = useState(1);

    const tabs = [
        {
            id: 1,
            tabTitle: "Albums",
            content: <Albums />
        },
        {
            id: 2,
            tabTitle: "Todos",
            content: <Todos />
        },
        {
            id: 3,
            tabTitle: "Posts",
            content: <UserPosts />
        },
    ]

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => {
                console.log(err);
            })
    }

    const updateToggle = (id) => {
        setToggle(id);
    }

    return (
        <div className="container_user">
            <div>
                <div className="container_elem">
                    <FontAwesomeIcon icon={faEnvelope} className='icon' />
                    <p className="data_user">{users.email}</p>
                    <p className="category">Email</p>
                </div>
                <div className="container_elem">
                    <FontAwesomeIcon icon={faPhone} className='icon' />
                    <p className="data_user">{users.phone}</p>
                    <p className="category">Mobile</p>
                </div>
                <div className="container_elem">
                    <FontAwesomeIcon icon={faCamera} className='icon' />
                    <p className="data_user">{users.website}</p>
                    <p className="category">Social Channels</p>
                </div>
            </div>
            <Link to="/user" className='btn_back'>Back</Link>

            <ul className="container_list">
                {tabs.map((tab) =>
                    <li className={toggle === tab.id ? "tab_user tab_user_active" : "tab_user"} onClick={() => updateToggle(tab.id)}>{tab.tabTitle}</li>
                )}
            </ul>

            <>
                {tabs.map((tab) =>
                    toggle === tab.id ? tab.content : null
                )}
            </>
        </div>
    );
}

export default Detail
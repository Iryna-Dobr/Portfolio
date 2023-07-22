import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPosts = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li>{post.body}</li>
                ))
                }
            </ul>
        </div>
    )
}
export default UserPosts;
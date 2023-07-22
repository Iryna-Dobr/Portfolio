import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Albums = () => {
    const { id } = useParams();
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
            .then((res) => res.json())
            .then((data) => setAlbums(data))
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <ul>
                {albums.map((album) => (
                    <li>{album.title}</li>
                ))
                }
            </ul>
        </div>
    )
}

export default Albums;
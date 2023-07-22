import { useState, useEffect } from 'react';
import AddPostForm from "./AddPostForm";


const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => {
        console.log(err);
      })
  }

  const addNewPost = (post) => {
    setPosts([...posts, post]);
  }
  console.log(posts);

  return (
    <>
      <>
        {showForm ? <AddPostForm posts={posts} addNewPost={addNewPost} closeForm={() => setShowForm(false)} /> : null}
      </>

      <h1>Posts</h1>
      <button className='btn' onClick={() => setShowForm(true)}>Create a new post</button>
      <ul>
        {posts.map((post) => (
          <li>{post.body}</li>
        ))
        }
      </ul>
    </>
  );
}

export default Posts;

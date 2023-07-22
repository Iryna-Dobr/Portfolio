import './form.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';


const AddPostForm = (props) => {
    const {
        handleSubmit,
    } = useForm();

    const [postDesc, setPostDesc] = useState();

    const postDescriptionChange = (e) => {
        setPostDesc(e.target.value);
    };

    const onSubmit = () => {
        const post = {
            id: new Date().getTime(),
            body: postDesc
        }

        props.closeForm();
        props.addNewPost(post);
    }

    return (
        <>
            <form className="postForm" onSubmit={handleSubmit(onSubmit)}>
                <h1>Create a new post</h1>
                <textarea name="post" placeholder='post description' value={postDesc} onChange={postDescriptionChange} />
                <input type="submit" className='btn' />
            </form>
            <div className="overlay"></div>
        </>
    );
};

export default AddPostForm;
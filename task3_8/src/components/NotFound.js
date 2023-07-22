import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            This page doesn't exist. Go <Link to="/">Main</Link> 
        </div>
    )
}

export default NotFound;
import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header>
                <nav>
                    <ul className="menu">
                        <li><NavLink to="/">Posts</NavLink></li>
                        <li><NavLink to="/todo">Todo</NavLink></li>
                        <li><NavLink to="/user">Users</NavLink></li>
                    </ul>
                </nav>
            </header>

            <main className="container">
                <Outlet />
            </main>

            <footer className="container_footer">2023 &copy; Company</footer>
        </>
    )
}
export default Header;
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

    localStorage.removeItem("access");

    localStorage.removeItem("refresh");

    localStorage.removeItem("is_staff");

    localStorage.removeItem("username");

    navigate("/");
};

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/tasks"
                >
                    Task Manager
                </Link>

                <div className="d-flex align-items-center gap-3">

                    <Link
                        className="btn btn-outline-light"
                        to="/tasks"
                    >
                        Tasks
                    </Link>

                    <Link
                        className="btn btn-outline-light"
                        to="/kanban"
                    >
                        Kanban
                    </Link>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;
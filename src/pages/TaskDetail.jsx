import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function TaskDetail() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [task, setTask] = useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchTask();

    }, []);

    const fetchTask = async () => {

        try {

            const response =
                await api.get(
                    `tasks/${id}/`
                );

            setTask(
                response.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    const deleteTask = async () => {

        const confirmDelete =
            window.confirm(
                "Delete this task?"
            );

        if (!confirmDelete)
            return;

        try {

            await api.delete(
                `tasks/${id}/`
            );

            navigate("/tasks");

        } catch (error) {

            console.log(error);
        }
    };

    if (loading) {

        return (
            <h3>
                Loading...
            </h3>
        );
    }

    if (!task) {

        return (
            <h3>
                Task not found
            </h3>
        );
    }

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card">

                    <div className="card-body">

                        <h2>
                            {task.name}
                        </h2>

                        <hr />

                        <p>
                            <strong>
                                Code:
                            </strong>
                            {" "}
                            {task.code}
                        </p>

                        <p>
                            <strong>
                                Description:
                            </strong>
                            {" "}
                            {task.description}
                        </p>

                        <p>
                            <strong>
                                Priority:
                            </strong>
                            {" "}
                            {task.priority}
                        </p>

                        <p>
                            <strong>
                                Status:
                            </strong>
                            {" "}
                            {task.status}
                        </p>

                        <p>
                            <strong>
                                Due Date:
                            </strong>
                            {" "}
                            {task.due_date}
                        </p>

                        <button
                            className="btn btn-warning me-2"
                            onClick={() =>
                                navigate(
                                    `/tasks/edit/${id}`
                                )
                            }
                        >
                            Edit
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={deleteTask}
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </div>

        </>
    );
}

export default TaskDetail;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function TaskForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        code: "",
        name: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        due_date: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "tasks/",
                formData
            );

            navigate("/tasks");

        } catch (error) {

            setError(
                "Unable to create task"
            );
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card p-4">

                    <h3>Create Task</h3>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="code"
                            placeholder="Task Code"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="name"
                            placeholder="Task Name"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

                        <select
                            name="priority"
                            className="form-control mb-3"
                            onChange={handleChange}
                        >
                            <option value="High">
                                High
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="Low">
                                Low
                            </option>
                        </select>

                        <input
                            type="date"
                            name="due_date"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

                        <button
                            className="btn btn-success"
                        >
                            Create Task
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}

export default TaskForm;
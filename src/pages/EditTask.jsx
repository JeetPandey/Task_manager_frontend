import { useEffect, useState } from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import api from "../api/axios";

import Navbar from "../components/Navbar";

function EditTask() {

    const { id } = useParams();

    const navigate =
        useNavigate();

    const [formData,
        setFormData] =
        useState({

            code: "",

            name: "",

            description: "",

            priority: "Medium",

            status: "Pending",

            due_date: ""

        });

    useEffect(() => {

        fetchTask();

    }, []);

    const fetchTask = async () => {

        const response =
            await api.get(
                `tasks/${id}/`
            );

        setFormData(
            response.data
        );
    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value

        });
    };

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        await api.put(
            `tasks/${id}/`,
            formData
        );

        navigate(
            `/tasks/${id}`
        );
    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card p-4">

                    <h3>
                        Edit Task
                    </h3>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <input
                            name="code"
                            value={
                                formData.code
                            }
                            onChange={
                                handleChange
                            }
                            className="form-control mb-3"
                        />

                        <input
                            name="name"
                            value={
                                formData.name
                            }
                            onChange={
                                handleChange
                            }
                            className="form-control mb-3"
                        />

                        <textarea
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={
                                handleChange
                            }
                            className="form-control mb-3"
                        />

                        <select
                            name="priority"
                            value={
                                formData.priority
                            }
                            onChange={
                                handleChange
                            }
                            className="form-control mb-3"
                        >

                            <option>
                                High
                            </option>

                            <option>
                                Medium
                            </option>

                            <option>
                                Low
                            </option>

                        </select>

                        <select
                            name="status"
                            value={
                                formData.status
                            }
                            onChange={
                                handleChange
                            }
                            className="form-control mb-3"
                        >

                            <option>
                                Pending
                            </option>

                            <option>
                                In Progress
                            </option>

                            <option>
                                Completed
                            </option>

                        </select>

                        <input
                            type="date"
                            name="due_date"
                            value={
                                formData.due_date
                            }
                            onChange={
                                handleChange
                            }
                            className="form-control mb-3"
                        />

                        <button
                            className="btn btn-success"
                        >
                            Update
                        </button>

                    </form>

                </div>

            </div>

        </>
    );
}

export default EditTask;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

function TaskBoard() {

    const [tasks, setTasks] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("");

    const [priorityFilter, setPriorityFilter] =
        useState("");

    const [sort, setSort] =
        useState("");

    useEffect(() => {

        fetchTasks();

    }, [
        page,
        search,
        statusFilter,
        priorityFilter,
        sort
    ]);

    const fetchTasks = async () => {

        try {

            setLoading(true);

            const response =
                await api.get(
                    `tasks/?page=${page}&search=${search}&status=${statusFilter}&priority=${priorityFilter}&sort=${sort}`
                );

            setTasks(
                response.data.results
            );

            setTotalPages(
                response.data.total_pages
            );

        } catch (error) {

            console.log(error);

            setError(
                "Unable to load tasks."
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Task Board
                </h2>

                <div className="mb-3">

                    <Link
                        to="/tasks/create"
                        className="btn btn-success"
                    >
                        Add Task
                    </Link>

                </div>

                <div className="row mb-4">

                    <div className="col-md-3">

                        <input
                            type="text"
                            placeholder="Search..."
                            className="form-control"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-control"
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Status
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                        </select>

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-control"
                            value={priorityFilter}
                            onChange={(e) =>
                                setPriorityFilter(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Priority
                            </option>

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

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-control"
                            value={sort}
                            onChange={(e) =>
                                setSort(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                No Sorting
                            </option>

                            <option value="due_date">
                                Due Date
                            </option>

                        </select>

                    </div>

                </div>

                {loading && (

                    <div className="alert alert-info">
                        Loading Tasks...
                    </div>

                )}

                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}

                {!loading &&
                    tasks.map((task) => (

                        <TaskCard
                            key={task.id}
                            task={task}
                        />

                    ))
                }

                <div className="d-flex justify-content-center gap-3 mt-4">

                    <button
                        className="btn btn-secondary"
                        disabled={page === 1}
                        onClick={() =>
                            setPage(page - 1)
                        }
                    >
                        Previous
                    </button>

                    <span className="mt-2">

                        Page {page}
                        {" / "}
                        {totalPages}

                    </span>

                    <button
                        className="btn btn-secondary"
                        disabled={
                            page === totalPages
                        }
                        onClick={() =>
                            setPage(page + 1)
                        }
                    >
                        Next
                    </button>

                </div>

            </div>

        </>
    );
}

export default TaskBoard;
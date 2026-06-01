import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";

function TaskBoard() {

  const [tasks, setTasks] =
    useState([]);
    console.log(tasks);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  useEffect(() => {

    fetchTasks(page);

  }, [page]);

  const fetchTasks = async (pageNumber) => {

    try {

      setLoading(true);

      const response =
        await api.get(
          `tasks/?page=${pageNumber}`
        );

      setTasks(
        response.data.results
      );

      console.log(response.data.results);

      setTotalPages(
        response.data.total_pages
      );

    } catch (error) {

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
            {" "}
            of
            {" "}
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
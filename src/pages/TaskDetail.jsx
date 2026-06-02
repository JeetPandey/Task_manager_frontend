import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

function TaskDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [task, setTask] = useState(null);

  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();

    fetchComments();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await api.get(`tasks/${id}/`);

      setTask(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`tasks/${id}/comments/`);

      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (commentText) => {
    try {
      await api.post("comments/", {
        task: id,
        comment: commentText,
      });

      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    const confirmDelete = window.confirm("Delete this task?");

    if (!confirmDelete) return;

    try {
      await api.delete(`tasks/${id}/`);

      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!task) {
    return <h3>Task not found</h3>;
  }


  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h2>{task.name}</h2>

            <hr />

            <p>
              <strong>Code:</strong> {task.code}
            </p>

            <p>
              <strong>Description:</strong> {task.description}
            </p>

            <p>
              <strong>Priority:</strong> {task.priority}
            </p>

            <p>
              <strong>Status:</strong> {task.status}
            </p>

            <p>
              <strong>Due Date:</strong> {task.due_date}
            </p>
            {localStorage.getItem("is_staff") === "true" && (
              <button
                className="btn btn-warning me-2"
                onClick={() => navigate(`/tasks/edit/${id}`)}
              >
                Edit
              </button>
            )}
            {localStorage.getItem("is_staff") === "true" && (
            <button className="btn btn-danger" onClick={deleteTask}>
              Delete
            </button>
            )}
          </div>
            
        </div>

        <div className="mt-4">
          <h3>Comments</h3>

          <CommentForm addComment={addComment} />

          <hr />

          <CommentList comments={comments} />
        </div>
      </div>
    </>
  );
}

export default TaskDetail;

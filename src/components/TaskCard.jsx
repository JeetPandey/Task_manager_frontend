import { Link } from "react-router-dom";

function TaskCard({ task }) {

  return (

    <div className="card mb-3 shadow">

      <div className="card-body">

        <h5 className="card-title">
          {task.name}
        </h5>

        <p>
          <strong>Code:</strong>
          {" "}
          {task.code}
        </p>

        <p>
          <strong>Priority:</strong>
          {" "}
          {task.priority}
        </p>

        <p>
          <strong>Status:</strong>
          {" "}
          {task.status}
        </p>

        <p>
          <strong>Due Date:</strong>
          {" "}
          {task.due_date}
        </p>

        <Link
          to={`/tasks/${task.id}`}
          className="btn btn-primary"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default TaskCard;
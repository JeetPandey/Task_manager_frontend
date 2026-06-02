import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("tasks/");
      setTasks(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(
        `tasks/${id}/status/`,
        { status }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId =
      parseInt(result.draggableId);

    const newStatus =
      result.destination.droppableId;

    await updateStatus(
      taskId,
      newStatus
    );
  };

  const pending =
    tasks.filter(
      t => t.status === "Pending"
    );

  const progress =
    tasks.filter(
      t => t.status === "In Progress"
    );

  const completed =
    tasks.filter(
      t => t.status === "Completed"
    );

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>Kanban Board</h2>

        <DragDropContext
          onDragEnd={onDragEnd}
        >

          <div className="row">

            <KanbanColumn
              title="Pending"
              tasks={pending}
            />

            <KanbanColumn
              title="In Progress"
              tasks={progress}
            />

            <KanbanColumn
              title="Completed"
              tasks={completed}
            />

          </div>

        </DragDropContext>

      </div>
    </>
  );
}

function KanbanColumn({
  title,
  tasks,
}) {
  return (
    <div className="col-md-4">

      <h4 className="text-center">
        {title}
      </h4>

      <Droppable
        droppableId={title}
      >
        {(provided) => (

          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-light p-3 rounded"
            style={{
              minHeight: "500px",
            }}
          >

            {tasks.map(
              (task, index) => (

                <Draggable
                  key={task.id}
                  draggableId={
                    String(task.id)
                  }
                  index={index}
                >

                  {(provided) => (

                    <div
                      ref={
                        provided.innerRef
                      }
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="card mb-2"
                    >

                      <div className="card-body">

                        <h6>
                          {task.name}
                        </h6>

                        <small>
                          {task.priority}
                        </small>

                      </div>

                    </div>

                  )}

                </Draggable>

              )
            )}

            {provided.placeholder}

          </div>

        )}
      </Droppable>

    </div>
  );
}

export default KanbanBoard;
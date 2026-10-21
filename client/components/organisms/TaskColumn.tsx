import { Task as TaskType } from "@/lib/types";
import { EllipsisVertical, Plus } from "lucide-react";
import { useDrop } from "react-dnd";
import Task from "../molecules/Task";

type Props = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: Props) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const tasksCount = tasks.filter((task) => task.status === status).length;
  const statusColor: Record<string, string> = {
    "To do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D07706",
    Completed: "#000000",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`rounded-xl py-2 xl:px-2 xl:py-4 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`!bg-[${statusColor[status]}] w-2`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="dark:bg-dark-secondary flex w-full items-center justify-between rounded-e-xl bg-white px-5 py-4">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}
            <span
              className="dark:bg-dark-tertiary ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button
              onClick={() => setIsModalNewTaskOpen(true)}
              className="dark:bg-dark-tertiary flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:text-white"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

export default TaskColumn;

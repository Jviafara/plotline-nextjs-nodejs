import { Task as TaskType } from "@/lib/types";
import { useDrag } from "react-dnd";
import { format } from "date-fns";
import Image from "next/image";
import PriorityTag from "../atoms/PriorityTag";
import { EllipsisVertical, MessageSquareMore } from "lucide-react";

type Props = { task: TaskType };

const Task = ({ task }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagSplit = task.tags ? task.tags.split(",") : [];
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedEndDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";
  const commentsCount = (task.comments && task.comments.length) || 0;

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`dark:bg-dark-secondary mb-4 rounded-md bg-white shadow ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                >
                  {tag.trim()}
                </div>
              ))}
            </div>
          </div>
          <button className="felx h-6 w-4 shrink-0 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>

        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedEndDate && <span>{formattedEndDate}</span>}
        </div>
        <p className="to-gray-600 text-xs dark:text-neutral-500">
          {task.description}
        </p>
        <div className="dark:border-stroke-dark mt-4 border-t border-gray-200">
          {/* Users */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex -space-x-1.5 overflow-hidden">
              {task.assignee && (
                <Image
                  key={task.assignee.userId}
                  src={`/${task.assignee.profilePictureUrl!}`}
                  alt={task.assignee.username}
                  width={30}
                  height={30}
                  className="dark:border-dark-secondary h-8 w-8 rounded-full border-2 border-white object-cover"
                />
              )}
              {task.author && (
                <Image
                  key={task.author.userId}
                  src={`/${task.author.profilePictureUrl!}`}
                  alt={task.author.username}
                  width={30}
                  height={30}
                  className="dark:border-dark-secondary h-8 w-8 rounded-full border-2 border-white object-cover"
                />
              )}
            </div>
            <div className="flex items-center text-gray-500 dark:text-neutral-500">
              <MessageSquareMore size={20} />
              <span className="ml-1 text-sm dark:text-neutral-500">
                {commentsCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;

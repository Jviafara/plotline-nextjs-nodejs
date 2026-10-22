import { Task } from "@/lib/types";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="dark:bg-dark-secondary mb-3 rounded bg-white p-4 shadow dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong className="uppercase">Attachments:</strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="h-auto w-full rounded-t-md"
              />
            )}
          </div>
        </div>
      )}
      <p>
        <strong className="uppercase">id: </strong>
        {task.id}
      </p>
      <p>
        <strong className="uppercase">TITLE: </strong>
        {task.title}
      </p>
      <p>
        <strong className="uppercase">Description: </strong>
        {task.description || "No description Provided"}
      </p>
      <p>
        <strong className="uppercase">status: </strong>
        {task.status}
      </p>
      <p>
        <strong className="uppercase">priotity: </strong>
        {task.priority}
      </p>
      <p>
        <strong className="uppercase">tags: </strong>
        {task.tags || "No tags"}
      </p>
      <p>
        <strong className="uppercase">start date: </strong>
        {task.startDate ? format(new Date(task.startDate), "P") : "Not Set"}
      </p>
      <p>
        <strong className="uppercase">End date: </strong>
        {task.dueDate ? format(new Date(task.dueDate), "P") : "Not Set"}
      </p>
      <p>
        <strong className="uppercase">author: </strong>
        {task.author ? task.author.username : "Unknown"}
      </p>
      <p>
        <strong className="uppercase">assignee: </strong>
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
    </div>
  );
};

export default TaskCard;

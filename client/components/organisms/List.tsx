import { useGetTasksQuery } from "@/lib/redux/api";
import Header from "../molecules/Header";
import { Task } from "@/lib/types";
import TaskCard from "../molecules/TaskCard";
import { PlusSquare } from "lucide-react";

type Props = {
  id: number;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const List = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error Acurred while fetching tasks!</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          title="List"
          buttonComponent={
            <button
              onClick={() => setIsModalNewTaskOpen(true)}
              className="bg-blue-primary flex items-center rounded-md px-3 py-2 text-white hover:bg-blue-600"
            >
              <PlusSquare className="mr-2 h-5 w-5" />
              Add Task
            </button>
          }
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default List;

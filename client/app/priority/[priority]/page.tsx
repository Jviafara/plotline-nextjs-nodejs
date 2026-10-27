"use client";

import { use, useState } from "react";
import { useGetTaskByUserIdQuery } from "@/lib/redux/api";
import { useAppSelector } from "@/app/redux";
import ModalNewTask from "@/components/organisms/ModalNewTask";
import Header from "@/components/molecules/Header";
import TaskCard from "@/components/molecules/TaskCard";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DataGridClassNames } from "@/lib/constansts";
import { dataGridSxStyles } from "@/lib/utils";
import { Task } from "@/lib/types";

type Props = {
  params: Promise<{ priority: string }>;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-200 px-2 text-xs leading-5 font-semibold text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "End Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 130,
    renderCell: (params) => params.value?.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.username || "Unassigned",
  },
];

const PriorityPage = ({ params }: Props) => {
  const { priority } = use(params);

  const [view, setView] = useState("list");
  const [isModalNewtaskOpen, setIsModalNewtaskOpen] = useState(false);
  const userId = 2;
  const {
    data: tasks,
    isLoading,
    isError: isTaskError,
  } = useGetTaskByUserIdQuery(userId || 0, { skip: userId === null });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const filteredtasks = tasks?.filter(
    (task: Task) =>
      task.priority?.toLocaleLowerCase() === priority.toLocaleLowerCase(),
  );

  if (isTaskError || !tasks) return <div>Error retreiving user tasks!</div>;

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewtaskOpen}
        onClose={() => setIsModalNewtaskOpen(false)}
      />
      <Header
        title={`Priority Page - ( ${priority.toLocaleUpperCase()} )`}
        buttonComponent={
          <button
            onClick={() => setIsModalNewtaskOpen(true)}
            className="mr-3 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Add Task
          </button>
        }
      />
      <div className="felx mb-4 justify-start">
        <button
          onClick={() => setView("list")}
          className={`px-4 py-2 ${view === "list" ? "bg-gray-300" : "bg-white"} cursor-pointer rounded-l`}
        >
          List
        </button>
        <button
          onClick={() => setView("table")}
          className={`px-4 py-2 ${view === "table" ? "bg-gray-300" : "bg-white"} cursor-pointer rounded-r`}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        <div className="grod grid-cols-1 gap-4">
          {filteredtasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredtasks && (
          <div className="w-full">
            <DataGrid
              rows={filteredtasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={DataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default PriorityPage;

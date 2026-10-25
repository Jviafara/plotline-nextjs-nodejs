"use client";

import { useGetProjectsQuery, useGetTasksQuery } from "@/lib/redux/api";
import { useAppSelector } from "../redux";
import { Priority, Project, Task } from "@/lib/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/molecules/Header";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartColors, dataGridSxStyles } from "@/lib/utils";
import { COLORS, DataGridClassNames } from "@/lib/constansts";

const HomePage = () => {
  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useGetProjectsQuery();
  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("1") });
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (tasksLoading || projectsLoading) return <div>Loading...</div>;
  if (tasksError || projectsError || !tasks || !projects)
    return <div>An error Acurred while fetching Data!</div>;

  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {},
  );

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  const statusCount = projects.reduce(
    (acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Completed" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  const taskColumns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
  ];

  return (
    <div className="h-full w-full bg-gray-100 p-8 dark:bg-transparent">
      <Header title="Project Management Dashboard" />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div className="dark:bg-dark-secondary rounded-lg bg-white p-4 shadow">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution}>
              <CartesianGrid
                strokeDasharray={"3 3"}
                stroke={chartColors(isDarkMode).barGrid}
              />
              <XAxis dataKey={"name"} stroke={chartColors(isDarkMode).text} />
              <YAxis stroke={chartColors(isDarkMode).text} />
              <Tooltip
                contentStyle={{
                  width: "min-content",
                  height: "min-content",
                }}
              />
              <Legend />
              <Bar dataKey={"count"} fill={chartColors(isDarkMode).bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="dark:bg-dark-secondary rounded-lg bg-white p-4 shadow">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Projects Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey={"count"} data={projectStatus} fill="#82CA9D" label>
                {projectStatus.map((entryt, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  width: "min-content",
                  height: "min-content",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="dark:bg-dark-secondary rounded-lg bg-white p-4 shadow md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Your Tasks
          </h3>
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={taskColumns}
              checkboxSelection
              loading={tasksLoading}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={DataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

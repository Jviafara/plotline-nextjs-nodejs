import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/lib/redux/api";
import Header from "../molecules/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DataGridClassNames } from "@/lib/constansts";
import { dataGridSxStyles } from "@/lib/utils";
import { PlusSquare } from "lucide-react";

type Props = {
  id: number;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
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

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error Acurred while fetching tasks!</div>;

  return (
    <div className="h-135 w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          title="Table"
          isSmallText
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
      <DataGrid
        rows={tasks || []}
        columns={columns}
        sx={dataGridSxStyles(isDarkMode)}
        className={DataGridClassNames}
      />
    </div>
  );
};

export default TableView;

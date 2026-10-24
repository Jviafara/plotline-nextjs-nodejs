"use client";
import { useAppSelector } from "../redux";
import Header from "@/components/molecules/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridSxStyles } from "@/lib/utils";
import { DataGridClassNames } from "@/lib/constansts";
import { useGetTeamsQuery } from "@/lib/redux/api";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Team ID",
    width: 100,
  },
  {
    field: "teamName",
    headerName: "Team Name",
    width: 200,
  },
  {
    field: "productOwnerUsername",
    headerName: "Product Owner",
    width: 200,
  },
  {
    field: "productManagerUsername",
    headerName: "Product manager",
    width: 200,
  },
];

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !teams)
    return <div>An error Acurred while fetching users!</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header title="Users" />
      <div className="h-162.5 w-full">
        <DataGrid
          getRowId={(row) => row.id}
          rows={teams || []}
          columns={columns}
          pagination
          className={DataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;

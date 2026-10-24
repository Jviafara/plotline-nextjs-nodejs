"use client";
import { useGetUsersQuery } from "@/lib/redux/api";
import { useAppSelector } from "../redux";
import Header from "@/components/molecules/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { dataGridSxStyles } from "@/lib/utils";
import { DataGridClassNames } from "@/lib/constansts";

const columns: GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
    width: 100,
  },
  {
    field: "username",
    headerName: "Username",
    width: 150,
  },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="h-9 w-9">
        <Image
          src={`/${params.value}`}
          alt="profile picture"
          width={100}
          height={20}
          className="h-full rounded-full object-cover"
        />
      </div>
    ),
  },
];

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !users)
    return <div>An error Acurred while fetching users!</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header title="Users" />
      <div className="h-162.5 w-full">
        <DataGrid
          getRowId={(row) => row.userId}
          rows={users || []}
          columns={columns}
          className={DataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Users;

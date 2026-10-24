export const dataGridSxStyles = (isDarkMode: boolean) => {
  const backgroundColor = isDarkMode ? "#1d1f21" : "#ffffff";
  const borderColor = isDarkMode ? "#2d3135" : "#e5e7eb";
  const textColor = isDarkMode ? "#e5e7eb" : "#111827";

  return {
    color: textColor,
    backgroundColor,
    borderColor,
    "& .MuiDataGrid-columnHeaders": {
      color: textColor,
      backgroundColor,
      borderBottom: `1px solid ${borderColor}`,
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor,
    },
    "& .MuiDataGrid-columnHeaders .MuiDataGrid-filler, & .MuiDataGrid-columnHeaders .MuiDataGrid-scrollbarFiller":
      {
        backgroundColor,
      },
    "& .MuiDataGrid-cell": {
      borderBottom: `1px solid ${borderColor}`,
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: isDarkMode ? "#2d3135" : "#f9fafb",
    },
    "& .MuiDataGrid-row.Mui-selected": {
      backgroundColor: isDarkMode
        ? "rgba(2, 117, 255, 0.2)"
        : "rgba(2, 117, 255, 0.08)",
    },
    "& .MuiDataGrid-row.Mui-selected:hover": {
      backgroundColor: isDarkMode
        ? "rgba(2, 117, 255, 0.28)"
        : "rgba(2, 117, 255, 0.12)",
    },
    "& .MuiDataGrid-footerContainer": {
      color: textColor,
      borderTop: `1px solid ${borderColor}`,
    },
    "& .MuiTablePagination-root, & .MuiDataGrid-menuIconButton, & .MuiDataGrid-sortIcon, & .MuiSvgIcon-root":
      {
        color: textColor,
      },
    "& .MuiDataGrid-withBorderColor": {
      borderColor,
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
  };
};

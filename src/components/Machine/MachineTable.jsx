import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getMachineDetailsList } from "../../api/machine-service";
import { machineTableColumns } from "../../utils/table-columns";

export default function MachineTable() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getTableData = async () => {
    try {
      const response = await getMachineDetailsList();
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching Machines:", error);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  const columns = [
    ...machineTableColumns,
    {
      field: "action",
      headerName: "Action",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <IconButton size="small">
          <MoreVertIcon fontSize="24px" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">MACHINES</Typography>
        <Button
          variant="contained"
          startIcon={<Icon icon={"mingcute:add-line"} />}
          onClick={() => navigate("/machines/add")}
        >
          New Machine
        </Button>
      </Box>

      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) => row.mcnId}
        pagination
        paginationModel={{
          page: currentPage - 1,
          pageSize: rowsPerPage,
        }}
        onPaginationModelChange={(model) => {
          setCurrentPage(model.page + 1);
          setRowsPerPage(model.pageSize);
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        localeText={{
          noRowsLabel: "No Machines",
        }}
      />
    </Box>
  );
}

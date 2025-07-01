import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getTicketDetailsList } from "../../api/ticket-service";
import { ticketTableColumns } from "../../utils/table-columns";

export default function TicketTable() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    try {
      const response = await getTicketDetailsList();
      console.log("Received data:", response.data.data);
      setTableData(response.data.data);
    } catch (error) {
      console.error("Error fetching Tickets:", error);
    }
  };

  const columns = [
    ...ticketTableColumns,
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
        <Typography variant="h5">TICKETS</Typography>
        <Button
          variant="contained"
          startIcon={<Icon icon={"mingcute:add-line"} />}
          onClick={() => navigate("/tickets/add")}
        >
          New Ticket
        </Button>
      </Box>

      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) => row.tktId}
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
          noRowsLabel: "No Tickets",
        }}
      />
    </Box>
  );
}

import { formatDate } from "./date-format";

export const customerTableColumns = [
  {
    field: "custId",
    headerName: "ID",
    sortable: true,
    width: 86,
  },
  {
    field: "custName",
    headerName: "Customer",
    sortable: true,
    width: 300,
  },
  {
    field: "ctcPersName",
    headerName: "Contact Person",
    sortable: false,
    width: 300,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    width: 300,
  },
  {
    field: "ctcPh",
    headerName: "Mobile No",
    sortable: false,
    width: 300,
  },
];

export const productTableColumns = [
  {
    field: "prdId",
    headerName: "ID",
    sortable: true,
    width: 86,
  },
  {
    field: "prdCode",
    headerName: "Product Code",
    sortable: true,
    width: 300,
  },
  {
    field: "prdName",
    headerName: "Product",
    sortable: true,
    width: 300,
  },
  {
    field: "prdModel",
    headerName: "Model",
    sortable: false,
    width: 300,
  },
  {
    field: "prdBrand",
    headerName: "Brand",
    sortable: true,
    width: 300,
  },
];

export const machineTableColumns = [
  {
    field: "mcnId",
    headerName: "ID",
    sortable: true,
    width: 86,
  },
  {
    field: "mcnCode",
    headerName: "Machine Code",
    sortable: true,
    width: 200,
  },
  {
    field: "mcnSno",
    headerName: "Serial No",
    sortable: false,
    width: 300,
  },
  {
    field: "prdName",
    headerName: "Product",
    sortable: false,
    width: 300,
  },

  {
    field: "custName",
    headerName: "Customer",
    sortable: false,
    width: 400,
  },
];

export const employeeTableColumns = [
  {
    field: "empId",
    headerName: "ID",
    sortable: true,
    width: 86,
  },
  {
    field: "empCode",
    headerName: "Employee Code",
    sortable: true,
    width: 180,
  },
  {
    field: "empName",
    headerName: "Employee",
    sortable: true,
    width: 200,
  },
  {
    field: "designation",
    headerName: "Designation",
    sortable: true,
    width: 200,
  },
  {
    field: "locAssigned",
    headerName: "Assigned Location",
    sortable: false,
    width: 220,
  },
  {
    field: "empEmail",
    headerName: "Email",
    sortable: false,
    width: 200,
  },
  {
    field: "empPhNo",
    headerName: "Mobile No",
    sortable: false,
    width: 200,
  },
];

export const ticketTableColumns = [
  {
    field: "tktId",
    headerName: "ID",
    sortable: true,
    width: 86,
  },
  {
    field: "tktCode",
    headerName: "Ticket Code",
    sortable: true,
    width: 180,
  },
  {
    field: "createdOn",
    headerName: "Created On",
    sortable: true,
    width: 200,
    renderCell: (params) => formatDate(params.row?.createdOn),
  },
  {
    field: "prblmDesc",
    headerName: "Problem Description",
    sortable: false,
    width: 620,
  },
  {
    field: "closedOn",
    headerName: "Closed On",
    sortable: true,
    width: 200,
    renderCell: (params) => formatDate(params.row?.closedOn),
  },
];

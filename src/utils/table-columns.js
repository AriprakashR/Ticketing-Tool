// utils/table-columns.js

export const customerTableColumns = [
  {
    field: "custId",
    headerName: "ID",
    sortable: true,
    width: 90,
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
    width: 100,
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
    width: 100,
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

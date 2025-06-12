// utils/table-columns.js

export const customerTableColumns = [
  {
    field: "cusId",
    headerName: "ID",
    sortable: true,
    width: 80,
  },
  {
    field: "custName",
    headerName: "Customer Name",
    sortable: true,
    width: 200,
  },
  {
    field: "ctcPersName",
    headerName: "Contact Person",
    sortable: false,
    width: 180,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    width: 280,
  },
  {
    field: "ctcPh",
    headerName: "Mobile No",
    sortable: false,
    width: 200,
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
    width: 150,
  },
  {
    field: "prdName",
    headerName: "Product Name",
    sortable: true,
    width: 200,
  },

  {
    field: "prdDescription",
    headerName: "Description",
    sortable: false,
    width: 850,
  },
];

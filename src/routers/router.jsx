import RootLayout from "../layouts/RootLayout";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import LoginForm from "../components/Auth/LoginForm";
import ResponsiveBox from "../components/Layouts/ResponsiveBox";
import CompanyForm from "../components/Company/CompanyForm";
import BankForm from "../components/Company/BankForm";
import Customers from "../pages/Customers";
import CustomerForm from "../components/Customer/CustomerForm";
import Employees from "../pages/Employees";
import EmployeeForm from "../components/Employee/EmployeeForm";
import Products from "../pages/Products";
import ProductForm from "../components/Product/ProductForm";
import Machines from "../pages/Machines";
import MachineForm from "../components/Machine/MachineForm";
import Tickets from "../pages/Tickets";
import TicketForm from "../components/Ticket/TicketForm";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [{ path: "/", element: <LoginForm /> }],
      },
      {
        path: "/",
        element: <PrivateLayout />,
        children: [
          { path: "/dashboard", element: <ResponsiveBox /> },
          { path: "/company/add", element: <CompanyForm /> },
          { path: "/bank/add", element: <BankForm /> },
          { path: "/customers", element: <Customers /> },
          { path: "/customers/add", element: <CustomerForm /> },
          { path: "/employees", element: <Employees /> },
          { path: "/employees/add", element: <EmployeeForm /> },
          { path: "/products", element: <Products /> },
          { path: "/products/add", element: <ProductForm /> },
          { path: "/machines", element: <Machines /> },
          { path: "/machines/add", element: <MachineForm /> },
          { path: "/tickets", element: <Tickets /> },
          { path: "tickets/add", element: <TicketForm /> },
        ],
      },
    ],
  },
];

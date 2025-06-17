import RootLayout from "../layouts/RootLayout";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import LoginForm from "../components/Auth/LoginForm";
import ResponsiveBox from "../components/Layouts/ResponsiveBox";
import CompanyForm from "../components/Company/CompanyForm";
import BankForm from "../components/Company/BankForm";
import Customers from "../pages/Customers";
import CustomerForm from "../components/Customer/CustomerForm";
import EmployeeForm from "../components/Employee/EmployeeForm";
import Products from "../pages/Products";
import ProductForm from "../components/Product/ProductForm";
import Machine from "../pages/Machine";
import MachineForm from "../components/Machine/MachineForm";

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
          { path: "/employee/add", element: <EmployeeForm /> },
          { path: "/products", element: <Products /> },
          { path: "/products/add", element: <ProductForm /> },
          { path: "/machines", element: <Machine /> },
          { path: "/machines/add", element: <MachineForm /> },
        ],
      },
    ],
  },
];

import RootLayout from "../layouts/RootLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import ResponsiveBox from "../components/Layouts/ResponsiveBox";
import CompanyForm from "../components/Company/CompanyForm";
import BankForm from "../components/Company/BankForm";
import CustomerForm from "../components/Customer/CustomerForm";
import EmployeeForm from "../components/Employee/EmployeeForm";
import ProductForm from "../components/Product/ProductForm";
import MachineForm from "../components/Machine/MachineForm";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <PrivateLayout />,
        children: [
          { path: "/", element: <ResponsiveBox /> },
          { path: "/company/add", element: <CompanyForm /> },
          { path: "/bank/add", element: <BankForm /> },
          { path: "/customer/add", element: <CustomerForm /> },
          { path: "/employee/add", element: <EmployeeForm /> },
          { path: "/product/add", element: <ProductForm /> },
          { path: "/machine/add", element: <MachineForm /> },
        ],
      },
    ],
  },
];

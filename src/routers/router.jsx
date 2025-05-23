import RootLayout from "../layouts/RootLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import ResponsiveBox from "../components/Layouts/ResponsiveBox";
import CompanyForm from "../components/Company/CompanyForm";

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
        ],
      },
    ],
  },
];

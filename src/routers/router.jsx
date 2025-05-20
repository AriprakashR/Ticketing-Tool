import RootLayout from "../layouts/RootLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import ResponsiveBox from "../components/Layouts/ResponsiveBox";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <PrivateLayout />,
        children: [{ path: "/", element: <ResponsiveBox /> }],
      },
    ],
  },
];

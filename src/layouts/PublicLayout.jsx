import { Outlet } from "react-router";
import Header from "../components/Layouts/Header";
const PublicLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default PublicLayout;

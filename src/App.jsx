import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routers/router";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;

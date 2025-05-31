import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routers/router";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </>
  );
}

export default App;

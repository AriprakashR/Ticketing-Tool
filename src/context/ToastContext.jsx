import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import Toast from "../components/UI/Toast";
import { setToastFunction } from "../utils/toastService";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = useCallback((message, severity = "success") => {
    setToast({ open: true, message, severity });
  }, []);

  useEffect(() => {
    setToastFunction(showToast);
  }, [showToast]);

  const handleClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

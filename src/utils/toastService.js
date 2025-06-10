let showToast;

export const setToastFunction = (fn) => {
  showToast = fn;
};

export const toast = {
  success: (message) => showToast?.(message, "success"),
  error: (message) => showToast?.(message, "error"),
  warning: (message) => showToast?.(message, "warning"),
  info: (message) => showToast?.(message, "info"),
};

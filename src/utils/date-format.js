export const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle null or undefined values

  const date = new Date(dateString);

  // Format day as two digits
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

  // Format month as abbreviated name (e.g., Mar)
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);

  // Format year as two digits
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);

  return `${day}-${month}-${year}`; // Format: DD-MMM-YY
};

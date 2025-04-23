import { format, differenceInMilliseconds } from "date-fns";

export const formatDate = (dateString, formatStr = "dd/MM/yyyy HH:mm") => {
  if (!dateString) return "N/A";
  try {
    return format(new Date(dateString), formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

export const calculateDuration = (startDate, endDate = new Date()) => {
  if (!startDate) return "N/A";

  try {
    // Convert to Date objects if strings
    const start = startDate instanceof Date ? startDate : new Date(startDate);
    const end = endDate instanceof Date ? endDate : new Date(endDate);

    // Get difference in milliseconds
    const diffMs = differenceInMilliseconds(end, start);

    // Convert to appropriate unit
    const seconds = Math.floor(diffMs / 1000);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""}`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days} day${days !== 1 ? "s" : ""}`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months} month${months !== 1 ? "s" : ""}`;
    }

    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? "s" : ""}`;
  } catch (error) {
    console.error("Error calculating duration:", error);
    return "Invalid Duration";
  }
};

export const getPositionDuration = (stock) => {
  if (!stock || !stock.openDate) return "N/A";

  const startDate = new Date(stock.openDate);
  const endDate = stock.isOpen ? new Date() : new Date(stock.updatedAt);

  return calculateDuration(startDate, endDate);
};

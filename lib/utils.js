import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const customFormat = (date, formatStr) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (formatStr === "PPP") {
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  // Extend with other format cases if needed
  return date.toLocaleDateString();
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: any) => {
  return dayjs(date).format("DD MMM YYYY");
};
export const formatTime = (date: any) => {
  return dayjs(date).format("h:s A");
};

export const formatDateTime = (date: any) => {
  return dayjs(date).format("h:s A - DD MMM YYYY");
};

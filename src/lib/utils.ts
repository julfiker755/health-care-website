import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const RandomString = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// dateTime
export const formatDate = (date: any) => {
  return dayjs(date).format("DD MMM YYYY");
};
export const formatTime = (date: any) => {
  return dayjs(date).format("h:s A");
};

export const formatDateTime = (date: any) => {
  return dayjs(date).format("h:s A - DD MMM YYYY");
};

// fromData
export const modifyPayload = (values: any) => {
  const obj = { ...values };
  const file = obj["file"];
  delete obj["file"];
  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append("data", data);
  formData.append("file", file);
  return formData;
};

// LocalStroage
export const setLocalStroage = (key: string, token: string) => {
  if (!key || typeof window === "undefined") return "";
  return localStorage.setItem(key, token);
};

export const getLocalStroage = (key: string) => {
  if (!key || typeof window === "undefined") return "";
  return localStorage.getItem(key);
};

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function httpGet(theUrl: string) {
  return fetch(theUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

const nth = (d: number) => {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

function dayOfWeek(date: Date) {
  return date.toLocaleDateString(navigator.language, {
    weekday: "long",
  });
}

function timeOfDay(date: Date) {
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function dayOfWeekNumOfMonth(date: Date) {
  // should return Monday 1st, Tuesday 2nd, etc.
  return (
    date.toLocaleDateString(navigator.language, {
      weekday: "long",
      day: "numeric",
    }) + nth(date.getDate())
  );
}

export { httpGet, dayOfWeek, dayOfWeekNumOfMonth, timeOfDay };

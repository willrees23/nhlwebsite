import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { nhlFont } from "./fonts";

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

const nthalize = (num: number) => {
  const str = nth(num);
  return `${num}${str}`;
};

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

function getLastSundayDate() {
  const date = new Date();

  const lastSunday = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay(),
  );

  return lastSunday;
}

function getDateInAmericanFormat(date: Date) {
  // fullyear/month/day
  return date.toISOString().split("T")[0];
}

function getLastSunday() {
  const lastSunday = getLastSundayDate();
  // get the last sunday in string format with 0s before single digit numbers
  const lastSundayString = `${lastSunday.getFullYear()}-${
    lastSunday.getMonth() + 1 < 10
      ? `0${lastSunday.getMonth() + 1}`
      : lastSunday.getMonth() + 1
  }-${
    lastSunday.getDate() < 10
      ? `0${lastSunday.getDate()}`
      : lastSunday.getDate()
  }`;

  return lastSundayString;
}

function isWithinNextHours(date: Date, hours: number) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return diff < hours * 60 * 60 * 1000;
}

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
  const now = new Date();
  if (now.getDate() - 1 === date.getDate()) {
    return "Yesterday";
  }
  if (now.getDate() === date.getDate()) {
    return "Today";
  }
  if (now.getDate() + 1 === date.getDate()) {
    return "Tomorrow";
  }
  return (
    date.toLocaleDateString(navigator.language, {
      weekday: "long",
      day: "numeric",
    }) + nth(date.getDate())
  );
}

function nhlClass() {
  return "font-nhl " + nhlFont.variable;
}

function goalStrengthFormatted(strength: string) {
  strength = strength.toUpperCase();
  return strength == "EV"
    ? "Even Strength"
    : strength == "PP"
      ? "Power Play"
      : strength == "SH"
        ? "Short Handed"
        : strength;
}

export {
  goalStrengthFormatted,
  getDateInAmericanFormat,
  nthalize,
  nhlClass,
  httpGet,
  dayOfWeek,
  dayOfWeekNumOfMonth,
  timeOfDay,
  isWithinNextHours,
  getLastSunday,
  getLastSundayDate,
};

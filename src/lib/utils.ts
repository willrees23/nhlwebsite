import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { nhlFont } from "./fonts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import isYesterday from "dayjs/plugin/isYesterday";

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

function getUntil(date: Date, inText = false) {
  const newDate = dayjs(date);
  const now = dayjs();
  dayjs.extend(relativeTime);
  return newDate.from(now, inText);
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

function dateIsYesterday(date: Date) {
  dayjs.extend(isYesterday);
  const dateJs = dayjs(date);
  return dateJs.isYesterday();
}

function dateIsTomorrow(date: Date) {
  dayjs.extend(isTomorrow);
  const dateJs = dayjs(date);
  return dateJs.isTomorrow();
}

function dateIsToday(date: Date) {
  dayjs.extend(isToday);
  const dateJs = dayjs(date);
  return dateJs.isToday();
}

function dayOfWeekNumOfMonth(date: Date) {
  dayjs.extend(isToday);
  dayjs.extend(isTomorrow);
  dayjs.extend(isYesterday);
  const dateJs = dayjs(date);
  if (dateJs.isToday()) {
    return "Today";
  }
  if (dateJs.isTomorrow()) {
    return "Tomorrow";
  }
  if (dateJs.isYesterday()) {
    return "Yesterday";
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
  dateIsToday,
  dateIsTomorrow,
  dateIsYesterday,
  goalStrengthFormatted,
  getDateInAmericanFormat,
  nthalize,
  nhlClass,
  getUntil,
  httpGet,
  dayOfWeek,
  dayOfWeekNumOfMonth,
  timeOfDay,
  isWithinNextHours,
  getLastSunday,
  getLastSundayDate,
};

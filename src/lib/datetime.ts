interface DateTime {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
}

export const getDateTime = (date: Date): DateTime => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDay().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  return { year, month, day, hour, minute, second };
};

export function changeCurrency(money) {
  return Math.ceil(money / 1000000, 4);
}

export function changeDateTimeFormat(utcTimeString) {
  const utcDate = new Date(utcTimeString);

  const formatedTime = utcDate.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formatedTime;
}

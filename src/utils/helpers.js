export function changeCurrency(money) {
  const result = money / 1000000;
  const decimalPart = result % 1; // Get the decimal part

  if (decimalPart > 0) {
    return result.toFixed(1); // If there is a decimal part, format with one digit after the decimal point
  } else {
    return result.toFixed(0); // If there is no decimal part, format without any digits after the decimal point
  }
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
    // second: "2-digit",
  });

  return formatedTime;
}

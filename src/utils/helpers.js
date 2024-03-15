export function changeCurrency(money) {
  return Math.ceil(money / 1000000, 4);
}

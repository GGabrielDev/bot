export const formatTimestamp = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = padZero(date.getMonth() + 1);
  const dd = padZero(date.getDate());
  const hh = padZero(date.getHours());
  const min = padZero(date.getMinutes());
  const ss = padZero(date.getSeconds());
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};

const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};


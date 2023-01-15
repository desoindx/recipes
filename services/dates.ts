export const getFrontDate = (startDate: string): string => {
  const idDate = new Date(startDate);
  idDate.setDate(idDate.getDate() - 7);
  return `${String(idDate.getDate()).padStart(2, "0")}/${String(
    idDate.getMonth() + 1
  ).padStart(2, "0")}/${idDate.getFullYear()}`;
};

export const getBackDate = (startDate?: string): string => {
  let date;
  if (!startDate || startDate === "now") {
    date = new Date();
    date.setDate(date.getDate() + 7);
  } else {
    date = new Date(startDate);
  }
  date.setDate(date.getDate() + 1);

  return date.toISOString().split('T')[0];
};

export const getLocalStorageItem = (date: Date): string => {
  return `recipes-${date.toDateString()}`;
};

export const getLastYearMonths = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let monthCounter = 0;
  const lastYearMonths = months.map(() => {
    const monthNumber = currentMonth + 1 - monthCounter;
    monthCounter++;
    return {
      month: monthNumber < 1 ? 12 + monthNumber : monthNumber,
      year: monthNumber < months[0] ? currentYear - 1 : currentYear,
    };
  });
  return lastYearMonths;
};

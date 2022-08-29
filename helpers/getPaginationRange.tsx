function getRange(pageNum, totalPages) {
  let minNumber = pageNum - 5;
  let maxNumber = pageNum + 5;
  let diff = 0;

  if (minNumber < 1) {
    diff = 1 - minNumber;
    console.log(minNumber, 'minnumber');
  }
  minNumber = minNumber + diff;
  maxNumber = maxNumber + diff;

  return {
    minNumber,
    maxNumber,
  };
}

export default getRange;

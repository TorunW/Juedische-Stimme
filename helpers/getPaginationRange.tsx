function getPaginationRange(pageNum: number, totalPages: number) {
  let minNumber = pageNum - 4;
  let maxNumber = pageNum + 5;
  let diff = 0;

  if (minNumber < 1) {
    diff = 1 - minNumber;
    console.log(minNumber, 'minnumber');
  }
  minNumber = minNumber + diff;
  maxNumber = maxNumber + diff;

  if (maxNumber > totalPages){
    diff = maxNumber - totalPages;
    minNumber = minNumber - diff > 0 ? minNumber - diff : 0;
    maxNumber = maxNumber - diff
  }

  return {
    minNumber,
    maxNumber,
  };
}

export default getPaginationRange;

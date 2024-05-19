export type Item = {
  startPx: number;
  endPx: number;
};

export function mergeOverlappingArray(inputArr: Item[]): Item[] {
  let hasInvalidItem = inputArr.some((item) => item.startPx > item.endPx);
  if (hasInvalidItem) {
    throw "Invalid input";
  }
  if (inputArr.length < 2) {
    return inputArr;
  }
  // Sort the array of item on the startPx
  inputArr.sort((a, b) => a.startPx - b.startPx);
  const outputArr: Item[] = [];
  let { startPx, endPx } = inputArr[0];
  for (let i = 1; i < inputArr.length; i++) {
    let curStartPx = inputArr[i].startPx,
      curEndPx = inputArr[i].endPx;

    if (curStartPx <= endPx) {
      // overlapping items, adjust the 'endPx'
      endPx = Math.max(curEndPx, endPx);
    } else {
      // non-overlapping item, add the previous item and reset
      outputArr.push({ startPx, endPx });
      startPx = curStartPx;
      endPx = curEndPx;
    }
  }
  // add the last item
  outputArr.push({ startPx, endPx });
  return outputArr;
}

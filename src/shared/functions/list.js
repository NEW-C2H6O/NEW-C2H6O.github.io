/**
 * @description
 * 불리언 배열에서 true가 하나만 있는 경우 해당 인덱스를 반환하고, 그렇지 않은 경우 null을 반환합니다.
 * @param {Array<Boolean>} arr
 * @returns {Number|null}
 * @example
 * const arr = [true, false, true, false];
 * const result = getOnlyItemIdx(arr);
 * console.log(result); // 0
 * @example
 * const arr = [false, false, false, false];
 * const result = getOnlyItemIdx(arr);
 * console.log(result); // null
 */
function getOnlyItemIdx(arr) {
  const trueCount = arr.filter(Boolean).length;

  if (trueCount === 1) return arr.indexOf(true);
  else return null;
}

export { getOnlyItemIdx };

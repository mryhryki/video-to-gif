export const getIntegerInRange = (target: unknown, min: number, max: number): number => {
  if (typeof target !== "number") {
    return min;
  } else if (isNaN(target)) {
    return min;
  } else if (target < min) {
    return min;
  } else if (target > max) {
    return max;
  }
  return target;
};

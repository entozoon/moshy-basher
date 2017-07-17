const constrain = (value, min, max) => {
  // I know I can write this better but, blergh
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

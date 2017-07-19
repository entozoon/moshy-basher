const constrain = (value, min, max) => {
  // I know I can write this better but, blergh
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

// Vector
//      B
//     /|
//   M/ |
//   /  y  Where M is 1, right?
//  /   |
// A--x--
//
const vectorBetweenPointsOfMagnitudeOne = (a, b) => {
  const x = b.x - a.x,
    y = b.y - a.y;

  // if y is 0, x max of 1 ?

  const magnitude = Math.sqrt(x * x + y * y);

  const vector = {
    x: x / magnitude,
    y: y / magnitude
  };

  return vector;
};

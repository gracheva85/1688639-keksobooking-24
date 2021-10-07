const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
  return result;
};

const getAnyRandomNumber = (min, max, afterPoint) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = (Math.random() * (upper - lower) + lower).toFixed(afterPoint);
  return result;
};

const getRandomLength = (array) => {
  const copyArray = array.slice();
  copyArray.length = getRandomPositiveInteger (1, array.length-1);
  return copyArray;
};

const getRandomElement = (array) =>
  array[getRandomPositiveInteger (0, array.length-1)];

const shuffle = (array) => {
  for (let nbr = array.length - 1; nbr > 0; nbr--) {
    const num = Math.floor(Math.random() * (nbr + 1));
    const swat = array[num];
    array[num] = array[nbr];
    array[nbr] = swat;
  }
  return array;
};

export {getRandomPositiveInteger, getAnyRandomNumber, getRandomLength, getRandomElement, shuffle};

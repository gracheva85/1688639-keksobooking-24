// Выполнено на базе статьи: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt (min, max) {
  const integer= Math.floor(Math.random() * (max - min + 1) + min);
  return (min <0 || min >= max) ? false : integer;
}
getRandomInt (1, 3);

function getAnyRandomNumber (min, max, afterPoint) {
  const randomNumber = (Math.random() * (max - min) + min).toFixed(afterPoint);
  return (min < 0 || min >= max) ? false : randomNumber;
}
getAnyRandomNumber (1, 2, 3);

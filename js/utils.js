const changeTitleByNumber = (number, titles) => {
  const CASES = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : CASES[(number%10<5)?number%10:5] ];
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

export {changeTitleByNumber, isEscapeKey, isEnterKey};

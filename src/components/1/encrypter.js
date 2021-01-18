import {
  subtract,
  concat,
  map,
  length,
  partialRight,
  findIndex,
  equals,
  nth,
  ifElse,
  always,
  join,
  toUpper,
} from "ramda";
import { pipe } from "rxjs";

export const CYRILLIC = [
  "а",
  "б",
  "в",
  "г",
  "д",
  "е",
  "ё",
  "ж",
  "з",
  "и",
  "й",
  "к",
  "л",
  "м",
  "н",
  "о",
  "п",
  "р",
  "с",
  "т",
  "у",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
  "ь",
  "ы",
  "ъ",
  "э",
  "ю",
  "я",
];

const getCharIndex = (arr) => pipe(equals, partialRight(findIndex, [arr]));

const getCharByIndex = (arr) =>
  pipe(subtract(length(arr) / 2 - 1), partialRight(nth, [arr]));

const makeEncrypter = (alphabet) => {
  const alphabetWithUpperChars = pipe(map(toUpper), concat(alphabet))(alphabet);

  const encryptChar = (char) =>
    pipe(
      getCharIndex(alphabetWithUpperChars),
      ifElse(equals(-1), always(char), getCharByIndex(alphabetWithUpperChars))
    )(char);

  const encryptText = pipe(map(encryptChar), join(""));

  return {
    encryptText,
  };
};

export default makeEncrypter(CYRILLIC);

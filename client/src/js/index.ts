// 1. First duplicate letter
const firstDuplicateLetter = (str: string) => {
  const arr = str.split("");

  const res: Record<string, number> = {};

  arr.forEach((letter) => {
    res[letter] = res[letter] ? res[letter] + 1 : 0;
  });
  return res;
};

firstDuplicateLetter("abca"); // a
firstDuplicateLetter("abcdefe"); // e
firstDuplicateLetter("abcde"); // null

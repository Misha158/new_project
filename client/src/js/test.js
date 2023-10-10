// 1. First duplicate letter
// const firstDuplicateLetter = (str) => {
//   const res = {};
//
//   for (let i = 0; i < str.length; i++) {
//     const currentLetter = str[i];
//     if (res[currentLetter] === 1) {
//       return currentLetter;
//     }
//
//     res[currentLetter] = res[currentLetter] ? res[currentLetter] + 1 : 1;
//   }
//
//   return null;
// };
//
// console.log(firstDuplicateLetter("abca")); // a
// console.log(firstDuplicateLetter("abcdefe")); // e
// console.log(firstDuplicateLetter("abcde")); // null

const closure = () => {
  let count = 0;

  const getCount = () => count;

  const incrementCount = () => {
    count++;
  };

  return {
    getCount,
    incrementCount,
  };
};

const counter = closure();
console.log(counter.incrementCount());
console.log(counter.incrementCount());
console.log(counter.incrementCount());
console.log(counter.getCount());

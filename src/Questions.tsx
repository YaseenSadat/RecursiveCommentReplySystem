import React from 'react';

// Question 1: Remove all odd numbers
const removeOddNumbers = (arr: number[]): number[] => {
  return arr.filter((num) => num % 2 === 0);
};

// Question 2: Sum of all odd numbers
const sumOddNumbers = (arr: number[]): number => {
  return arr.filter((num) => num % 2 !== 0).reduce((sum, num) => sum + num, 0);
};

const Questions: React.FC = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 10];
  const evenNumbers = removeOddNumbers(numbers);
  const oddSum = sumOddNumbers(numbers);

  return (
    <div>
      <h2>Question 1 & 2</h2>
      <p>Original Array: {JSON.stringify(numbers)}</p>
      <p>Even Numbers: {JSON.stringify(evenNumbers)}</p>
      <p>Sum of Odd Numbers: {oddSum}</p>
    </div>
  );
};

export default Questions;

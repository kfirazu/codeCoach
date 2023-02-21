import { CodeBlock } from '../interfaces/codeBlock.interface';
import { storageService } from '../services/async.storage.service';
export const codeBlocks: CodeBlock[] = [
  {
    _id: storageService.makeId(),
    title: 'Async/await HTTP request',
    code:
      `//Async/await is a syntax for writing asynchronous functions in a synchronous style.
//async keyword before a function makes it return a Promise,
//while await is used to wait for the Promise to resolve.
//Add async and await in the right position to solve this challenge
      function fetchData() {
         try {
           const response = fetch('https://api.example.com/data');
           const data = await response.json();
           console.log(data);
         } catch (error) {
           console.error(error);
         }
      }`,
    solution:
      `//Async/await is a syntax for writing asynchronous functions in a synchronous style.
//async keyword before a function makes it return a Promise,
//while await is used to wait for the Promise to resolve.
//Add async and await in the right position to solve this challenge
      async function fetchData() {
         try {
           const response = await fetch('https://api.example.com/data');
           const data = await response.json();
           console.log(data);
         } catch (error) {
           console.error(error);
         }
      }`
  },
  {
    _id: storageService.makeId(),
    title: 'Object Destructuring',
    code:
`//Object destructuring is a way to extract properties from an object
//and store them in separate variables. For example:
//const employee = {
//name: "Jon",
//lastName: "Snow"
//}
//const { name, lastName } = employee
//console.log(name, age) // Output: "Jon", "Snow"
//Change the code below to make it work.
        
 const person = {
       firstName: "David",
       lastName: "Smith",
       age: 30
   }
 const {} = person

 console.log(firstName); // "David"
 console.log(lastName); // "Smith"
 console.log(age); // 30`,
    solution:
`//Object destructuring is a way to extract properties from an object
//and store them in separate variables. For example:
//const employee = {
//name: "Jon",
//lastName: "Snow"
//}
//const { name, lastName } = employee
//console.log(name, age) // Output: "Jon", "Snow"
//Change the code below to make it work.
        
 const person = {
       firstName: "David",
       lastName: "Smith",
       age: 30
   }
 const { firstName, lastName, age } = person

 console.log(firstName); // "David"
 console.log(lastName); // "Smith"
 console.log(age); // 30`
  },

  {
    _id: storageService.makeId(),
    title: 'Arrow functions',
    code:
`//Arrow functions in JavaScript are a concise way of writing functions that use a new syntax introduced in ES6.
//For example: const greeting = () => console.log('Hello, world!');
//Refactor multiply function using arrow function syntax
// Regular function
function multiply(x, y) {
  return x * y;
}

// Arrow function
const multiply = 

console.log(multiply(2, 3)); // Output: 6`,
    solution: 
`//Arrow functions in JavaScript are a concise way of writing functions that use a new syntax introduced in ES6.
//For example: const greeting = () => console.log('Hello, world!');
//Refactor multiply function using arrow function syntax
// Regular function
function multiply(x, y) {
  return x * y;
}

// Arrow function
const multiply = (x, y) => x * y

console.log(multiply(2, 3)); // Output: 6`
  },
  {
    _id: storageService.makeId(),
    title: 'Spread Operator',
    code: `//The JavaScript spread operator (...) allows us to quickly copy all
//or part of an existing array or object into another array or object. For example:
//const numbersOne = [1, 2, 3];
//const numbersTwo = [4, 5, 6];
//const numbersCombined = [...numbersOne, ...numbersTwo]; // [1,2,3,4,5,6]
//Change the code below using spread operator
    
const numbers = [1, 2, 3];
const newNumbers = [, 4, 5];
console.log(newNumbers); // Output: [1, 2, 3, 4, 5]`,
    solution: `//The JavaScript spread operator (...) allows us to quickly copy all
//or part of an existing array or object into another array or object. For example:
//const numbersOne = [1, 2, 3];
//const numbersTwo = [4, 5, 6];
//const numbersCombined = [...numbersOne, ...numbersTwo]; // [1,2,3,4,5,6]
//Change the code below using spread operator
    
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];
console.log(newNumbers); // Output: [1, 2, 3, 4, 5]`
  }
]

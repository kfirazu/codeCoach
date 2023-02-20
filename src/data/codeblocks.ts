import { CodeBlock } from '../interfaces/codeBlock.interface';
import { storageService } from '../services/async.storage.service';
export const codeBlocks: CodeBlock[] = [
    {
        _id: storageService.makeId(),
        title: 'Async/await HTTP request',
        code: `function fetchData() {
            try {
              const response = fetch('https://api.example.com/data');
              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error(error);
            }
          }`,
        solution: `async function fetchData() {
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
        title: 'Arrow functions',
        code: `// Regular function
        function multiply(x, y) {
          return x * y;
        }
        
        // Arrow function
        const multiply = 
        
        console.log(multiply(2, 3)); // Output: 6`,
        solution: `// Regular function
        function multiply(x, y) {
          return x * y;
        }
        
        // Arrow function
        const multiply = (x, y) => x * y;
        
        console.log(multiply(2, 3)); // Output: 6`
    },
    {
        _id: storageService.makeId(),
        title: 'Object Destructuring',
        code: `const person = {
            firstName: "John",
            lastName: "Doe",
            age: 30
        }
        const {} = person

        console.log(firstName); // "John"
        console.log(lastName); // "Doe"
        console.log(age); // 30`,
        solution: `const person = {
            firstName: "John",
            lastName: "Doe",
            age: 30
        }
        const { firstName, lastName, age } = person;
        
        console.log(firstName); // "John"
        console.log(lastName); // "Doe"
        console.log(age); // 30`
    },
    {
        _id: storageService.makeId(),
        title: 'Spread Operator',
        code: `const numbers = [1, 2, 3];
        const newNumbers = [, 4, 5];
        console.log(newNumbers); // Output: [1, 2, 3, 4, 5]`,
        solution: `const numbers = [1, 2, 3];
        const newNumbers = [...numbers, 4, 5];
        console.log(newNumbers); // Output: [1, 2, 3, 4, 5]`
    }
]

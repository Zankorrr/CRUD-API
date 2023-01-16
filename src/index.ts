import 'dotenv/config';

const world = 'World';
const PORT = process.env.PORT

export function hello(who: string = world): string {
  return `Hello ${who}! Port is ${PORT}`;
}

console.log(hello())
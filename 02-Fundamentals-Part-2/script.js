//////////////////////////
// Activating Strick Mode
// Always put this "use strict"; at the begginer of the script to active the strick.
// It used for more security and clean code.
"use strick";

/////////////////////////
// Functions

// The parameter is the kind of placeholder in the function and the argument is then the actual value that we use to fill in that placeholder that is the parameter.

// Create basic function
function logger() {
  console.log("My name is Alan");
}

// Using or executing the function
// Calling | Running | Invoking function
logger();
logger();
logger();
// Output : My name is Alan 3 times

// Simple function with parameters
// Think about parameters as variable
function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
  // return value
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const num = Number("23");

///////////////////////////////////////
// Function Declarations vs. Expressions

// Function declaration
// We can call the function with the variable/value created before the function.
// We have to created a name for function.
function calcAge1(birthYear) {
  return 2023 - birthYear;
}

const age1 = calcAge1(1992);

// Function expression
// We can not call the function with the variable/value created before the function. We have to declare after the function created.
// We have to store the function in variable/value and we don't have to created a name for function. Also known as anonymous function.
const calcAge2 = function (birthYear) {
  return 2023 - birthYear;
};

const age2 = calcAge2(1992);

console.log(age1, age2);

///////////////////////////////////////
// Arrow functions
// In simple line code, we don't need to use 'return', we use  arrow =>
const calcAge3 = (birthYear) => 2023 - birthYear;
const age3 = calcAge3(1992);

// If you want to use more than one line code and more than two parameters, you have to open {}, wrap parameters in () and use 'return' value.
const yearsUntilRetirement = (birthYeah, firstName) => {
  const age = 2023 - birthYeah;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement(1992, "Alan"));
console.log(yearsUntilRetirement(1980, "Alex"));

///////////////////////////////////////
// Functions Calling Other Functions
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} piece of apple and ${orangePieces} pieces of orange.`;
  return juice;
}
console.log(fruitProcessor(2, 3));

///////////////////////////////////////
// Reviewing Functions
const calcAge = function (birthYeah) {
  return 2037 - birthYeah;
};

const yearsUntilRetirements = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    return -1;
  }
};

console.log(yearsUntilRetirements(1992, "Alan"));
console.log(yearsUntilRetirements(1950, "Alex"));

///////////////////////////////////////
// Introduction to Arrays

//Declare array with [], accept all primity types, functions called and expressions. It is multable.
const friend1 = "Leandro";
const friend2 = "Alex";
const friend3 = "Jessica";

const friends = ["Leandro", "Alex", "Jessica"];
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);

// Get elements by its index in array.
console.log(friends[0]);
console.log(friends[2]);

// Get all numbers of elements in array.
console.log(friends.length);
// Get the last element in array using this expression.
console.log(friends[friends.length - 1]);

friends[2] = "Alan";
console.log(friends);
// We can't change array redeclaring itself as shown below.
// friends = ['Fran', 'Luan']

const firstName = "Alan";
const alan = [firstName, "Cruz", 2023 - 1992, "developer", friends];
console.log(alan);
console.log(alan.length);

// Exercise
const calcAges = function (birthYear) {
  return 2023 - birthYear;
};
const years = [1990, 1967, 2002, 2010, 2018];

const ageA = calcAges(years[0]);
const ageB = calcAges(years[1]);
const ageC = calcAges(years[years.length - 1]);
console.log(ageA, ageB, ageC);

const ages = [
  calcAges(years[0]),
  calcAges(years[1]),
  calcAges(years[years.length - 1]),
];
console.log(ages);

///////////////////////////////////////
// Basic Array Operations (Methods)
const friendss = ["Leandro", "Alex", "Jessica"];

// Add elements
// Push and unshift return length of elements.
const newLength = friendss.push("Luan"); // Add after the Last element.
console.log(friendss);
console.log(newLength);

friends.unshift("Fran"); // Add before the First element.
console.log(friendss);

// Remove elements
// Pop and shift return value of the index array and not the length.
friends.pop(); // Remove the Last element
const popped = friendss.pop();
console.log(popped);
console.log(friendss);

friends.shift(); // Remove the First element
console.log(friendss);

// Check the position index of the element in an array.
console.log(friendss.indexOf("Leandro"));
console.log(friendss.indexOf("Alex"));

friends.push(23);
// includes return boolean true or false if element exist in array.
console.log(friendss.includes("Jessica"));
console.log(friendss.includes("Fran"));
console.log(friendss.includes(23));

// We can use includes as an expression true or false.
if (friendss.includes("Leandro")) {
  console.log("You have a friend called Leandro");
}

///////////////////////////////////////
// Introduction to Objects
// Exemplo array
const alanArray = [
  "Alan",
  "Cruz",
  2023 - 1992,
  "developer",
  ["Leandro", "Alex", "Jessica"],
];

// We use {} to create objet. Key: Value
// Key is basically the variable and it is assigned a value.

const alanObject = {
  firstName: "Alan",
  lastName: "Cruz",
  age: 2023 - 1992,
  job: "developer",
  friends: ["Leandro", "Alex", "Jessica"],
};

console.log(alanObject);

///////////////////////////////////////
// Dot vs. Bracket Notation
console.log(alanObject.firstName);
console.log(alanObject["firstName"]);

const nameKey = "Name";
console.log(alanObject["first" + nameKey]);
console.log(alanObject["last" + nameKey]);

// We can't retrieve values using expressions with .dot as we do with brackets.
// console.log(alanObject.'last' + nameKey)  error..

// const interestedIn = prompt(
//   "What do you want to know about Alan? Choose between firstName, lastName, age, job, and friends"
// );

// if (alanObject[interestedIn]) {
//   // console.log(alanObject[interestedIn]);
// } else {
//   // console.log(
//   //   "Wrong request! Choose between firstName, lastName, age, job, and friends"
//   // );
// }

// Create property/ key in object with .dot
alanObject.location = "Brazil";
alanObject["twitter"] = "@llancruzz";
console.log(alanObject);

// Challenge
// "Alan has 3 friends, and his best friend is called Leandro"
console.log(
  `${alanObject.firstName} has ${alanObject.friends.length} friends, and his best friend is called ${alanObject.friends[0]}`
);

///////////////////////////////////////
// Object Methods

const alanSilva = {
  firstName: "Alan",
  lastName: "Silva",
  birthYear: 1992,
  job: "developer",
  friends: ["Leandro", "Alex", "Jessica"],
  hasDriversLicense: true,

  // calcAge: function (birthYear) {
  //   return 2037 - birthYear;
  // }

  // calcAge: function () {
  //   // console.log(this);
  //   return 2037 - this.birthYear;
  // }

  calcAge: function () {
    this.age = 2023 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${
      alanSilva.job
    }, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
  },
};

console.log(alanSilva.getSummary());

console.log(alanSilva.calcAge());

console.log(alanSilva.age);
console.log(alanSilva.age);
console.log(alanSilva.age);

///////////////////////////////////////
// Iteration: The for Loop

// console.log('Lifting weights repetition 1 🏋️‍♀️');
// console.log('Lifting weights repetition 2 🏋️‍♀️');
// console.log('Lifting weights repetition 3 🏋️‍♀️');
// console.log('Lifting weights repetition 4 🏋️‍♀️');
// console.log('Lifting weights repetition 5 🏋️‍♀️');
// console.log('Lifting weights repetition 6 🏋️‍♀️');
// console.log('Lifting weights repetition 7 🏋️‍♀️');
// console.log('Lifting weights repetition 8 🏋️‍♀️');
// console.log('Lifting weights repetition 9 🏋️‍♀️');
// console.log('Lifting weights repetition 10 🏋️‍♀️');

// for loop keeps running while the condition is TRUE
// It takes 3 parts:
// COUNTER INITIAL VALUE | LOGICAL CONDITION BEFORE EACH ITERATION OF LOOP | ITERATION.
// Initialization, Condition and Iteration
for (let rep = 1; rep <= 5; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

///////////////////////////////////////
// Looping Arrays, Breaking and Continuing

const alanLoop = [
  "Alan",
  "Silva",
  1992,
  "developer",
  ["Leandro", "Alex", "Jessica"],
  true,
];

const types = [];

for (let i = 0; i < alanLoop.length; i++) {
  // Reading from alanLoop array
  console.log(alanLoop[i], typeof alanLoop[i]);

  // Filling types array
  types[i] = typeof alanLoop[i];
  types.push(typeof alanLoop[i]);
}

console.log(types);

// Iterate a yearsArray to calculate ages and add to another array called agesArray
const yearsArray = [1992, 2005, 1978, 2023];
const agesArray = [];

for (let i = 0; i < yearsArray.length; i++) {
  agesArray.push(2040 - yearsArray[i]);
}
console.log(agesArray);

// CONTINUE
// The continue statement "jumps over" one iteration in the loop.
console.log("--- ONLY STRINGS ---");
for (let i = 0; i < alanLoop.length; i++) {
  if (typeof alanLoop[i] !== "string") continue;

  // This code won't even work or read, because 'continue' exit the loop.
  console.log(alanLoop[i], typeof alanLoop[i]);
}

// BREAK
// The break statement "jumps out" of a loop.
console.log("--- BREAK WITH NUMBER ---");
for (let i = 0; i < alanLoop.length; i++) {
  if (typeof alanLoop[i] === "number") break;

  // This code won't even work or read, because 'break' terminate the loop.
  console.log(alanLoop[i], typeof alanLoop[i]);
}

///////////////////////////////////////
// Looping Backwards and Loops in Loops

const allan = [
  "Alan",
  "Silva",
  1992,
  "developer",
  ["Leandro", "Alex", "Jessica"],
  true,
];

// Looping backwards, starting with the last element of array till 0.
for (let i = allan.length - 1; i >= 0; i--) {
  console.log(i, allan[i]);
}

// Loops in loops

for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`---- Exercise ${exercise}`);

  for (let rep = 1; rep < 4; rep++) {
    console.log(`Exercise ${exercise}: Lifting weigth repetition ${rep} 🏋️‍♀️`);
  }
}

///////////////////////////////////////
// The while Loop
for (let rept = 1; rept <= 10; rept++) {
  console.log(`Lifting weight repetition ${rept} 🏋️‍♀️`);
}

let rep = 1;
while (rep <= 10) {
  // console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`);
  rep++;
}

// We use a while loop when we don't know how many times we have to loop. It doesn't depends on counter, only condition true.
// Remember always to add the variable at the end of the block code to update the variable, otherwise the loop will be infinity.

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log("Loop is about to end...");
}

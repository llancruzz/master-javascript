"use strict";

///////////////////////////////////////
// Default Parameters

const bookings = [];

const createBooking = function (
  flightNum,
  // You can directly assign value to parameters
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  bookings.push(booking);
  console.log(booking);
};

// You have to follow the order of the parameters
// filgh
createBooking("ABC12");
createBooking("ABC12", 2, 800);
createBooking("ABC12", 2);
createBooking("ABC12", 5);

// To skip parameters, you have to write undefined
createBooking("ABC12", undefined, 1000);

///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference

const flight = "ABC12";
const alan = {
  name: "Alan Cruz",
  passport: 24739479284,
};

const checkIn = function (flightNumber, passenger) {
  flightNumber = "ABC11";
  passenger.name = "Mr." + passenger.name;
  if (passenger.passport === 24739479284) {
    // alert("Checked in");
  } else {
    // alert("Wrong passport!");
  }
};

checkIn(flight, alan);
console.log(flight);
console.log(alan);

// Is the same as doing...
// const flightNumber = flight;
// const passenger = alan;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(alan);
checkIn(flight, alan);

/*
There are two terms that are used all the time when dealing with functions, which is passing by value, and passing by reference, and many experienced programmers that are new to JavaScript have some confusion between these terms and how it works in JavaScript. So JavaScript does not have passing by reference, only passing by value, even though it looks like it's passing by reference. JavaScript does not have pass by reference. For objects, we do in fact pass in a reference. So the memory address of the object. However, that reference itself is still a value. It's simply a value that contains a memory address. So basically we pass a reference to the function, but we do not pass by reference, and this is an important distinction.
*/

///////////////////////////////////////
// Functions Accepting Callback Functions
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// Higher-order function
const transformer = function (str, funct) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${funct(str)}`);

  console.log(`Transformed by: ${funct.name}`);
};

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log("👋");
};
document.body.addEventListener("click", high5);
["Alan", "Alex", "Leandro"].forEach(high5);

///////////////////////////////////////
// Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet("Hey");
greeterHey("Alan");
greeterHey("Alex");

greet("Hello")("Alan");

// Challenge Arrow function
const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);

greetArr("Hi")("Alan");

///////////////////////////////////////
// The call and apply Methods
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  // book: function(){}
  book(flightNumb, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNumb}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNumb}`, name });
  },
};

lufthansa.book(239, "Alan Cruz");
lufthansa.book(455, "Alex Cruz");

const latam = {
  airline: "Latam",
  iataCode: "LT",
  bookings: [],
};
// Does NOT work beucause this is not refereing to method book() in lufthansa.
// book(23, "Jessica Souza"); //Uncaught ReferenceError: book is not defined.

// To use this method book()

const book = lufthansa.book;

// Call method
book.call(latam, 23, "Sarah Williams");
console.log(latam);

book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 583, "Mary Cooper");

// Apply method -> Only with arrays
const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
console.log(swiss);

// Using spread operator
book.call(swiss, ...flightData);

///////////////////////////////////////
// The bind Method
// book.call(latam, 23, 'Sarah Williams');

const bookLT = book.bind(latam);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookLT(23, "Steven Williams");
bookLH(23, "Steven Williams");
bookLX(23, "Steven Williams");

// Pre-set the parameters
const bookLT23 = book.bind(latam, 23);
bookLT23("Alan Cruz");
bookLT23("Alex Cruz");

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

// High-order function refactor
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
  console.log("This will never run again");
};
runOnce();

// IIFE
(function () {
  console.log("This will never run again");
  const isPrivate = 23;
})();

console.log(isPrivate);

(() => console.log("This will ALSO never run again"))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);

///////////////////////////////////////
// Closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

///////////////////////////////////////
// More Closure Examples
// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);

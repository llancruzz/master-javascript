"use strict";

// Data needed for first part of the section

// ES6 enhanced object literals
const weekday = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHour = {
  [weekday[3]]: {
    open: 12,
    close: 22,
  },
  [weekday[4]]: {
    open: 11,
    close: 23,
  },
  [weekday[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  // ES6 enhanced object literals
  openingHour,

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

///////////////////////////////////////
// Destructuring Arrays
const arr = [10, 20, 30];
const a = arr[0];
const b = arr[1];
const c = arr[2];

console.log(a, b, c); // output 10 20 30

const [x, y, z] = arr;
console.log(x, y, z); // output 10 20 30
console.log(arr); // output [10, 20, 30] It doesn't change the original array

// Retrieve data from array 'restaurant object'
// If I want to retrieve index of elements, skip with space between them. POV: Small arrays
let [main, , secondary] = restaurant.categories;
console.log(main, secondary); // output Italian Vegetarian

// Switching variables
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary); // output Vegetarian Italian

[main, secondary] = [secondary, main];
console.log(main, secondary); // output Italian Vegetarian

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(3, 0);
console.log(starter, mainCourse); // output Caprese Salad Pizza

// Nested destructuring
const nested = [10, 20, [30, 40]];
const [i, , j] = nested;
console.log(i, j); // output 10, [30, 40]

const [l, , [m, n]] = nested;
console.log(l, m, n); // output 10 30 40

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

///////////////////////////////////////
// Destructuring Objects
// The name of the variable to destructure has to match with the name of property in objetc
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// If I want to use a new variable name,store in different name as ex below
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let d = 111;
let e = 999;
const obj = { d: 10, e: 20, f: 30 };
console.log(d, e);
console.log(obj);
// Change d and e to 10, 20 repectively
// Use this trick to wrap them in (), otherwise it will get an error
({ d, e } = obj);
console.log(d, e);
console.log(obj);

// Nested objects
const {
  fri: { open: opd, close: cld },
} = openingHours;
console.log(opd, cld);

restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Sole,21",
  starterIndex: 2,
  mainIndex: 2,
});

restaurant.orderDelivery({ address: "Via del Sole,21", starterIndex: 1 });

///////////////////////////////////////
// The Spread Operator (...)
const array1 = [7, 8, 9];
const badNewArray = [1, 2, array1[0], array1[1], array1[2]];
console.log(badNewArray); // output [1, 2, 7, 8, 9]

const goodNewArray = [1, 2, ...array1];
console.log(goodNewArray); // output [1, 2, 7, 8, 9]

// Spred/unpack individuals elements from array
console.log(...goodNewArray); // output 1 2 7 8 9
console.log(1, 2, 7, 8, 9); // output 1 2 7 8 9

// Add new element to array using spread operator to the new array
const newMenu = [...restaurant.mainMenu, " Gnocci"];
console.log(newMenu);

// Copy array using spread operator
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Join/merge 2 arrays using spread operator
const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu1);

// Iterables: arrays, strings, maps, sets. NOT objects
const str = "Alan";
const letters = [...str, "", "C."];
console.log(letters);
console.log(...str);

/*
We can't do is to use this to build a string using a template literal. So here, this is not gonna work. And that's because this is not a place that expects multiple values separated by a comma. So you see unexpected token. Multiple values separated by a comma are usually only expected when we pass arguments into a function, or when we build a new array.
*/
// console.log(`${...str} Cruz`); Error unexpected token

// Real-world example
const ingredients = [
  // prompt("Let's make past! Ingredients 1?"),
  // prompt("Ingredient 2?"),
  // prompt("Ingredient 3?"),
];
console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// Using spread operator calling method function
restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1992, ...restaurant, founder: "Alan C." };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Lanzitto Restaurante Brasil";
console.log(restaurantCopy.name);
console.log(restaurant.name);

///////////////////////////////////////
// Rest Pattern and Parameters
// 1) Destructuring

// SPREAD, because on RIGHT side of =
const array2 = [1, 2, ...[3, 4]];

// REST, because on LEFT side of =
const [A, B, ...others] = [1, 2, 3, 4, 5];
console.log(A, B, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) Functions
const add = function (...numbers) {
  //console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const X = [23, 5, 7];
add(...X);

restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
restaurant.orderPizza("mushrooms");

///////////////////////////////////////
// Short Circuiting (&& and ||)

console.log("---- OR ----");
// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || "Alan");
console.log("" || "Alan");
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || "" || "Hello" || 23 || null);

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log("---- AND ----");
console.log(0 && "Alan");
console.log(7 && "Alan");

console.log("Hello" && 23 && null && "Alan");

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach");
}

restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");
/*
So the OR operator will return the first truthy value of all the operands, or simply the last value if all of them are falsy. On the other hand, the AND operator will return the first falsy value or the last value if all of them are truthy. And as for practical applications, we can use the OR operator to set default values, and we can use the AND operator to execute code in the second operand if the first one is true.
*/

///////////////////////////////////////
// The Nullish Coalescing Operator
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

///////////////////////////////////////
// Logical Assignment Operators
const rest1 = {
  name: "Capri",
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi",
};

// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner &&= "<ANONYMOUS>";
rest2.owner &&= "<ANONYMOUS>";

console.log(rest1);
console.log(rest2);

///////////////////////////////////////
// The for-of Loop
const menus = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menus) console.log(item);

for (const [i, el] of menus.entries()) {
  console.log(`${i + 1}: ${el}`);
}

console.log([...menus.entries()]);

///////////////////////////////////////
// Optional Chaining (?.)
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// console.log(restaurant.openingHours.mon.open);

// WITH optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? "Method does not exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist");

// Arrays
const users = [{ name: "Alan", email: "hello@alan.io" }];
// const users = [];

console.log(users[0]?.name ?? "User array empty");

if (users.length > 0) console.log(users[0].name);
else console.log("user array empty");

///////////////////////////////////////
// Looping Objects: Object Keys, Values, and Entries

// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
// console.log(entries);

// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

///////////////////////////////////////
// Sets : THEY ARE UNIQUE
const ordersSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza",
]);
console.log(ordersSet);

console.log(new Set("Alan"));

console.log(ordersSet.size);
console.log(ordersSet.has("Pizza"));
console.log(ordersSet.has("Bread"));

ordersSet.add("Garlic Bread");
ordersSet.add("Garlic Bread");
ordersSet.delete("Risotto");
// orderSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// Example:
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(
  new Set(["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]).size
);
console.log(new Set("alancruzdasilva").size);

///////////////////////////////////////
// Maps: Fundamentals
// KEY : VALUE

// Create empty Map
const rest = new Map();

// Add/Fill elements to the map using set('KEY', "VALUE")
rest.set("name", "Classico Italiano");
rest.set(1, "Firenze, Italy");
console.log(rest.set(2, "Minas Gerais, Brazil"));

rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open :D")
  .set(false, "We are closed :(");

console.log(rest.get("name")); // output Classico Italiano
console.log(rest.get(true)); // output We are open :D
console.log(rest.get(1)); // output Firenze, Italy

const time = 12;
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

console.log(rest.has("categories"));
rest.delete(2);
// rest.clear();

// rest.set([1, 2], "Test");
// console.log(rest.get([1, 2])); // output undefined DISTINT in HEAP MEMORY

// To fix, we have to create a new array, example:
const arrr = [1, 2];
rest.set(arrr, "Test");
console.log(rest.get(arrr));

rest.set(document.querySelector("h1"), "Heading");
console.log(rest);
console.log(rest.size);

///////////////////////////////////////
// Maps: Iteration
const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct 🎉"],
  [false, "Try again!"],
]);
console.log(question);

// Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get("question"));
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(question.get("correct") === answer));

// Convert map to array
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);

///////////////////////////////////////
// Working With Strings - Part 1
const airline = "TAP Air Portugal";
const plane = "A320";

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log("B737"[0]);

console.log(airline.length);
console.log("B737".length);

console.log(airline.indexOf("r"));
console.log(airline.lastIndexOf("r"));
console.log(airline.indexOf("portugal"));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(" ")));
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === "B" || s === "E") console.log("You got the middle seat 😬");
  else console.log("You got lucky 😎");
};

checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

console.log(new String("Alan"));
console.log(typeof new String("Alan"));

console.log(typeof new String("Alan").slice(1));

///////////////////////////////////////
// Working With Strings - Part 2

const airlines = "TAP Air Portugal";

console.log(airlines.toLowerCase());
console.log(airlines.toUpperCase());

// Fix capitalization in name
const passenger = "aLan";
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); // output: Alan

// Comparing emails
const email = "hello@jonas.io";
const loginEmail = "  Hello@Jonas.Io \n";

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS);

const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";

console.log(announcement.replace("door", "gate"));
console.log(announcement.replaceAll("door", "gate"));
console.log(announcement.replace(/door/g, "gate"));

// Booleans
const planes = "Airbus A320neo";
console.log(plane.includes("A320"));
console.log(planes.includes("Boeing"));
console.log(planes.startsWith("Airb"));

if (planes.startsWith("Airbus") && planes.endsWith("neo")) {
  console.log("Part of the NEW ARirbus family");
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are NOT allowed on board");
  } else {
    console.log("Welcome aboard!");
  }
};

checkBaggage("I have a laptop, some Food and a pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

///////////////////////////////////////
// Working With Strings - Part 3

// Split and join
console.log("a+very+nice+string".split("+")); // output: (4) ['a', 'very', 'nice', 'string']
console.log("Alan Cruz da Silva".split(" ")); // output: (4) ['Alan', 'Cruz', 'da', 'Silva']

const [firstName, lastName] = "Alan Cruz".split(" ");

const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName); // output: Mr. Alan CRUZ

const capitalizeName = function (name) {
  const names = name.split(" ");
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(" "));
};

capitalizeName("alan cruz da silva");
capitalizeName("alan cruz");

// Padding
const message = "Go to gate 23!";
console.log(message.padStart(20, "+").padEnd(30, "+"));
console.log("Alan".padStart(20, "+").padEnd(30, "+"));

const maskCreditCard = function (number) {
  const str = number + "";
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard("334859493847755774747"));

// Repeat
const message2 = "Bad waether... All Departues Delayed... ";
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${"🛩".repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);

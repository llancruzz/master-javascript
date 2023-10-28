"use strick";

///////////////////////////////////////
// Constructor Functions and the new Operator
const Person = function (firstName, birthYear) {
  // console.log(this);  output: Person {}
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never to this! Instead of, use PROTOTYPES
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const alan = new Person("Alan", 1992);
console.log(alan);
// new keyword behind the scenes

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const alex = new Person("Alex", 1992);
const leandro = new Person("Leandro", 1993);
console.log(alex, leandro);

const jessica = "Jessica";

console.log(alan instanceof Person); // output: true
console.log(jessica instanceof Person); // output: false

Person.hey = function () {
  console.log("Hey there 👋");
  console.log(this);
};
Person.hey();

///////////////////////////////////////
// Prototypes
console.log(Person.prototype); // output: {constructor: f}

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

alan.calcAge(); // output: 31
leandro.calcAge(); // output: 30

console.log(alan.__proto__);
console.log(alan.__proto__ === Person.prototype); // output: true

// NOTE: prototype is only related to object created from Constructor. It means that Constructor is not prototype of its Contructor.
console.log(Person.prototype.isPrototypeOf(alan)); // output: true
console.log(Person.prototype.isPrototypeOf(leandro)); // output: true
console.log(Person.prototype.isPrototypeOf(Person)); // output: false

// .prototyeOfLinkedObjects

// Set properties in prototype
Person.prototype.species = "Homo Sapiens";
console.log(alan.species, leandro.species);

console.log(alan.hasOwnProperty("firstName"));
console.log(alan.hasOwnProperty("species"));

///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects
console.log(alan.__proto__);
// Object.prototype (top of prototype chain)
console.log(alan.__proto__.__proto__);
console.log(alan.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir((x) => x + 1);

///////////////////////////////////////
// ES6 Classes

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  // Use _ to fix conflit between the same name passing into properties and set/get
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log("Hey there 👋");
    console.log(this);
  }
}

const robert = new PersonCl("Robert Cruz", 1996);
console.log(robert);
robert.calcAge();
console.log(robert.age);

console.log(robert.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
robert.greet();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

const walter = new PersonCl("Walter White", 1965);
// PersonCl.hey();

///////////////////////////////////////
// Setters and Getters
const account = {
  owner: "Alan",
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

///////////////////////////////////////
// Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
sarah.calcAge();

///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const PersonIn = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonIn.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // Inheritance GOOD way to call other class. Note: THIS in regular function return undefined, to call it, using call() method.
  PersonIn.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes:
// BEST way to link prototype and therefore, inheritance will work as espect.
// NOTE: Always link the classes before any method created.
Student.prototype = Object.create(PersonIn.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof PersonIn);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

///////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

class PersonClass {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log("Hey there 👋");
  }
}

// Inheritance from another class:
// You have to 'extends' calling another class.
class StudentCl extends PersonClass {
  constructor(fullName, birthYear, course) {
    // Always needs to use super() method first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl("Martha Jones", 2012, "Computer Science");
martha.introduce();
martha.calcAge();

///////////////////////////////////////
// Inheritance Between "Classes": Object.create

const PersonProtoCl = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const allan = Object.create(PersonProtoCl);

// Inheritance from another class:
const StudentProto = Object.create(PersonProtoCl);

StudentProto.init = function (firstName, birthYear, course) {
  // In order to use the parent's method, you have to call it first before using call() method.
  PersonProtoCl.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
jay.introduce();
jay.calcAge();

///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

class Account {
  // 1) Public fields (instances)
  locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // Protected property
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods

  // Public interface(API)
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log("Helper");
  }

  // 4) Private methods
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);

// acc1._movements.push(250);
// acc1._movements.push(-140);
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();

// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

// Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

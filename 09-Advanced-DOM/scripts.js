///////////////////////////////////////
// Selecting, Creating, and Deleting Elements

// Selecting elements
// Select all html elements css
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// Select either class or id elements : It has to type the selector . and # and select the first element in this selector
const header = document.querySelector(".header");
console.log(header);

// Select all elements at once in NodeList representation, it doesn't updated the DOM
const allSections = document.querySelectorAll(".section");
console.log(allSections);

console.log(document.getElementById("section--1"));
console.log(document.getElementsByClassName("btn"));

// Select elements by tags. HTMLCollection representation, it means update(add/remove) whenever the DOM is updated.
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

// Creating and inserting elements
// insertAdjacentHTML()
// Syntax : insertAdjacentHTML(position, text)
/*
position
A string representing the position relative to the element. Must be one of the following strings:

"beforebegin"
Before the element. Only valid if the element is in the DOM tree and has a parent element.

"afterbegin"
Just inside the element, before its first child.

"beforeend"
Just inside the element, after its last child.

"afterend"
After the element. Only valid if the element is in the DOM tree and has a parent element.

text
The string to be parsed as HTML or XML and inserted into the tree.

*/
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Display element to UI at the first child of parent element.
// header.prepend(message);

// Display element to UI at the end chil of parent element.
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // New version of removing element using remove() method.
    // message.remove();

    // Old version of removing elements getting its parent's element.
    message.parentElement.removeChild(message);

    // Both work as the same result. Note: It doens't need to get element in message because "message" variable is stored locally already.
  });

///////////////////////////////////////
// Styles, Attributes and Classes

// Styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

document.documentElement.style.setProperty("--color-primary", "orangered");

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

console.log(logo.src);
console.log(logo.getAttribute("src"));

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c"); // not includes

// Don't use
logo.className = "alan";

///////////////////////////////////////
// Types of Events and Event Handlers
const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading :D");
};

h1.addEventListener("mouseenter", alertH1);

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

///////////////////////////////////////
// Event Propagation in Practice
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAV", e.target, e.currentTarget);
});

///////////////////////////////////////
// DOM Traversing

// h = h1
const h = document.querySelector("h1");

// Going downwards: child
console.log(h.querySelectorAll(".highlight"));
console.log(h.childNodes);
console.log(h.children);
h.firstElementChild.style.color = "white";
h.lastElementChild.style.color = "orangered";

// Going upwards: parents
console.log(h.parentNode);
console.log(h.parentElement);

h.closest(".header").style.background = "var(--gradient-secondary)";

h.closest("h1").style.background = "var(--gradient-primary)";

// Going sideways: siblings
console.log(h.previousElementSibling);
console.log(h.nextElementSibling);

console.log(h.previousSibling);
console.log(h.nextSibling);

console.log(h.parentElement.children);
[...h.parentElement.children].forEach(function (el) {
  if (el !== h) el.style.transform = "scale(0.5)";
});

///////////////////////////////////////
// Lifecycle DOM Events
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built!", e);
});

window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = "";
});

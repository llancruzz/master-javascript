var budget = [
  { value: 250, description: "Sold old TV 📺", user: "alan" },
  { value: -45, description: "Groceries 🥑", user: "alan" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "alan" },
  { value: 300, description: "Freelancing 👩‍💻", user: "alan" },
  { value: -1100, description: "New iPhone 📱", user: "alan" },
  { value: -20, description: "Candy 🍭", user: "jessica" },
  { value: -125, description: "Toys 🚂", user: "jessica" },
  { value: -1800, description: "New Laptop 💻", user: "alan" },
];

var limits = {
  alan: 1500,
  jessica: 100,
};

var add = function (value, description, user) {
  if (!user) user = "alan";
  user = user.toLowerCase();

  var lim;
  if (limits[user]) {
    lim = limits[user];
  } else {
    lim = 0;
  }

  if (value <= lim) {
    budget.push({ value: -value, description: description, user: user });
  }
};
add(10, "Pizza 🍕");
add(100, "Going to movies 🍿", "Jessica");
add(200, "Stuff", "Alex");
console.log(budget);

var check = function () {
  for (var el of budget) {
    var lim;
    if (limits[el.user]) {
      lim = limits[el.user];
    } else {
      lim = 0;
    }

    if (el.value < -lim) {
      el.flag = "limit";
    }
  }
};
check();

console.log(budget);

var bigExpenses = function (limit) {
  var output = "";
  for (var el of budget) {
    if (el.value <= -limit) {
      output += el.description.slice(-2) + " / "; // Emojis are 2 chars
    }
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

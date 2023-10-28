"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest
// OLD SCHOOL

const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${Object.values(
        data.languages
      )}</p>
      <p class="country__row"><span>💰</span>${Object.keys(data.currencies).map(
        (value) => data.currencies[value]["name"]
      )}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    //console.log(data);
    renderCountry(data);
  });
};

// getCountryData("brazil");
// getCountryData("usa");
// getCountryData("ireland");

///////////////////////////////////////
// Welcome to Callback Hell

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    //console.log(data);

    // Render Country 1
    renderCountry(data);

    // Get neighbour Country (2)
    //const [neighbour] = data.borders;
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    // AJAX Call Country (2)
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener("load", function () {
      const [data2] = JSON.parse(this.responseText);
      //console.log(data2);

      renderCountry(data2, "neighbour");
    });
  });
};

getCountryAndNeighbour("ireland");

// Eg. Callback HELL = NESTED
// IT looks like a triangule and it is hard to understand the code.
// To organize, scape and solve callback hell we use PROMISES.

setTimeout(() => {
  //console.log("1 second passed");
  setTimeout(() => {
    //console.log("2 seconds passed");
    setTimeout(() => {
      //console.log("3 second passed");
      setTimeout(() => {
        //console.log("4 second passed");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

///////////////////////////////////////
// Promises and  the Fetch API
// Consuming Promises
// Chaining Promises
// Handling Rejected Promises
// Throwing Errors Manually

// const request3 = fetch("https://restcountries.com/v3.1/name/brazil");
// console.log(request3); // output: Promise {<pending>}

// const getCountriesData = function (countries) {
//   fetch(`https://restcountries.com/v3.1/name/${countries}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// REFACTORING with arrow function: CLEAN
// const getCountriesData = (countries) => {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${countries}`)
//     .then((response) => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found(${response.status})`);

//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders?.[0];
//       // const neighbour = " djhfsd";

//       if (!neighbour) throw new Error(`Country not fund`);

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then((response) => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then((data) => renderCountry(data[0], "neighbour"))
//     .catch((err) => {
//       console.error(`${err} 💥💥💥 `);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

const getJSON = (url, errorMsg = "Something went wrong") => {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg}(${response.status})`);

    return response.json();
  });
};

const getCountriesData = (countries) => {
  // Country 1
  getJSON(
    `https://restcountries.com/v3.1/name/${countries}`,
    "Country not found"
  )
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      // const neighbour = " djhfsd";

      if (!neighbour) throw new Error(`Country not fund`);

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        "Country not found"
      );
    })
    .then((data) => renderCountry(data[0], "neighbour"))
    .catch((err) => {
      console.error(`${err} 💥💥💥 `);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener("click", () => getCountriesData("brazil"));

///////////////////////////////////////
// The Event Loop in Practice
// NOTE: Promises alwas runs first than any setTimeout() .. because it has priority on the queue.(micro task)
console.log("Test start"); // it runs first

setTimeout(() => console.log("0 sec timer"), 0); // it runs fifth

Promise.resolve("Resolved promise 1").then((res) => console.log(res)); // it runs fourth

Promise.resolve("Resolved promise 2").then((res) => {
  for (let i = 0; i < 10000; i++) {}
  console.log(res); // it runs third
});

console.log("Test end"); // it runs second

///////////////////////////////////////
// Building a Simple Promise

// NOTE: resolve = FULFILLED (success) | reject = REJECTED (error) in THE PROMISE LIFECYCLE
// Promise() receives 1 parameter called 'executer function' with the SETTLED (fulfilled and reject) as a parameters.

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lotter draw is happening 🔮");
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve("You WIN 💰");
    } else {
      reject(new Error("You lost your money 💩"));
    }
  }, 2000);
});

lotteryPromise.then((res) => console.log(res)).catch((err) => console.log(err));

// Promisifying setTimeout : Eg. more real world

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log("1 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("2 second passed");
    return wait(1);
  })
  .then(() => {
    console.log("3 second passed");
    return wait(1);
  })
  .then(() => console.log("4 second passed"));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve("abc").then((x) => console.log(x));
Promise.reject(new Error("Problem!")).catch((x) => console.error(x));

///////////////////////////////////////
// Promisifying the Geolocation API

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then((data) => renderCountry(data[0]))
    .catch((err) => console.error(`${err.message} 💥`));
};

btn.addEventListener("click", whereAmI);

///////////////////////////////////////
// Consuming Promises with Async/Await
// Error Handling With try...catch

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Reverse Geocoding
    const responseGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    );
    if (!responseGeo.ok) throw new Error("Problem getting location data");

    const dataGeo = await responseGeo.json();
    console.log(dataGeo);

    // Country data
    const responseCountry = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!responseCountry.ok) throw new Error("Problem getting country");

    const data = await responseCountry.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
  }
};

whereAmI();
console.log("FIRST");

// How to catch error in vanilla js
// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

///////////////////////////////////////
// Returning Values from Async Functions
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Reverse Geocoding
    const responseGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    );
    if (!responseGeo.ok) throw new Error("Problem getting location data");

    const dataGeo = await responseGeo.json();

    // Country data
    const responseCountry = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!responseCountry.ok) throw new Error("Problem getting country");

    const data = await responseCountry.json();

    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log("1: Will get location");
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then((city) => console.log(`2: ${city}`))
//   .catch((err) => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log("3: Finished getting location"));

// IIFE
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log("3: Finished getting location");
})();

///////////////////////////////////////
// Running Promises in Parallel

const getJSON = (url, errorMsg = "Something went wrong") => {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg}(${response.status})`);

    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.flatMap((d) => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries("brazil", "usa", "ireland");

///////////////////////////////////////
// Other Promise Combinators: race, allSettled and any
// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("Request took too long!"));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(5),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success"),
]).then((res) => console.log(res));

Promise.all([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// Promise.any [ES2021]
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

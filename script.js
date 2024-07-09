"use strict";
// const rest1 = {
//   name: "Togo",
//   // numberOfGuests: 20,
//   numberOfGuests: 0,
// };

// const rest2 = {
//   name: "Piazza",
//   ownerName: "Giovanni Rossi",
// };

// // rest1.numberOfGuests = rest1.numberOfGuests || 10;
// // rest2.numberOfGuests = rest2.numberOfGuests || 10;

// // rest1.numberOfGuests ||= 10
// // rest2.numberOfGuests ||= 10

// rest1.numberOfGuests ??= 10;
// rest2.numberOfGuests ??= 10;

// // rest1.ownerName = rest1.ownerName && "<ANONYMOUS>";
// // rest2.ownerName = rest2.ownerName && "<ANONYMOUS>";

// rest1.ownerName &&= "<ANONYMOUS>";
// rest2.ownerName &&= "<ANONYMOUS>";

// console.log(rest1);
// console.log(rest2);

// const game = {
//   team1: "Bayern Munich",
//   team2: "Borrussia Dortmund",
//   players: [
//     [
//       "Neuer",
//       "Pavard",
//       "Martinez",
//       "Alaba",
//       "Davies",
//       "Kimmich",
//       "Goretzka",
//       "Coman",
//       "Muller",
//       "Gnarby",
//       "Lewandowski",
//     ],
//     [
//       "Burki",
//       "Schulz",
//       "Hummels",
//       "Akanji",
//       "Hakimi",
//       "Weigl",
//       "Witsel",
//       "Hazard",
//       "Brandt",
//       "Sancho",
//       "Gotze",
//     ],
//   ],
//   score: "4:0",
//   scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
//   date: "Nov 9th, 2037",
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// const [players1, players2] = game.players;
// console.log(players1, players2);
// const [gk, ...fieldPlayers] = players1;
// // const [gk, ...fieldPlayers] = players2;
// console.log(gk, fieldPlayers);
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
// console.log(players1Final);

// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

// const printGoals = function (...players) {
//   console.log(`${players.length} goals were scored`);
// };
// printGoals(...game.scored);

// team1 > team2 && console.log("Team 2 is more likely to win");
// team1 < team2 && console.log("Team 1 is more likely to win");

//Write a function that takes an array (a) and a number (b) as arguments. Sum up all array elements with a value greater than b. Return the sum
const a = { x: 1, b: "e", c: "jashdgf", d: 4, e: 5 };
const b = 4;
function myFunction(a) {
  // console.log( (a.filter(x => x > b)).reduce((x, y) => x + y) );
  // console.log(a);
  // console.log(a[b]);
  // return (a[b] &&= a[b]) ? true : false
  // return obj?.a?.b
  return a.reduce((acc, curr) => acc + curr, 0);
}

console.log(myFunction({ a: 1, b: 2, c: 3 }));

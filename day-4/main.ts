const text = (await Deno.readTextFile("testcase.txt")).trim();

let [rules, input] = text.split("\n\n");

let ruleset = rules.split("\n");

const leftRules: string[] = [];
const rightRules: string[] = [];

for (const rule of ruleset) {
  let [first, second] = rule.split("|");

  leftRules.push(first);
  rightRules.push(second);
}

let validOrderings: string[][] = [];
let invalidOrderings = [];

for (const ordering of input.split("\n")) {
  let orderArray = ordering.split(",");

  if (checkOrdering(orderArray)) {
    validOrderings.push(orderArray);
  } else {
    invalidOrderings.push(orderArray);
  }
}

console.log(validOrderings);

console.log(`Part 1: ${sumMiddleElements(validOrderings)}`);

// Part 2

let sortedOrderings: string[][] = [];

let counter = 0;
for (const wrongOrdering of invalidOrderings) {
  console.log(`${counter}/${invalidOrderings.length}`);

    console.log(wrongOrdering)
    sortArray(wrongOrdering)
    console.log(wrongOrdering)

  sortedOrderings.push(wrongOrdering);
  counter++;
}

console.log(`Part 2: ${sumMiddleElements(sortedOrderings)}`);

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

function sumMiddleElements(orderings: string[][]) {
  let sum = 0;
  for (const valid of orderings) {
    sum += Number(valid[Math.floor(valid.length / 2)]);
  }
  return sum;
}

function checkOrdering(orderArray: string[]) {
  let flag = true;
  // Need to use array slices here
  for (let pageIndex = 0; pageIndex < orderArray.length; pageIndex++) {
    let before = orderArray.slice(0, Number(pageIndex));
    let after = orderArray.slice(Number(pageIndex) + 1, orderArray.length);
    let page = orderArray[pageIndex];

    for (const leftRuleIndex in leftRules) {
      const rule = leftRules[leftRuleIndex];
      if (
        rule === page && !after.includes(rightRules[leftRuleIndex]) &&
        orderArray.includes(rightRules[leftRuleIndex])
      ) {
        flag = false;
        break;
      }
    }

    if (!flag) break;

    for (const rightRuleIndex in rightRules) {
      const rule = rightRules[rightRuleIndex];
      if (
        rule === page && !before.includes(leftRules[rightRuleIndex]) &&
        orderArray.includes(leftRules[rightRuleIndex])
      ) {
        flag = false;
        break;
      }
    }
  }

  if (flag) {
    return true;
  }
}

function sortArray(orderArray: string[]) {
  let arrayToSort = orderArray;
  orderArray = [];
  for (const elemum of arrayToSort) {
    orderArray.push(elemum)
    console.log(orderArray)
    while (!checkOrdering(orderArray)) {
        let flag = true;
        // Need to use array slices here
        for (let pageIndex = 0; pageIndex < orderArray.length; pageIndex++) {
        let before = orderArray.slice(0, Number(pageIndex));
        let after = orderArray.slice(Number(pageIndex) + 1, orderArray.length);
        let page = orderArray[pageIndex];

        for (const leftRuleIndex in leftRules) {
            const rule = leftRules[leftRuleIndex];
            if (
            rule === page && !after.includes(rightRules[leftRuleIndex]) &&
            orderArray.includes(rightRules[leftRuleIndex])
            ) {
            console.log(`Swapping ${rule} and ${rightRules[leftRuleIndex]}`);
            [
                orderArray[orderArray.indexOf(rightRules[leftRuleIndex])],
                orderArray[orderArray.indexOf(rule)],
            ]=[
                orderArray[orderArray.indexOf(rule)],
                orderArray[orderArray.indexOf(rightRules[leftRuleIndex])],
            ];
            flag = false;
            break;
            }
        }

        //   if (!flag) continue;

        for (const rightRuleIndex in rightRules) {
            const rule = rightRules[rightRuleIndex];
            if (
            rule === page && !before.includes(leftRules[rightRuleIndex]) &&
            orderArray.includes(leftRules[rightRuleIndex])
            ) {
            console.log(`Swapping ${rule} and ${leftRules[rightRuleIndex]}`);
            [
                orderArray[orderArray.indexOf(leftRules[rightRuleIndex])],
                orderArray[orderArray.indexOf(rule)],
            ] =[
                orderArray[orderArray.indexOf(rule)],
                orderArray[orderArray.indexOf(leftRules[rightRuleIndex])],
            ]
            break;
            }
        }
        }
    }
  }
  return orderArray;
}

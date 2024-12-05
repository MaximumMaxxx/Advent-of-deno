import { assertIsNumber, isNumber } from "https://deno.land/x/is_number/mod.ts";

const text = (await Deno.readTextFile("input.txt")).trim();

let operations = text.split("mul(")

let sum= 0;
for (const item of operations) {

    if (!(item.length >= 4)) {
        continue
    }
     
    const [firstPart, SecondPart, ..._rest] = item.split(",");

    if (firstPart == "" || SecondPart === undefined) {
        continue;
    }

    let firstNumber = "";
    let count = 0;
    for (const char of firstPart) {
        count ++;
        firstNumber += char;
        if (count >= 3) {
            break
        }
    }


    let secondNumber = "";
    count = 0;
    let foundCloseParen = false;
    for (const char of SecondPart) {
        if (char === ")") {
            foundCloseParen = true;
            break
        }

        if (count >= 3) {
            break
        }count ++;
        secondNumber += char;   
    }


    if (!foundCloseParen) {
        continue
    }

    if (!(isNumber(firstNumber) && isNumber(secondNumber))) {
        continue;
    }

    console.log(`mul(${item} First number ${firstNumber} Second number: ${secondNumber}`)
    sum += Number(firstNumber) * Number(secondNumber);
}


console.log(sum)
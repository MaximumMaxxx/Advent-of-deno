const text = (await Deno.readTextFile("tests.txt")).trim();

let split = text.split("mul")

let sum = 0;

for (let operation of split) {

    if (operation.at(0) !== "(") {
        continue;
    }

    const [firstPart, SecondPart, ..._rest] = operation.split(",");

    if (firstPart == "" || SecondPart === undefined) {
        continue;
    }

    let firstNumber = "";
    let count = 0;
    for (const char of firstPart.substring(1)) {
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


    const num1 = Number(firstNumber)
    const num2 = Number(secondNumber)

    if (Number.isNaN(num1) || Number.isNaN(num2)) {
        continue;
    }

    console.log(`mul${operation}`)
    sum += num1 * num2;
}

console.log(sum);
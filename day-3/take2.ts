const text = (await Deno.readTextFile("tests.txt")).trim();

let mulstack = []
let index = 0;

let sum = 0;
while (index < text.length) {
    mulstack.push(text.at(index))
    
    if (mulstack[0] !== "m") {
        mulstack = [];
    }
    
    if (mulstack[1] !== "u" && mulstack.length > 1) {
        mulstack = [];
    }

    if (mulstack[2] !== "l" && mulstack.length > 2) {
        mulstack = [];
    }

    if (mulstack[3] !== "(" && mulstack.length > 3) {
        mulstack = [];
    }

    if (mulstack.length > 4) {
        if (Number.isNaN(Number(mulstack[4]))) {
            mulstack = []
        }
    }

    let commaFound = false;
    let parenFound = false;

    if (mulstack.length > 5) {
        let valid = true;
        if (Number.isNaN(Number(mulstack[5]))) {
            valid = false;
        } else if (mulstack[5]===",") {
            valid = true;
            commaFound = true;
        } else {
            valid = true;
        }

        if (!valid) {
            mulstack = []
            continue;
        }
    }

    if (mulstack.length > 6) {
        let valid = true;
        if (Number.isNaN(Number(mulstack[6]))) {
            valid = false;
        } 
         if (mulstack[6]===",") {
            if (commaFound) {
                mulstack = []
                continue;
            }

            valid = true;
            commaFound = true;
        
        } else if (mulstack[6] === ")")  {
            parenFound = true;
            valid = true;
        } else {
            valid = true;
        }

        if (!valid) {
            mulstack = []
        }
    }

    let num = 7
    if (mulstack.length > num) {
        let valid = true;
        if (Number.isNaN(Number(mulstack[7]))) {
            valid = false;
        }  if (mulstack[7]===",") {
            if (commaFound) {
                mulstack = []
                continue;
            }

            valid = true;
            commaFound = true;
        
        } else if (mulstack[num] === ")")  {
            if (parenFound) {
                mulstack = []
                continue;
            }

            parenFound = true;
            valid = true;
        } else {
            valid = true;
        }

        if (!valid) {
            mulstack = []
        }
    }
    
    num = 8
    if (mulstack.length > num) {
        let valid = true;
        if (Number.isNaN(Number(mulstack[num]))) {
            valid = false;
        }  if (mulstack[num]===",") {
            if (commaFound) {
                mulstack = []
                continue;
            }

            valid = true;
            commaFound = true;
        
        } else if (mulstack[num] === ")")  {
            if (parenFound) {
                mulstack = []
                continue;
            }

            parenFound = true;
            valid = true;
        } else {
            valid = true;
        }

        if (!valid) {
            mulstack = []
        }
    }
    

    num = 9
    if (mulstack.length > num) {
        let valid = true;
        if (Number.isNaN(Number(mulstack[num]))) {
            valid = false;
        }  if (mulstack[num]===",") {
            if (commaFound) {
                mulstack = []
                continue;
            }

            valid = true;
            commaFound = true;
        
        } else if (mulstack[num] === ")")  {
            if (parenFound) {
                mulstack = []
                continue;
            }

            parenFound = true;
            valid = true;
        } else {
            valid = true;
        }

        if (!valid) {
            mulstack = []
        }
    }

    num = 10
    if (mulstack.length > num) {
        let valid = true;
        if (Number.isNaN(Number(mulstack[num]))) {
            valid = false;
        }  if (mulstack[num]===",") {
            if (commaFound) {
                mulstack = []
                continue;
            }

            valid = true;
            commaFound = true;
        
        } else if (mulstack[num] === ")")  {
            if (parenFound) {
                mulstack = []
                continue;
            }

            parenFound = true;
            valid = true;
        } else {
            valid = true;
        }

        if (!valid) {
            mulstack = []
        }
    }
    
    num = 11
    if (mulstack.length > num) {
        let valid = true;
        if (Number.isNaN(Number(mulstack[num]))) {
            valid = false;
        } else if (mulstack[num]===",") {
            if (commaFound) {
                mulstack = []
                continue;
            }

            valid = true;
            commaFound = true;
        
        } else if (mulstack[num] === ")")  {
            if (parenFound) {
                mulstack = []
                continue;
            }

            parenFound = true;
            valid = true;
        } else {
            valid = true;
        }

        if (!valid) {
            mulstack = []
        }
    }

    num = 12
    if (mulstack.length > num) {
        if (mulstack[num ] !== ")") {
            mulstack = []; 
        }
    }

    if (parenFound && commaFound) {
        index-=3;
        let operation = mulstack.join("").substring(3)
        mulstack = []


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


    // console.log(mulstack)
    index++;
}


console.log(sum)
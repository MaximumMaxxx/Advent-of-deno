const text = (await Deno.readTextFile("input.txt")).trim();

let input1 = [];
let input2 = [];

for (const line of text.split("\n")) {
    let [first, last] = line.split("   ");
    input1.push(first);
    input2.push(last)
}

input1.sort()

let secondListDict = new Map<string,number>();

for (const coord of input2) {
    let currentValue = secondListDict.get(coord);
    if (currentValue !== undefined) {
        console.log("increasing the value :o")
        secondListDict.set(coord,currentValue+1);
    } else{
        secondListDict.set(coord, 1);
    }
}

console.log(secondListDict);

let distance = 0;
for (const index of input1) {
    let value = secondListDict.get(index);
    if (value == undefined) {
        value=0;
    }
    const similarityScore = (value * Number(index));
    console.log(`Similarity score: ${similarityScore}, index: ${index}`)
    distance += similarityScore;
}

console.log(distance)
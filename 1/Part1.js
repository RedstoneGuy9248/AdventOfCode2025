const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    const data = raw.split("\n");
    return data;
};

const updateLocation = (location, turns, direction) => {
    let result = (direction === "R") ? location + turns : location - turns;
    while (result > 99) {result -= 100};
    while (result < 0) {result += 100};
    return result;
};

const main = async () => {
    const data = await returnDocumentArray();
    let location = 50;
    let counter = 0;
    data.forEach(element => {
        const direction = element.slice(0, 1);
        const turns = parseInt(element.substring(1));
        location = updateLocation(location, turns, direction);
        if (location === 0) {counter++};
    });
    console.log(counter);
};
main();
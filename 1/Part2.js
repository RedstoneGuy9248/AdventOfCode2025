const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    const data = raw.split("\n");
    return data;
};
const handleOverflow = (location) => {
    let result = location;
    while (result > 99) {result -= 100};
    while (result < 0) {result += 100};
    return result;
}; 

const main = async () => {
    const data = await returnDocumentArray();
    let location = 50;
    let counter = 0;
    data.forEach((element, i) => {
        const direction = element.slice(0, 1);
        let turns = parseInt(element.substring(1));
        if (direction === "R") {
            while (turns > 0) {
                location++;
                turns--;
                location = handleOverflow(location);
                if (location === 0) {counter++};
            };
        } else if (direction === "L") {
            while (turns > 0) {
                location--;
                turns--;
                location = handleOverflow(location);
                if (location === 0) {counter++};
            };           
        };
    });
    console.log(counter);
};
main();
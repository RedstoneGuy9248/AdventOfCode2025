const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    const data = raw.split("\n").map(element => element.split(""));
    return data;    
};

const main = async () => {
    let data = await returnDocumentArray();
    let sum = 0;
    let newData = data.slice().map(element => element.slice());
    let currentCycleRemoved;
    while (true) {
        currentCycleRemoved = 0;
        data.forEach((element, index) => {
            element.forEach((item, location) => {
                if (item !== "@") {return false;}
                let adjacent = [data[index - 1]?.[location - 1], data[index - 1]?.[location], data[index - 1]?.[location + 1], element[location - 1], element[location + 1], data[index + 1]?.[location - 1], data[index + 1]?.[location], data[index + 1]?.[location + 1]];
                // adjacent = adjacent.map(element => {
                //     if (element !== "@" || element !== ".") {return "."} else {return element}
                // });
                if (adjacent.filter(element => element === "@").length < 4) {newData[index][location] = "."; sum++; currentCycleRemoved++};
            });
        });;
        data = newData.slice().map(element => element.slice());
        if (currentCycleRemoved === 0) {break};
    }
    console.log(sum);
};
main();
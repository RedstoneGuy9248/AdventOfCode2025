const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    const data = raw.split("\n").map(element => element.split(""));
    return data;    
};
const main = async () => {
    const data = await returnDocumentArray();
    const numberRows = data.slice(0, data.length - 1);
    const operators = data[data.length - 1].filter(element => element != " ");
    let numbers = [];
    for (let i = 0; i < numberRows[0].length; i++) {
        let item = []
        numberRows.forEach(element => item.push(element[i]));
        item = item.filter(element => element != " ").join("");
        numbers.push(item);
    }
    const splitArrays = numbers.join("|").split("||").map(element => element.split("|").map(e => parseInt(e)));
    const results = splitArrays.map((element, index) => {
        let operation = operators[index];
        switch (operation) {
            case "*":
                return element.reduce((a, b) => a * b, 1);
                break;
            case "+":
                return element.reduce((a, b) => a + b, 0);
                break;
        };
    });
    console.log(results.reduce((a, b) => a + b, 0));
};

main();
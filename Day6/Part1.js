const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    const data = raw.trim().split("\n").map(element => element.trim().split(" ").filter(element => element));
    return data;    
};
const main = async () => {
    const data = await returnDocumentArray();
    let answers = [];
    for (let i = 0; i < data[0].length; i++) {
        let arr = data.map(element => parseInt(element[i]) ? parseInt(element[i]) : element[i]);
        switch (arr[arr.length - 1]) {
            case "*":
                answers.push(arr.slice(0, arr.length - 1).reduce((a, b) => a * b, 1));
                break;
            case "+":
                answers.push(arr.slice(0, arr.length - 1).reduce((a, b) => a + b, 0));
                break;
        };
    };
    console.log(answers.reduce((a,b) => a + b, 0))
};

main();
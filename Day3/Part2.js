const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    const data = raw.split("\n");
    return data;
};


const main = async () => {
    let data = await returnDocumentArray();
    let sum = 0;
    data = data.filter(element => element);
    data.forEach(element => {
        let digits = element.split("").map(element => parseInt(element));
        let l = 0;
        let u = digits.length - 12;
        let result = [];
        for (let i = 0; i < 12; i++) {
            let range = digits.slice(l, u + 1);
            const max = Math.max(...range);
            result.push(max);
            l = digits.indexOf(max, l) + 1;
            u = digits.length - 12 + result.length;
        };
        sum += parseInt(result.join(""))
    });
    console.log(sum);
};

main();
// oh god this was hard
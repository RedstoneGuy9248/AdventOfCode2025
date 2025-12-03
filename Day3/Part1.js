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
        let biggestNumbersWithEachDigitAtTens = digits.map((e, i) => {
            let remainingDigits = digits.slice(i + 1);
            remainingDigits.sort((a,b) => a < b ? 1 : -1);
            if (remainingDigits.length) {
                return parseInt(e.toString().concat(remainingDigits[0].toString()));
            } else {
                return 0;
            }
        });
        const result = Math.max(...biggestNumbersWithEachDigitAtTens);
        sum += result;
    });
    console.log(sum);
};
main();
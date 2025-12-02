const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    const data = raw.split(",").map(element => element.split("-"));
    return data;    
};

const main = async () => {
    const data = await returnDocumentArray();
    let invalidIds = [];
    data.forEach(element => {
        for (let i = parseInt(element[0]); i <= parseInt(element[1]); i++) {
            if ((i.toString().slice(0, (i.toString().length) / 2)) == (i.toString().slice((i.toString().length / 2), (i.toString().length)))) {
                invalidIds.push(i);
            };
        };
    });
    console.log(invalidIds.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
};

main();
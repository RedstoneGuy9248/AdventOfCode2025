const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    let data = raw.split("\n\n").map(element => element.split("\n"));
    data[0] = data[0].map(element => element.split("-"));
    return data;    
};

const main = async () => {
    const data = await returnDocumentArray();
    console.log(data);
    let fresh = [];
    data[1].forEach(element => {
        if (data[0].some(e => (parseInt(e[0]) <= element && element <= parseInt(e[1])))) {fresh.push(element)};
    });
    console.log(fresh.length);
};

main();
const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    let data = raw.split("\n").map(element => element.split(""));
    return data;
};
const main = async () => {
    const data = await returnDocumentArray();
    const locationOfBeam = data[0].indexOf("S");
    let beams = [locationOfBeam];
    let remainingData = data.slice(1, data.length);
    let count = 0;
    for (let i = 0; i < remainingData.length; i++) {
        let nextBeams = [];
        beams.forEach(element => {
            if (remainingData[i][element] === "^") {
                nextBeams.push(element - 1);
                nextBeams.push(element + 1);
                count++;
            } else if (remainingData[i][element] === ".") {
                nextBeams.push(element);
            }  
        });
        beams = nextBeams;
    };
    console.log(count + 1);
};

main();
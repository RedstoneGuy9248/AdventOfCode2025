const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    let data = raw.split("\n").map(element => element.split(""));
    return data;
};
const main = async () => {
    const data = await returnDocumentArray();
    const locationOfBeam = data[0].indexOf("S");
    let beams = {[locationOfBeam]: 1};
    let remainingData = data.slice(1, data.length);
    let count = 0;
    for (let i = 0; i < remainingData.length; i++) {
        let newBeams = {};
        for (let [element, value] of Object.entries(beams)) {
            element = parseInt(element);
            if (remainingData[i][element] === "^") {
                newBeams[element - 1] = (newBeams[element - 1] || 0) + value;
                newBeams[element + 1] = (newBeams[element + 1] || 0) + value;
                count+= value;
            } else if (remainingData[i][element] === ".") {
                newBeams[element] = (newBeams[element] || 0) + value;
            }  
        }
        beams = newBeams;
    };
    console.log(count + 1);
};

main();
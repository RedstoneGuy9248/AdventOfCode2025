const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    let data = raw.split("\n").map(element => element.split(""));
    return data;
};
const main = async () => {
    const data = await returnDocumentArray();
    const locationOfBeam = data[0].indexOf("S");
    let beams = new Set([locationOfBeam]);
    let remainingData = data.slice(1, data.length);
    let count = 0;
    for (let i = 0; i < remainingData.length; i++) {
        let newRow = remainingData[i];
        let newBeams = new Set(beams);
        beams.forEach(element => {
            if (remainingData[i][element] === "^") {
                newRow[element - 1] = "|";
                newRow[element + 1] = "|";
                newBeams.delete(element);
                newBeams.add(element - 1);
                newBeams.add(element + 1);
                count++;
            } else if (remainingData[i][element] === ".") {
                newRow[element] = "|";
            }
        });
        remainingData[i] = newRow;
        beams = new Set(newBeams);
        console.log(beams);
    };
    console.log(remainingData.map(element => element.join("")).join("\n"));
    console.log(count);
};

main();
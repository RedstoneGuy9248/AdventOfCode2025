const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    const data = raw.split("\n").map(element => element.split(","));
    return data;
};

const main = async () => {
    const data = await returnDocumentArray();
    const distances = data.map((element, i) => data.slice(i + 1).map(e => {
            const distance = Math.sqrt(((element[0] - e[0]) ** 2) + ((element[1] - e[1]) ** 2) + ((element[2] - e[2]) ** 2));
            if (distance === 0) {return Infinity} else {return distance}
        }));
    const flattenedDistances = distances.flat();
    let x = 1000;
    let result;
    const sortedFlatDistances = distances.flat().sort((a, b) => a - b);
    while (true) {
        const shortestDistances = sortedFlatDistances.slice(0, x);
        let connections = [];
        shortestDistances.forEach(element => {
            let len = distances[0].length; let indexX = 0; let j = distances[0].length - 1
            const i = flattenedDistances.indexOf(element);
            while (i > j) {
                len--; indexX++; j+=len ;
            };
            indexY = i - j + len + indexX;
            connections.push([data[indexX], data[indexY]]);
        });
        let circuits = data.filter(element => !connections.flat().includes(element)).map(element => [element]);
        connections.forEach(e => {
            [a, b] = e;
            const indexA = circuits.findIndex(element => element.includes(a));
            const indexB = circuits.findIndex(element => element.includes(b));
            if (indexA === -1 && indexB === -1) {
                circuits.push(e);
            } else if (indexA === -1 && indexB !== -1) {
                circuits[indexB].push(a);
            } else if (indexB === -1 && indexA !== -1) {
                circuits[indexA].push(b);
            } else if (indexA !== indexB) {
                circuits[indexA].push(...circuits[indexB]);
                circuits.splice(indexB, 1);
            };
        });
        console.log(circuits.length);
        if (circuits.length === 1) {result = connections[connections.length - 1]; break} else {x++};
    };
    console.log(result.map(element => element[0]).reduce((a, b) => a * b, 1));
};
main();
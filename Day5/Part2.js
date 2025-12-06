const {readFile} = require('node:fs/promises');
const returnDocumentArray = async () => {
    const raw = await readFile("./input.txt", {encoding: "utf-8"});
    let data = raw.split("\n\n")[0].split("\n").map(element => element.split("-"))
    return data;    
};

const main = async () => {
    let data = (await returnDocumentArray()).map(element => element.map(e => parseInt(e))).sort((a, b) => a[0] > b[0] ? 1 : -1);
    let newData = structuredClone(data);
    data.forEach((element, index) => {
        const remainingData = data.slice(index + 1);
        remainingData.forEach((e, i) => {
            if (e[1] < element[1]) {
                newData[i + index + 1] = [];
            };
        });
    });
    while (true) {
        let changed = 0;
        newData = newData.filter(element => (Array.isArray(element) && element.length > 0)).sort((a, b) => a[0] > b[0] ? 1 : -1);
        data = structuredClone(newData);
        data.forEach((a, ai) => {
            const remainingData = data.slice(ai + 1);
            remainingData.forEach((b, bi) => {
                if ((b[0] < a[1] && a[1] < b[1]) || (b[0] === a[1])) {
                    newData[ai + bi + 1] = [];
                    newData[ai] = [a[0], b[1]];
                    changed++;
                } else
                if (a[0] === b[0]) {
                    newData[ai + bi + 1] = [];
                    newData[ai] = [a[0], (a[1] > b[1] ? a[1] : b[1])];
                    changed++;
                } else
                if (a[1] === b[1]) {
                    newData[ai + bi + 1] = [];
                    newData[ai] = [(a[0] < b[0] ? a[0] : b[0]), a[1]];
                    changed++;                   
                };
            });
        });
        if (!changed) {break};
    };
    

    console.log("Done!");
    console.log(newData.map(element => (element[1] - element[0] + 1)).reduce((a, b) => a + b, 0));

};

main();
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
            const str = i.toString();
            // if ((str.slice(0, (str.length) / 2)) == (str.slice(str.length / 2), (str.length)))) {
            //     invalidIds.push(i);
            // };
            for (let repeatedSectionLength = 1; repeatedSectionLength <= (str.length / 2); repeatedSectionLength++) {
                if (str.length % repeatedSectionLength === 0) {
                    let strArray = [];
                    for (let b = repeatedSectionLength; b <= str.length; b += repeatedSectionLength) {
                        strArray.push(str.slice((b - repeatedSectionLength), b));
                    };
                    // console.log(strArray);
                    if (strArray.every(element => element === strArray[0])) {if (!invalidIds.includes(i)) {invalidIds.push(i)}};
                };
            };
        };
    });
    console.log(invalidIds.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
};

main();
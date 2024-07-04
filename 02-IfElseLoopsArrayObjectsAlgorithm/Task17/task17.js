function cleanArray(elements) {
    let newArray = [];
    for (let index = 0; index < elements.length; index++) {
        if (typeof elements[index] === "number" && elements[index] !== 0) {
            newArray.push(elements[index]);
        }
        if (typeof elements[index] === "string" && elements[index].length > 0) {
            newArray.push(elements[index]);
        }
    }
    console.log(newArray);
}

cleanArray([0, 1, false, 2, undefined, '', 3, null, "hello"]);
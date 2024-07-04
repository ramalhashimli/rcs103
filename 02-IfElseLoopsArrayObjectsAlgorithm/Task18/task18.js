function uniqueElements(arr) {
    let uniqueArray = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        let isUnique = true;
        for (let j = 0; j < uniqueArray.length; j++) {
            if (arr[i] === uniqueArray[j]) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            uniqueArray.push(arr[i]);
        }
    }
    console.log(uniqueArray);
}

uniqueElements([1, 2, 1, 2, 3]);
uniqueElements(["a", 2, "d", 2, "a", 14, 14, "s", false]);
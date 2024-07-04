function arraysMatch(arr1, arr2) {
    let matchCount = 0;

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                matchCount++;
                break;  
            }
        }
    }

    if (matchCount === arr1.length && arr1.length === arr2.length) {
        console.log("true");
    } else {
        console.log("false");
    }
}

arraysMatch([1, 2, 3, 4, false], [1, 2, 3, 4, false]);

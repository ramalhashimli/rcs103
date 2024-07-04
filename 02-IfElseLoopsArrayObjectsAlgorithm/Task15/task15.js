function joinArrayWithSymbol(arr, sep) {
    let resultString = "";
    for (let idx = 0; idx < arr.length - 1; idx++) {
        resultString += arr[idx] + sep;
    }
    resultString += arr[arr.length - 1];
    console.log(resultString);
}

joinArrayWithSymbol([1, 73, 99, 20], "*");
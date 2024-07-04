function fetchFirstElements(arr, count = 1) {
    let resultArray = [];
    for (let index = 0; index < count; index++) {
        resultArray.push(arr[index]);
    }
    console.log(resultArray);
}

fetchFirstElements([1, 73, 99, 20], 3);
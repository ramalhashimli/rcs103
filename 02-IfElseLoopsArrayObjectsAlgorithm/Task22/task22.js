function combineArrays(arr1, arr2, separator) {
    let result = '';
    const combined = arr1.concat(arr2);
    for (let i = 0; i < combined.length; i++) {
        if (i > 0) {
            result += separator;  
        }
        result += combined[i];
    }
    return result;
}


console.log(combineArrays([1, 2], [3, 4], '*'));

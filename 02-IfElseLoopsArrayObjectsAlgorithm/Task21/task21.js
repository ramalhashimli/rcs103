function addToArray(arr, index, str) {
    if (index >= arr.length) {
        arr.push(str);  
    } else {
        arr.splice(index, 0, str);  
    }
    return arr;  
}


console.log(addToArray(['a', 'salam', 'b', 'world'], 3, 'dev'));  
console.log(addToArray(['a', 'salam', 'b', 'world'], 5, 'dev'));  
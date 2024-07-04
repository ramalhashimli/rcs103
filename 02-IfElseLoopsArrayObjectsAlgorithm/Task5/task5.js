let arr=[3,8,2,5,4,10,7,6]
let min = arr[0]
let index;
for (let i = 0 ; i < arr.length ; i++) {
    if (arr[i] < min) {
        min = arr[i]
        index = i
    }
}

console.log(index)
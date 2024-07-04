let arr=[3,8,2,5,4,10,7,6]

let index_min = 0;
let index_max = 0;
let min = arr[index_min];
let max = arr[index_max];
let total = 0;

for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
        min = arr[i];
        index_min = i;
    }
    if (arr[i] > max) {
        max = arr[i];
        index_max = i;
    }
}
arr[index_min] = min;
arr[index_max] = max;
for (let i = 0; i < arr.length; i++) {
    if (arr[i] == min || arr[i] == max) {
        continue;
    }
    total+=arr[i];
}
console.log(total);
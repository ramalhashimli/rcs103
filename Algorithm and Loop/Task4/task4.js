let arr=[3,8,2,5,4,10,7,6]

let cut_ededler = [];

for (let i = 0; i < arr.length; i++){
    if (arr[i] % 2 == 0){
        cut_ededler.push(arr[i]);
    }
}
let max = cut_ededler[0]

for (let i = 0; i < cut_ededler.length; i++){
    if (cut_ededler[i] > max){
        max = cut_ededler[i];
    }
}

console.log(max);
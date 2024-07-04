let arr=[3,8,2,5,4,10,7,6]
let min = arr[0]
let max = arr[0]
let indexMin
let indexMax
for(let i = 0; i < arr.length; i++){
    if(arr[i] % 2 == 0){
        if(arr[i] < min){
            min = arr[i]
            indexMin = i
        }
    }
    if(arr[i] % 2 == 1){
        if(arr[i] > max){
            max = arr[i]
            indexMax = i
        }
        
    }
}
let temp
temp = arr[indexMin]
arr[indexMin] = arr[indexMax]
arr[indexMax] = temp

console.log(arr)
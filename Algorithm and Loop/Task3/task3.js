let arr=[3,8,2,5,4,10,7,6]

let max = arr[0];

for (let i = 0; i < arr.length; i++)
    if (arr[i]>max) {
        max = arr[i]        
    }

console.log(max)
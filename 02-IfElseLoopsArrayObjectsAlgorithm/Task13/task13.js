let myArray = [2,9,-5,-4,"AzerBayCan",true,12,"LANKARAN","LimOn",182,4];

for (let idx = 0; idx < myArray.length; idx++) {
    let uppercaseCount = 0;
    if (typeof myArray[idx] === "string") {
        let currentString = myArray[idx];
        for (let charIdx = 0; charIdx < currentString.length; charIdx++) {
            if (currentString[charIdx] === currentString[charIdx].toUpperCase()) {
                uppercaseCount++;
            }
        }
    }
    if (uppercaseCount > 2) {
        console.log(myArray[idx]);
    }
}

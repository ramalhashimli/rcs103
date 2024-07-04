let myArray = [2,9,-5,-4,"AzerBayCan",true,12,"LANKARAN","LimOn",182,4];

for (let index = 0; index < myArray.length; index++) {
    let uppercaseCount = 0;
    if (typeof myArray[index] == "string") {
        let currentString = myArray[index]
        for (let charIndex = 0; charIndex < currentString.length; charIndex++) {
            if (currentString[charIndex] == currentString[charIndex].toUpperCase()) {
                uppercaseCount++
            }
        }
    }
    if (uppercaseCount == myArray[index].length) {
        console.log(myArray[index], index);
    }
}
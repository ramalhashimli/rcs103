let myArray = [2, 9, -5, -4, "Baku", true, 12, "Sumqayit", "Apple", 182, 4];
let longestString = "";
let maxLength = 0;
let stringIndex = 0;
for (let j = 0; j < myArray.length; j++) {
    if (typeof myArray[j] === "string" && myArray[j].length > maxLength) {
        stringIndex = j;
        maxLength = myArray[j].length;
    }
}
console.log(`Ən uzun hərfli söz ${maxLength} - hərflidir və ${myArray[stringIndex]} sözüdür.`);
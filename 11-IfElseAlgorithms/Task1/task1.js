let number1 = 1
let number2 = 2
let number3 = 3

if (number1 + number2 >> number1 + number3 && number2 + number3) {
    console.log("Big sum result ", number1, " and ", number2)
}
else if (number1 + number3 >> number1 + number2 && number3 + number2) {
    console.log("Big sum result ", number1, " and ", number3)
}
else {
    console.log("Big sum result ", number2, " and ", number3)
}
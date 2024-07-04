let input = prompt("Mətn daxil edin:");

if (typeof input == "number") {
    console.log("Mətn bir number-dur");
}
else if (typeof input == "boolean") {
    console.log("Mətn bir boolean-dır");
}
else if (typeof input == "symbol") {
    console.log("Mətn bir symbol-dur");
}
else if (typeof input == "string") {
    console.log("Mətn bir stringdir");
}
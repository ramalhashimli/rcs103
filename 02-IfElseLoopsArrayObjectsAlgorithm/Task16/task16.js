function toggleCase(inputStr) {
    let resultStr = "";
    for (let idx = 0; idx < inputStr.length; idx++) {
        if (inputStr[idx] === inputStr[idx].toUpperCase()) {
            resultStr += inputStr[idx].toLowerCase();
        } else {
            resultStr += inputStr[idx].toUpperCase();
        }
    }
    console.log(resultStr);
}

toggleCase("SALaM");
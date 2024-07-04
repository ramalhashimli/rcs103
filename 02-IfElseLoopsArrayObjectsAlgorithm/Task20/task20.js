function calculateIndexSum(char, text) {
    let indexSum = 0;
    for (let idx = 0; idx < text.length; idx++) {
        if (text[idx] === char) {
            indexSum += idx;
        }
    }
    if (indexSum === 0) {
        console.log("-1");
    } else {
        console.log(indexSum);
    }
}

calculateIndexSum("a", "salam");
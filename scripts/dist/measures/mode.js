export function mode(dictionary, returnQuantity = false) {
    let maxQuantity = 1;
    for (const key in dictionary) {
        if (dictionary[key] > maxQuantity)
            maxQuantity = dictionary[key];
    }
    let mode = [];
    for (const key in dictionary) {
        if (dictionary[key] == maxQuantity)
            mode.push(parseInt(key));
    }
    if (returnQuantity == true)
        return maxQuantity;
    else
        return mode;
}
//# sourceMappingURL=mode.js.map
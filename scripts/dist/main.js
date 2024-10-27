var loadButton = document.getElementById("load-button");
var output = {
    average: document.getElementById("average"),
    median: document.getElementById("median"),
    mode: document.getElementById("mode")
};
loadButton.addEventListener("change", function (e) {
    var file = e.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            loadStatistics(content);
        };
        reader.readAsText(file);
    }
});
function loadStatistics(text) {
    var numbers = getNumbers(text);
    displayStatistics(numbers);
    output.average.textContent = avg(numbers) + "";
    output.median.textContent = median(numbers) + "";
    createTableOfNumbers(numbers);
}
function getNumbers(text) {
    if (text === void 0) { text = ""; }
    return text.split("").filter(function (char) { return !isNaN(parseInt(char)) || char == '.'; }).map(Number).sort();
}
function displayStatistics(numbers) {
    document.getElementById("values").innerHTML = numbers.join(", ");
}
function avg(numbers) {
    var sum = numbers.reduce(function (acc, num) { return acc + num; }, 0);
    return Math.round((sum / numbers.length) * 100) / 100;
}
function median(numbers) {
    var len = numbers.length;
    if (len % 2 == 0) {
        return (numbers[len / 2 - 1] + numbers[len / 2]) / 2;
    }
    else {
        return numbers[Math.floor(len / 2 - 1)];
    }
}
function mode(dictionary) {
    var maxQuantity = 1;
    for (var key in dictionary) {
        if (dictionary[key] > maxQuantity)
            maxQuantity = dictionary[key];
    }
    var mode = [];
    for (var key in dictionary) {
        if (dictionary[key] == maxQuantity)
            mode.push(parseInt(key));
    }
    return mode;
}
function createTableOfNumbers(numbers) {
    var counter = numbers.reduce(function (acc, num) {
        acc[num] = (acc[num] | 0) + 1;
        return acc;
    }, {});
    var row = document.querySelectorAll(".row");
    for (var key in counter) {
        row[0].innerHTML += "<td>".concat(key, "</td>");
        row[1].innerHTML += "<td>".concat(counter[key], "x</td>");
    }
    var mod = mode(counter);
    for (var i = 0; i < mod.length; i++) {
        output.mode.textContent += mod[i];
        if (i < mod.length - 1) {
            output.mode.textContent += ", ";
        }
    }
}
//# sourceMappingURL=main.js.map
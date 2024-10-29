var loadButton = document.getElementById("load-button");
var counter;
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
    counter = createCounter(numbers);
    displayStatistics(numbers);
    output.average.textContent = avg(numbers) + "";
    output.median.textContent = median(numbers) + "";
    createTableOfNumbers();
    createBarChart();
}
function getNumbers(text, separator) {
    if (text === void 0) { text = ""; }
    if (separator === void 0) { separator = ","; }
    var numbers = [];
    var number = "";
    for (var i = 0; i < text.length; i++) {
        if (text[i] != separator)
            number += text[i];
        else {
            numbers.push(number);
            number = "";
        }
    }
    numbers.push(number);
    return numbers.map(Number).sort(function (a, b) { return a - b; });
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
function mode(dictionary, returnQuantity) {
    if (returnQuantity === void 0) { returnQuantity = false; }
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
    if (returnQuantity == true)
        return maxQuantity;
    else
        return mode;
}
function createCounter(numbers) {
    return numbers.reduce(function (acc, num) {
        acc[num] = (acc[num] | 0) + 1;
        return acc;
    }, {});
}
function createTableOfNumbers() {
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
function createBarChart() {
    var barChart = document.getElementById("bar-chart");
    for (var i = 0; i <= mode(counter, true); i++) {
        barChart.innerHTML += "<tr class='row-bar-chart'></tr>";
    }
    var rows = document.querySelectorAll(".row-bar-chart");
    for (var key in counter) {
        rows[rows.length - 1].innerHTML += "<td>".concat(key, "</td>");
        var j = rows.length - 2;
        for (var i = 0; i < counter[key]; i++) {
            rows[j].innerHTML += "<td class=\"block\"></td>";
            j--;
        }
        for (var i = j; i >= 0; i--) {
            rows[i].innerHTML += "<td></td>";
        }
    }
}
//# sourceMappingURL=main.js.map
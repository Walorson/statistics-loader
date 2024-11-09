import { avg } from "./measures/avg.js";
import { gap } from "./measures/gap.js";
import { median } from "./measures/median.js";
import { createBarChart } from "./visualizations/barChart.js";
import { createTableOfNumbers } from "./visualizations/tableOfNumbers.js";
const loadButton = document.getElementById("load-button");
export let counter;
export let numbers;
export const output = {
    average: document.getElementById("average"),
    median: document.getElementById("median"),
    mode: document.getElementById("mode"),
    gap: document.getElementById("gap")
};
loadButton.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            loadStatistics(content);
        };
        reader.readAsText(file);
    }
});
function loadStatistics(text) {
    numbers = getNumbers(text);
    counter = createCounter(numbers);
    displayStatistics(numbers);
    output.average.textContent = avg(numbers) + "";
    output.median.textContent = median(numbers) + "";
    output.gap.textContent = gap(numbers) + "";
    createTableOfNumbers();
    createBarChart();
}
function getNumbers(text = "", separator = ",") {
    const numbers = [];
    let number = "";
    for (let i = 0; i < text.length; i++) {
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
function createCounter(numbers) {
    return numbers.reduce((acc, num) => {
        acc[num] = (acc[num] | 0) + 1;
        return acc;
    }, {});
}
//# sourceMappingURL=main.js.map
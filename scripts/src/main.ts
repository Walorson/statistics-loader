import { avg } from "./measures/avg.js";
import { gap } from "./measures/gap.js";
import { median } from "./measures/median.js";
import { mode } from "./measures/mode.js";
import { createBarChart } from "./visualizations/barChart.js";
import { createTableOfNumbers } from "./visualizations/tableOfNumbers.js";

const loadButton: HTMLElement = document.getElementById("load-button");
export let counter: {};
export let numbers: number[];
export const output = {
    average: document.getElementById("average"),
    median: document.getElementById("median"),
    mode: document.getElementById("mode"),
    gap: document.getElementById("gap")
}

loadButton.addEventListener("change", (e: any) => {
    const file = e.target.files[0];

    if(file)
    {
        const reader = new FileReader();
        reader.onload = function(e: any) {
            const content = e.target.result;
            loadStatistics(content);
        }

        reader.readAsText(file);
    }
});

function loadStatistics(text: string): void
{
    numbers = getNumbers(text);
    counter = createCounter(numbers);
    displayStatistics(numbers);

    output.average.textContent = avg(numbers) + "";
    output.median.textContent =  median(numbers) + "";
    output.gap.textContent = gap(numbers) + "";
    createTableOfNumbers();
    createBarChart();
}

function getNumbers(text: string = "", separator: string = ","): number[]
{
    const numbers: string[] = [];
    let number: string = "";

    for(let i=0; i < text.length; i++)
    {
        if(text[i] != separator)
            number += text[i];
        else {
            numbers.push(number);
            number = "";
        }
    }

    numbers.push(number);

    return numbers.map(Number).sort(function(a, b){return a-b});
}

function displayStatistics(numbers: number[]): void
{
    document.getElementById("values").innerHTML = numbers.join(", ");
}

function createCounter(numbers: number[]): {}
{
    return numbers.reduce((acc, num) => {
        acc[num] = (acc[num] | 0) + 1;
        return acc;
    }, {});
}
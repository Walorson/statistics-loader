const loadButton: HTMLElement = document.getElementById("load-button");
let counter: {};
const output = {
    average: document.getElementById("average"),
    median: document.getElementById("median"),
    mode: document.getElementById("mode")
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
    let numbers: number[] = getNumbers(text);
    counter = createCounter(numbers);
    displayStatistics(numbers);

    output.average.textContent = avg(numbers) + "";
    output.median.textContent =  median(numbers) + "";
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

function avg(numbers: number[]): number
{
    let sum: number = numbers.reduce((acc, num) => acc + num, 0);

    return Math.round((sum / numbers.length) * 100) / 100;
}

function median(numbers: number[]): number
{
    const len = numbers.length;

    if(len % 2 == 0)
    {
        return (numbers[len/2 - 1] + numbers[len/2]) / 2;
    }
    else
    {
        return numbers[Math.floor(len/2 - 1)];
    }
}

function mode(dictionary: {}, returnQuantity: boolean = false): any
{
    let maxQuantity: number = 1;
    for(const key in dictionary)
    {
        if(dictionary[key] > maxQuantity)
            maxQuantity = dictionary[key];
    }

    let mode: number[] = [];

    for(const key in dictionary)
    {
        if(dictionary[key] == maxQuantity)
            mode.push(parseInt(key));
    }

    if(returnQuantity == true)
        return maxQuantity;
    else return mode;
}

function createCounter(numbers: number[]): {}
{
    return numbers.reduce((acc, num) => {
        acc[num] = (acc[num] | 0) + 1;
        return acc;
    }, {});
}

function createTableOfNumbers(): void
{   
    const row = document.querySelectorAll(".row");

    for(const key in counter)
    {
        row[0].innerHTML += `<td>${key}</td>`;
        row[1].innerHTML += `<td>${counter[key]}x</td>`;
    }

    const mod: number[] = mode(counter);

    for(let i=0; i<mod.length; i++)
    {
        output.mode.textContent += mod[i];
        
        if(i < mod.length - 1) {
            output.mode.textContent += ", ";
        }
    }
}

function createBarChart()
{
    const barChart: HTMLElement = document.getElementById("bar-chart");

    for(let i = 0; i <= mode(counter, true); i++)
    {
        barChart.innerHTML += "<tr class='row-bar-chart'></tr>";
    }

    const rows: any = document.querySelectorAll(".row-bar-chart");

    for(const key in counter)
    {
        rows[rows.length - 1].innerHTML += `<td>${key}</td>`;

        let j: number = rows.length - 2;
        for(let i = 0; i < counter[key]; i++)
        {
            rows[j].innerHTML += `<td class="block"></td>`;
            j--;
        }

        for(let i = j; i >= 0; i--)
        {
            rows[i].innerHTML += `<td></td>`;
        }
    }
}
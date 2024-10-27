const loadButton: HTMLElement = document.getElementById("load-button");
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
    displayStatistics(numbers);

    output.average.textContent = avg(numbers) + "";
    output.median.textContent =  median(numbers) + "";
    createTableOfNumbers(numbers);
}

function getNumbers(text: string = ""): number[]
{
    return text.split("").filter(char => !isNaN(parseInt(char)) || char == '.').map(Number).sort();
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

function mode(dictionary: {}): number[]
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

    return mode;
}

function createTableOfNumbers(numbers: number[]): void
{
    const counter = numbers.reduce((acc, num) => {
        acc[num] = (acc[num] | 0) + 1;
        return acc;
    }, {});

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
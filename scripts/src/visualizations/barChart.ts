import { counter, numbers } from "../main.js";
import { median } from "../measures/median.js";
import { mode } from "../measures/mode.js";

export function createBarChart()
{
    const barChart: HTMLElement = document.getElementById("bar-chart");
    let maxQuantity: number = mode(counter, true);

    for(const key in counter)
    {
        barChart.innerHTML += `
            <div>
                <div class="bar" style="height: ${counter[key] * 20}px"></div>
                <div class="bar-name">${key}</div>
            </div>
        `
    }

    const chartLines = document.querySelectorAll(".chart-line");
    const chartLinesContainer = document.getElementById("chart-lines");

    chartLines[0].textContent = String(maxQuantity);
    chartLines[1].textContent = String(maxQuantity / 2);
    chartLines[2].textContent = "0";
    chartLinesContainer.style.height = (maxQuantity * 20)+"px";
}
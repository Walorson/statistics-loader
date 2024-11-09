import { counter, output } from "../main.js";
import { mode } from "../measures/mode.js";
export function createTableOfNumbers() {
    const row = document.querySelectorAll(".row");
    for (const key in counter) {
        row[0].innerHTML += `<td>${key}</td>`;
        row[1].innerHTML += `<td>${counter[key]}x</td>`;
    }
    const mod = mode(counter);
    for (let i = 0; i < mod.length; i++) {
        output.mode.textContent += mod[i];
        if (i < mod.length - 1) {
            output.mode.textContent += ", ";
        }
    }
}
//# sourceMappingURL=tableOfNumbers.js.map
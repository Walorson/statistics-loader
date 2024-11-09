export function avg(numbers) {
    let sum = numbers.reduce((acc, num) => acc + num, 0);
    return Math.round((sum / numbers.length) * 100) / 100;
}
//# sourceMappingURL=avg.js.map
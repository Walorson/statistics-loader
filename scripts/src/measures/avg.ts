export function avg(numbers: number[]): number
{
    let sum: number = numbers.reduce((acc, num) => acc + num, 0);

    return Math.round((sum / numbers.length) * 100) / 100;
}
export function median(numbers: number[]): number
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
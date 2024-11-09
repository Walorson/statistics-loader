export function mode(dictionary: {}, returnQuantity: boolean = false): any
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
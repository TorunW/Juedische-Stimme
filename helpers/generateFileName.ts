export function generateFileName<T>(fileName:T): string{
    const today = new Date();
    let month : number | string = today.getMonth();
    month += 1;
    month = month < 10 ? "0" + month : month;
    return `${today.getFullYear()}/${month}/${fileName}`;
}
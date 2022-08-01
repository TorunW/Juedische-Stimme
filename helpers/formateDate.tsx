<<<<<<< HEAD
export default function formateDate(value: any) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(value).toLocaleDateString('de-DE', options);
=======
export default function formateDate(value: string) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(value).toLocaleDateString('de-DE');
>>>>>>> 76356cd755c852d0fee4ff76ff60b703831516c0
}

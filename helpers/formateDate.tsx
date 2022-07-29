export default function formateDate(value: string) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(value).toLocaleDateString('de-DE', options);
}

export default function trimStringToLastSpace(string) {
  let trimmedString = string.substring(0, string.length - 1);
  let lastChar = trimmedString.charAt(trimmedString.length - 1);

  if (lastChar !== ' ') {
    return trimStringToLastSpace(trimmedString);
  } else {
    console.log(trimmedString, 'heheheh');
    return trimmedString;
  }
}

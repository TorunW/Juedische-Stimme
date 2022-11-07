export default function trimStringToLastSpace(string) {
  let trimmedString = string?.trim().substring(0, string.length - 1);
  let lastChar = trimmedString?.charAt(trimmedString.length - 1);

  if (trimmedString?.length > 200 && lastChar.endsWith(" ")) {
    return trimStringToLastSpace(trimmedString);
  } else {
    return trimmedString;
  }
}

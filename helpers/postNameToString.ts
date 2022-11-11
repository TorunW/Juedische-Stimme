export const postNameToString = (postName) => {
  return postName.toString().split(":__--__:").join("#");
};

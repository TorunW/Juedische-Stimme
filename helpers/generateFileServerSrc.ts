import { generateImageUrl } from "./imageUrlHelper";

export const generateFileServerSrc = (src) => {
  return `http://localhost:8080${generateImageUrl(src)}`;
};

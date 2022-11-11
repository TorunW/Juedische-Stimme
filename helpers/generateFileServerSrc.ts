import { generateImageUrl } from "./imageUrlHelper";

export const generateFileServerSrc = (src) => {
  return `https://juedische-stimme.com/public${generateImageUrl(src)}`;
};

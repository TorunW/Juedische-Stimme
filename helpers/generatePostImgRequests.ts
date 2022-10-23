import axios from "axios";
import { generateFileName } from "./generateFileName";
import { v4 as uuidv4 } from "uuid";

export function generatePostImgRequests(
  post,
  previewImageFile,
  nextPostId,
  config
) {
  const requestsArray = [];
  if (previewImageFile) {
    if (post) {
      if (post.post_image && post.post_image !== null) {
        const deleteFileUrl = `http://${window.location.hostname}${
          window.location.port !== "80" ? ":" + window.location.port : ""
        }/media/${post.post_image.split("/").join("+++")}`;
        const deleteFileRequest = axios.delete(deleteFileUrl);
        requestsArray.push(deleteFileRequest);
      }
    }
    let fileType =
      previewImageFile.name.split(".")[previewImageFile.name.split.length - 1];
    let fileName =
      previewImageFile.name.split(`.${fileType}`)[0] +
      `__${uuidv4()}.${fileType}`;
    const postImageUrl = `/api/posts/${post ? +post.postId : nextPostId}/image`;
    const postImageData = {
      meta_value: generateFileName(fileName),
      image_number: 1,
    };

    const postImageRequest =
      post && post.post_image
        ? axios.put(postImageUrl, postImageData)
        : axios.post(postImageUrl, postImageData);
    requestsArray.push(postImageRequest);
    const formData = new FormData();
    formData.append("theFiles", previewImageFile, fileName);
    const postImageFileRequest = axios.post("/api/uploads", formData, config);
    requestsArray.push(postImageFileRequest);
  }
  return requestsArray;
}

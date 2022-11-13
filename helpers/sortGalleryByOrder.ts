export function sortGalleryByOrder(a, b) {
  if (parseInt(a.image_order) < parseInt(b.image_order)) {
    return -1;
  }
  if (parseInt(a.image_order) > parseInt(b.image_order)) {
    return 1;
  }
  return 0;
}

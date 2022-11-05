import React, { useEffect } from 'react';

import Gallery from '@/components/gallery/Gallery';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';

const Board: LayoutPage = (props: LayoutPageProps, gallery) => {
  let [galleryImages, setGalleryImages] = React.useState([]);

  useEffect(() => {
    if (gallery !== null) getGalleryImages();
  }, [gallery]);

  async function getGalleryImages() {
    const res = await fetch(`/api/galleryimage/${gallery.gallery_id}`);
    const data = await res.json();
    setGalleryImages(data);
  }
  return (
    <main>
      {galleryImages.length > 0 ? <Gallery images={galleryImages} /> : ''}
    </main>
  );
};

Board.layout = 'main';

export default Board;

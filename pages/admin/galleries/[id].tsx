import { useEffect } from 'react';
import excuteQuery from 'lib/db';
import { selectGalleryById, selectGalleryImagesByGalleryId } from 'lib/queries';
import GalleryForm from 'components/admin/galleries/GalleryForm';
import styles from 'styles/Home.module.css';

import { useDispatch, useSelector } from 'store/hooks';
import { setGallery } from 'store/galleries/galleriesSlice';
import AdminTopBar from '@/components/atoms/AdminTopBar';

export default function EditGalleryPage(props) {
  const dispatch = useDispatch();

  const { gallery } = useSelector((state) => state.galleries);

  useEffect(() => {
    dispatch(
      setGallery({
        gallery: JSON.parse(props.gallery)[0],
        images: JSON.parse(props.galleryImages),
      })
    );
  }, [props.gallery]);

  return (
    <div>
      <AdminTopBar title='Edit Gallery' />
      {gallery ? <GalleryForm gallery={gallery} /> : ''}
    </div>
  );
}

EditGalleryPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  const galleryResponse = await excuteQuery({
    query: selectGalleryById(context.query.id),
  });
  const gallery = JSON.stringify(galleryResponse);
  const galleryImagesResponse = await excuteQuery({
    query: selectGalleryImagesByGalleryId(context.query.id),
  });
  const galleryImages = JSON.stringify(galleryImagesResponse);
  return {
    props: {
      gallery,
      galleryImages,
    },
  };
};

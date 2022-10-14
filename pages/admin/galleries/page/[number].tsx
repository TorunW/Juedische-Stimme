import { useEffect } from 'react';
import excuteQuery from 'lib/db';
import { selectGalleries } from 'lib/queries';
import styles from 'styles/Home.module.css';
import Galleries from 'components/admin/galleries/Galleries';

import { useDispatch, useSelector } from 'store/hooks';
import { setGalleries } from 'store/galleries/galleriesSlice';
import AdminTopBar from '@/components/atoms/AdminTopBar';

export default function AdminGalleriesPage(props) {
  const dispatch = useDispatch();
  const { galleries } = useSelector((state) => state.galleries);

  useEffect(() => {
    dispatch(setGalleries(JSON.parse(props.galleries)));
  }, [props.galleries]);

  return (
    <div>
      <AdminTopBar title='Galleries List' />
      {galleries ? <Galleries galleries={galleries} /> : ''}
    </div>
  );
}

AdminGalleriesPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  const galleriesResponse = await excuteQuery({
    query: selectGalleries(50, context.query.number),
  });
  const galleries = JSON.stringify(galleriesResponse);
  return {
    props: {
      galleries,
      pageNum: context.query.number,
    },
  };
};

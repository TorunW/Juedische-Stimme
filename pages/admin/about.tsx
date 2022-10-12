// import styles from 'styles/Home.module.css'
import AdminTopBar from '@/components/atoms/AdminTopBar';
import AboutInfoForm from 'components/admin/AboutInfoForm';
import excuteQuery from 'lib/db';
import { selectGalleries } from 'lib/queries';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGalleries } from 'store/galleries/galleriesSlice';

export default function AboutInfoPage(props) {
  const dispatch = useDispatch();
  const aboutInfo = JSON.parse(props.aboutInfo)[0];
  useEffect(() => {
    dispatch(setGalleries(JSON.parse(props.galleries)));
  }, []);
  return (
    <>
      <AdminTopBar title='Edit About Us Section' />
      <AboutInfoForm aboutInfo={aboutInfo} />
    </>
  );
}

AboutInfoPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  const aboutInfoResponse = await excuteQuery({
    query: `SELECT * FROM js_about_info LIMIT 1`,
  });
  const aboutInfo = JSON.stringify(aboutInfoResponse);
  const galleriesResponse = await excuteQuery({
    query: selectGalleries(50, context.query.number),
  });
  const galleries = JSON.stringify(galleriesResponse);
  return {
    props: {
      aboutInfo,
      galleries,
    },
  };
};

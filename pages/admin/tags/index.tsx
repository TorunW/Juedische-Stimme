import { useEffect } from 'react';
import { selectTags } from 'lib/queries';
import excuteQuery from 'lib/db';
import styles from 'styles/Home.module.css';
import { useDispatch, useSelector } from 'store/hooks';
import { setTags } from 'store/tags/tagsSlice';
import AdminTags from 'components/admin/Tags';
import AdminTopBar from '@/components/atoms/AdminTopBar';

export default function AdminTagsPage(props) {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(setTags(JSON.parse(props.tags)));
  }, []);

  return (
    <div className={styles.container}>
      <AdminTopBar title='Tags List' />
      {tags ? <AdminTags tags={tags} /> : ''}
    </div>
  );
}

AdminTagsPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  const tagsResponse = await excuteQuery({
    query: selectTags(),
  });
  const tags = JSON.stringify(tagsResponse);
  return {
    props: {
      tags,
    },
  };
};

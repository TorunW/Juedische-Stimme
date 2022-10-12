import { useEffect } from 'react';
import excuteQuery from 'lib/db';
import { selectTag } from 'lib/queries';
import styles from 'styles/Home.module.css';
import { useDispatch, useSelector } from 'store/hooks';
import { setTag } from 'store/tags/tagsSlice';
import TagForm from 'components/admin/TagForm';
import AdminTopBar from '@/components/atoms/AdminTopBar';

export default function EditTagPage(props) {
  const dispatch = useDispatch();
  const { tag } = useSelector((state) => state.tags);
  console.log(tag, 'tagss');
  useEffect(() => {
    dispatch(setTag(JSON.parse(props.tag)[0]));
  }, [props.tag]);

  return (
    <div className={styles.container}>
      <AdminTopBar title={tag === undefined ? 'Create Tag' : 'Edit Tag'} />
      {tag !== null ? <TagForm tag={tag} /> : ''}
    </div>
  );
}

EditTagPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  const tagResponse = await excuteQuery({
    query: selectTag({ tagId: context.query.id }),
  });
  const tag = JSON.stringify(tagResponse);
  return {
    props: {
      tag,
    },
  };
};

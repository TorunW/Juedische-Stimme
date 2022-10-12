import { useEffect } from 'react';
import styles from 'styles/Home.module.css';
import excuteQuery from 'lib/db';
import CategoryForm from 'components/admin/CategoryForm';
import { selectCategory } from 'lib/queries';
import { useDispatch, useSelector } from 'store/hooks';
import { setCategory } from 'store/categories/categoriesSlice';
import AdminTopBar from '@/components/atoms/AdminTopBar';

export default function EditCategoryPage(props) {
  // const { state, dispatch } = useContext(Context);
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(setCategory(JSON.parse(props.category)[0]));
  }, [props.category]);
  return (
    <>
      <AdminTopBar title='Edit Category' />
      {category ? <CategoryForm category={category} /> : ''}
    </>
  );
}

EditCategoryPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  const categoryResponse = await excuteQuery({
    query: selectCategory({ categoryId: context.query.id }),
  });
  const category = JSON.stringify(categoryResponse);
  return {
    props: {
      category: category,
    },
  };
};

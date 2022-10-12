import { useEffect } from 'react';
import styles from 'styles/Home.module.css';
import excuteQuery from 'lib/db';
import { selectCategories } from 'lib/queries';
import AdminCategories from 'components/admin/Categories';

import { useDispatch, useSelector } from 'react-redux';
import { setCatgories } from 'store/categories/categoriesSlice';
import AdminTopBar from '@/components/atoms/AdminTopBar';

export default function AdminCategoriesPage(props) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(setCatgories(JSON.parse(props.categories)));
  }, [props.categories]);
  let categoriesDisplay;
  if (categories) {
    categoriesDisplay = <AdminCategories categories={categories} />;
  }
  return (
    <div>
      <AdminTopBar title='Categories List' />
      {categoriesDisplay}
    </div>
  );
}

AdminCategoriesPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  const categoriesResponse = await excuteQuery({
    query: selectCategories(50, context.query.number),
  });
  // console.log(categoriesResponse, " CAT RES")
  const categories = JSON.stringify(categoriesResponse);
  return {
    props: {
      categories,
      pageNum: context.query.number,
    },
  };
};

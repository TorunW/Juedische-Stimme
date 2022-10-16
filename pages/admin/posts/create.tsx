import { useEffect } from 'react';

import styles from 'styles/Home.module.css';
import excuteQuery from 'lib/db';
import PostForm from 'components/admin/posts/PostForm';
import { selectCategories } from 'lib/queries';

import { useDispatch, useSelector } from 'store/hooks';
import { setCatgories } from 'store/categories/categoriesSlice';
import { getCookie, hasCookie } from 'cookies-next';
import { selectUserByEmail } from 'lib/queries/users';
import { setLoggedUser } from 'store/users/usersSlice';
import AdminTopBar from '@/components/atoms/AdminTopBar';

export default function CreatePostPage(props) {


  console.log(props, " PROPS ")

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    if (props.loggedUser)
      dispatch(setLoggedUser(JSON.parse(props.loggedUser)[0]));
    dispatch(setCatgories(JSON.parse(props.categories)));
  }, []);

  let nextPostId =
    JSON.parse(props.nextPostId).length > 0
      ? JSON.parse(props.nextPostId)[0].max_id
      : '';

  return (
    <div className={styles.container}>
      <AdminTopBar title='New Post' />
      <PostForm nextPostId={nextPostId} categories={categories} />
    </div>
  );
}

CreatePostPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  let userEmail: string;
  if (!hasCookie('Token', { req: context.req, res: context.res })) {
    return { redirect: { destination: '/login', permanent: false } };
  } else {
    userEmail = getCookie('UserEmail', {
      req: context.req,
      res: context.res,
    }).toString();
  }

  let loggedUser: string;
  if (userEmail) {
    const userResponse = await excuteQuery({
      query: selectUserByEmail(userEmail),
    });
    loggedUser = JSON.stringify(userResponse);
  }

  const nextPostIdResponse = await excuteQuery({
    query: ` SELECT max_id FROM js_maxids WHERE js_maxids.table='posts' ORDER BY js_maxids.ID DESC LIMIT 1`,
  });
  const nextPostId = JSON.stringify(nextPostIdResponse);

  const categoriesResponse = await excuteQuery({
    query: selectCategories(50, context.query.number),
  });
  const categories = JSON.stringify(categoriesResponse);
  return {
    props: {
      nextPostId,
      categories,
      loggedUser,
    },
  };
};

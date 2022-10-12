import { useEffect } from 'react';
import styles from 'styles/Home.module.css';
import excuteQuery from 'lib/db';
import PostForm from '@/components/admin/posts/PostForm';
import { selectPostByName } from 'lib/queries/posts';
import { selectCategories, selectGalleries } from 'lib/queries';

import { useDispatch, useSelector } from 'store/hooks';
import { setPost } from 'store/posts/postsSlice';
import { setCatgories } from 'store/categories/categoriesSlice';
import { setGalleries } from 'store/galleries/galleriesSlice';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import { setLanguages } from 'store/languages/languagesSlice';
import { getCookie, hasCookie } from 'cookies-next';
import { selectUserByEmail } from 'lib/queries/users';
import { setLoggedUser } from 'store/users/usersSlice';
import AdminTopBar from '@/components/atoms/AdminTopBar';

const EditPostPage: LayoutPage = (props: LayoutPageProps) => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);

  useEffect(() => {
    if (props.loggedUser)
      dispatch(setLoggedUser(JSON.parse(props.loggedUser)[0]));
    dispatch(setPost(JSON.parse(props.post)[0]));
    dispatch(setCatgories(JSON.parse(props.categories)));
    dispatch(setGalleries(JSON.parse(props.galleries)));
    dispatch(
      setLanguages({
        locales: props.locales,
        locale: props.locale,
        defaultLocale: props.defaultLocale,
      })
    );
  }, [props.post]);

  return (
    <div className={styles.container}>
      <AdminTopBar title={'Edit Post'} />
      {post ? <PostForm post={post} /> : ''}
    </div>
  );
};

EditPostPage.layout = 'admin';

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

  const postsResponse = await excuteQuery({
    query: selectPostByName({
      name: context.query.name.toString().split(':__--__:').join('#'),
      showUnpublished: true,
      locales: context.locales.filter(
        (l: string) => l !== context.defaultLocale
      ),
    }),
  });
  const post = JSON.stringify(postsResponse);
  const categoriesResponse = await excuteQuery({
    query: selectCategories(50, context.query.number),
  });
  const categories = JSON.stringify(categoriesResponse);
  const galleriesResponse = await excuteQuery({
    query: selectGalleries(50, context.query.number),
  });
  const galleries = JSON.stringify(galleriesResponse);

  return {
    props: {
      post,
      categories,
      galleries,
      locales: context.locales,
      locale: context.locale,
      defaultLocale: context.defaultLocale,
      loggedUser,
    },
  };
};

export default EditPostPage;

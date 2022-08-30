import { useEffect } from 'react';
import excuteQuery from 'lib/db';
import { countPostsByTag, selectPostsByTag } from 'lib/queries/posts';
import { selectCategories } from 'lib/queries';
import {selectMenuItems} from 'lib/queries/menuItems'
import Posts from '@/components/posts/Posts';
import styles from 'styles/Home.module.css';
import SearchFilter from 'components/SearchFilter';

import { useDispatch, useSelector } from 'store/hooks';
import { setPosts, setPostsPagination } from 'store/posts/postsSlice';
import { setCatgories } from 'store/categories/categoriesSlice';
import { setMenuItems } from 'store/nav/navSlice';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import { setLanguages } from 'store/languages/languagesSlice';

const CategoryPostsPage: LayoutPage = (props: LayoutPageProps) => {
  const dispatch = useDispatch();
  const { posts, postsCount, postsPerPage } = useSelector((state) => state.posts);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(setPosts(JSON.parse(props.posts)));
    dispatch(setPostsPagination({postsPerPage:props.postsPerPage,postsCount:props.postsCount}))
    dispatch(setCatgories(JSON.parse(props.categories)));
    dispatch(setMenuItems(JSON.parse(props.navItems)));
    dispatch(
      setLanguages({
        locales: props.locales,
        locale: props.locale,
        defaultLocale: props.defaultLocale,
      })
    );
  }, [props.posts]);

  return (
    <main id="category-posts-page">
    <section className={styles.container}>
      {categories ? (
        <SearchFilter
          phrase={''}
          categoryName={props.categoryName}
          categories={categories}
        />
      ) : (
        ''
      )}0
      <Posts posts={posts} title={props.categoryName} pageNum={props.pageNum} postsCount={postsCount} postsPerPage={postsPerPage} />
    </section>
    </main>
  );
};

CategoryPostsPage.layout = 'main';

export const getServerSideProps = async (context) => {
  const navItemsResponse = await excuteQuery({
    query: selectMenuItems(),
  });
  const navItems = JSON.stringify(navItemsResponse);

  const categoryCountReponse = await excuteQuery({
    query:countPostsByTag({
      slug: context.query.name.split(' ').join('-').toLowerCase(),
      isCategory: true,
    })
  })

  const postsResponse = await excuteQuery({
    query: selectPostsByTag({
      slug: context.query.name.split(' ').join('-').toLowerCase(),
      numberOfPosts: 10,
      pageNum: context.query.number,
      isCategory: true,
      locale: context.locale !== context.defaultLocale ? context.locale : '',
    }),
  });
  const posts = JSON.stringify(postsResponse);
  const categoriesResponse = await excuteQuery({
    query: selectCategories(100),
  });

  const categories = JSON.stringify(categoriesResponse);
  return {
    props: {
      posts,
      postsCount:categoryCountReponse[0]['COUNT(*)'],
      postsPerPage:10,
      categories,
      categoryName: context.query.name,
      pageNum: parseInt(context.query.number),
      navItems,
      locales: context.locales,
      locale: context.locale,
      defaultLocale: context.defaultLocale,
    },
  };
};

export default CategoryPostsPage;

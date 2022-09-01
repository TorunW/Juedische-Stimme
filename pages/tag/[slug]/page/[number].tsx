import { useEffect } from 'react';
import excuteQuery from 'lib/db';
import { countPostsByTag, selectPosts } from 'lib/queries/posts';
import { selectMenuItems } from 'lib/queries/menuItems';
import Posts from '@/components/posts/Posts';
import styles from 'styles/Home.module.css';

import { useDispatch, useSelector } from 'store/hooks';
import { setPosts, setPostsPagination } from 'store/posts/postsSlice';
import { setMenuItems } from 'store/nav/navSlice';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import { setLanguages } from 'store/languages/languagesSlice';
import { selectCategories, selectTag } from 'lib/queries';
import { setCatgories } from 'store/categories/categoriesSlice';
import { setTag } from 'store/tags/tagsSlice';

const TagPostsPage: LayoutPage = (props: LayoutPageProps) => {
  const dispatch = useDispatch();
  const { posts, postsCount, postsPerPage } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(setPosts(JSON.parse(props.posts)));
    dispatch(setPostsPagination({postsPerPage:props.postsPerPage,postsCount:props.postsCount}))
    dispatch(setCatgories(JSON.parse(props.categories)));
    dispatch(setTag(JSON.parse(props.tag)[0]));
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
    <main id="tag-posts-page">
      <section className={styles.container + ' ' + styles.postsContainer}>
      <Posts posts={posts} type={"tag"} title={props.slug} pageNum={props.pageNum} postsCount={postsCount} postsPerPage={postsPerPage} />
      </section>
    </main>
  );
};

TagPostsPage.layout = 'main';

export const getServerSideProps = async (context) => {
  const navItemsResponse = await excuteQuery({
    query: selectMenuItems(),
  });
  const navItems = JSON.stringify(navItemsResponse);

  const tagResponse = await excuteQuery({
    query: selectTag({slug:context.query.slug})
  });
  const tag = JSON.stringify(tagResponse);

  const categoriesResponse = await excuteQuery({
    query: selectCategories(100),
  });

  const categories = JSON.stringify(categoriesResponse);

  const postsResponse = await excuteQuery({
    query: selectPosts({
      slug: context.query.slug,
      numberOfPosts: 10,
      pageNum: context.query.number,
      locale: context.locale !== context.defaultLocale ? context.locale : '',
    }),
  });
  const posts = JSON.stringify(postsResponse);
  return {
    props: {
      posts,
      postsCount:tagResponse[0].count,
      postsPerPage:10,
      slug: context.query.slug,
      pageNum: parseInt(context.query.number),
      navItems,
      locales: context.locales,
      locale: context.locale,
      defaultLocale: context.defaultLocale,
      categories,
      tag
    },
  };
};

export default TagPostsPage;

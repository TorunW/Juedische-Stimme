import { useEffect } from 'react';
import excuteQuery from 'lib/db';
import { countPostsByTag, selectPosts } from 'lib/queries/posts';
import { selectCategories, selectCategory } from 'lib/queries';
import {selectMenuItems} from 'lib/queries/menuItems'
import Posts from '@/components/posts/Posts';
import styles from 'styles/Home.module.css';

import { useDispatch, useSelector } from 'store/hooks';
import { setPosts, setPostsPagination } from 'store/posts/postsSlice';
import { setCatgories, setCategoryName, setCategory } from 'store/categories/categoriesSlice';
import { setMenuItems } from 'store/nav/navSlice';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import { setLanguages } from 'store/languages/languagesSlice';

const CategoryPostsPage: LayoutPage = (props: LayoutPageProps) => {
  const dispatch = useDispatch();
  const { posts, postsCount, postsPerPage, pageNum } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(setMenuItems(JSON.parse(props.navItems)));
    dispatch(
      setLanguages({
        locales: props.locales,
        locale: props.locale,
        defaultLocale: props.defaultLocale,
      })
    );
    dispatch(setPosts(JSON.parse(props.posts)));
    dispatch(setPostsPagination({postsPerPage:props.postsPerPage,postsCount:props.postsCount, pageNum:props.pageNum}))
    dispatch(setCatgories(JSON.parse(props.categories)));
    dispatch(setCategory(JSON.parse(props.category)[0]));
    dispatch(setCategoryName(props.categoryName));
  }, [props.posts]);

  return (
    <main id="category-posts-page">
      <section className={styles.container + ' ' + styles.postsContainer}>
        <Posts 
          posts={posts}
          type={"category"} 
          title={props.categoryName} 
          pageNum={pageNum} 
          postsCount={postsCount} 
          postsPerPage={postsPerPage} 
        />
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

  const categoryResponse = await excuteQuery({
    query: selectCategory({categoryName:context.query.name})
  });
  console.log(categoryResponse, " CATEGORY RESPONSE ")
  const category = JSON.stringify(categoryResponse);

  const categoryCountResponse = await excuteQuery({
    query:countPostsByTag({
      slug: context.query.name.split(' ').join('-').toLowerCase(),
      isCategory: true,
    })
  })

  const postsResponse = await excuteQuery({
    query: selectPosts({
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
      postsCount:categoryResponse[0].count,
      postsPerPage:10,
      categories,
      categoryName: context.query.name,
      category:category,
      pageNum: parseInt(context.query.number),
      navItems,
      locales: context.locales,
      locale: context.locale,
      defaultLocale: context.defaultLocale,
    },
  };
};

export default CategoryPostsPage;

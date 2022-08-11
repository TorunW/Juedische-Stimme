import { useEffect } from 'react';
import excuteQuery from 'lib/db';
import { selectPostsBySearchPhrase } from 'lib/queries/posts';
import { selectMenuItems, selectCategories } from 'lib/queries';
import Posts from '@/components/posts/Posts';
import styles from 'styles/Home.module.css';
import { useDispatch, useSelector } from 'store/hooks';
import { setPosts } from 'store/posts/postsSlice';
import { setMenuItems } from 'store/nav/navSlice';
import SearchFilter from 'components/SearchFilter';
import { setCatgories } from 'store/categories/categoriesSlice';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import { setLanguages } from 'store/languages/languagesSlice';

const SearchPhrasePostsPage: LayoutPage = (props: LayoutPageProps) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(setMenuItems(JSON.parse(props.navItems)));
    dispatch(setCatgories(JSON.parse(props.categories)));
    dispatch(setPosts(JSON.parse(props.posts)));
    dispatch(
      setLanguages({
        locales: props.locales,
        locale: props.locale,
        defaultLocale: props.defaultLocale,
      })
    );
  }, [props.posts]);

  return (
    <div className={styles.container}>
      {categories ? (
        <SearchFilter
          categoryName={props.categoryName}
          phrase={props.phrase}
          categories={categories}
        />
      ) : (
        ''
      )}
      {posts && posts.length > 0 ? (
        <Posts posts={posts} phrase={props.phrase} />
      ) : (
        <h2>nothing found for {'"' + props.phrase + '"'}!</h2>
      )}
    </div>
  );
};

SearchPhrasePostsPage.layout = 'main';

export const getServerSideProps = async (context) => {
  const navItemsResponse = await excuteQuery({
    query: selectMenuItems(),
  });
  const navItems = JSON.stringify(navItemsResponse);
  const postsResponse = await excuteQuery({
    query: selectPostsBySearchPhrase({
      phrase: context.query.phrase,
      numberOfPosts: 10,
      number: context.query.number,
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
      posts: posts,
      phrase: context.query.phrase,
      pageNum: context.query.number,
      navItems,
      categories,
    },
  };
};

export default SearchPhrasePostsPage;

import { useEffect } from "react";
import excuteQuery from "lib/db";
import { selectPostsBySearchPhrase } from "lib/queries/posts";
import { selectCategories } from "lib/queries";

import Posts from "@/components/posts/Posts";
import styles from "styles/Home.module.css";
import { useDispatch, useSelector } from "store/hooks";
import { setPosts } from "store/posts/postsSlice";
import { setMenuItems } from "store/nav/navSlice";
import { setCatgories } from "store/categories/categoriesSlice";
import { LayoutPage } from "types/LayoutPage.type";
import { LayoutPageProps } from "types/LayoutPageProps.type";
import { setLanguages } from "store/languages/languagesSlice";
import { createServerSideProps } from "page/server-side-props";
import { HomePageProps } from "pages";

export const getServerSideProps = createServerSideProps<HomePageProps>(
  async ({ context, data: { navItems, locale } }) => {
    const postsResponse = await excuteQuery({
      query: selectPostsBySearchPhrase({
        phrase: context.query.phrase,
        numberOfPosts: 10,
        number: context.query.number,
        locales: context.locales,
        locale: locale !== context.defaultLocale ? locale : "",
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
        locales: context.locales,
        locale,
        defaultLocale: context.defaultLocale,
      },
    };
  }
);

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
    <main
      id="search-page"
      style={{ padding: "0px" }}
    >
      <section className={styles.container}>
        <Posts
          posts={posts}
          title={"Search"}
          phrase={props.phrase}
          pageNum={props.pageNum}
        />
      </section>
    </main>
  );
};

SearchPhrasePostsPage.layout = "main";

export default SearchPhrasePostsPage;

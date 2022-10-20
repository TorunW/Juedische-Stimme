import { ReactElement, useEffect } from "react";
import excuteQuery from "lib/db";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { selectPostByName } from "lib/queries/posts";
import { setMenuItems } from "store/nav/navSlice";
import { LayoutPage } from "types/LayoutPage.type";
import { LayoutPageProps } from "types/LayoutPageProps.type";
import { setLanguages } from "store/languages/languagesSlice";
import { setPost } from "store/posts/postsSlice";
import PostPage from "components/posts/PostPage";
import { createServerSideProps } from "page/server-side-props";
import { HomePageProps } from "pages";

export const getServerSideProps = createServerSideProps<HomePageProps>(
  async ({ context, data: { navItems } }) => {
    const pageResponse = await excuteQuery({
      query: selectPostByName({
        name: context.query.name.toString().split(":__--__:").join("#"),
        locale: context.locale,
        showUnpublished: true,
      }),
    });
    const page = JSON.stringify(pageResponse);

    return {
      props: {
        page,
        navItems,
        locale: context.locale,
        defaultLocale: context.defaultLocale,
      },
    };
  }
);

const ContentPage: LayoutPage = (props: LayoutPageProps) => {
  let page = null;
  if (JSON.parse(props.page)[0]) page = JSON.parse(props.page)[0];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMenuItems(JSON.parse(props.navItems)));
    dispatch(
      setLanguages({
        locales: props.locales,
        locale: props.locale,
        defaultLocale: props.defaultLocale,
      })
    );
    if (page) {
      dispatch(setPost(JSON.parse(props.page)[0]));
    }
  }, [props.page]);

  let headDisplay: ReactElement;
  if (page && page !== null) {
    headDisplay = (
      <Head>
        <title>{page.post_title}</title>
        <meta
          property="og:title"
          content={page.post_title}
          key="title"
        />
        <meta
          property="og:keywords"
          key="keywords"
          name="keywords"
          content={page.tagNames !== null ? page.tagNames : page.post_title}
        />
        <meta
          property="og:description"
          key="description"
          name="description"
          content={page.post_content?.substring(0, 200)}
        />
      </Head>
    );
  }

  return (
    <main id="post-page">
      <section>
        {headDisplay}
        <PostPage post={page} />
      </section>
    </main>
  );
};

ContentPage.layout = "main";

export default ContentPage;

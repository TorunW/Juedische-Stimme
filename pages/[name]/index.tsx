import PostPage from "components/posts/PostPage";
import { postNameToString } from "helpers/postNameToString";
import excuteQuery from "lib/db";
import { selectPostByName } from "lib/queries/posts";
import Head from "next/head";
import { createServerSideProps } from "page/server-side-props";
import { HomePageProps } from "pages";
import { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLabels } from "store/labels/labelsSlice";
import { setLanguages } from "store/languages/languagesSlice";
import { setMenuItems } from "store/nav/navSlice";
import { setPost } from "store/posts/postsSlice";
import { LayoutPage } from "types/LayoutPage.type";
import { LayoutPageProps } from "types/LayoutPageProps.type";

export const getServerSideProps = createServerSideProps<HomePageProps>(
  async ({ context, data: { navItems, labels, locale } }) => {
    const pageResponse = await excuteQuery({
      query: selectPostByName({
        name: postNameToString(context.query.name),
        locale,
        showUnpublished: true,
      }),
    });
    const page = JSON.stringify(pageResponse);
    return {
      props: {
        page,
        navItems,
        locale,
        defaultLocale: context.defaultLocale,
        labels,
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
    dispatch(setLabels(JSON.parse(props.labels)));

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
          content={`Juedische Stimme | ${page.post_title}`}
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
          content={page.post_content
            ?.substring(0, 200)
            .replace(/<[^>]*>?/gm, "")}
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

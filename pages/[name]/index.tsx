import { ReactElement, useEffect } from 'react';
import excuteQuery from 'lib/db';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Post from '@/components/posts/PostPage';
import { selectPostByName } from 'lib/queries/posts';
import { selectMenuItems } from 'lib/queries/menuItems';
import { setMenuItems } from 'store/nav/navSlice';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import { NextPageContext } from 'next';
import { setLanguages } from 'store/languages/languagesSlice';
import { setPost } from 'store/posts/postsSlice';

const ContentPage: LayoutPage = (props: LayoutPageProps) => {
  let page = JSON.parse(props.page)[0];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMenuItems(JSON.parse(props.navItems)));
    dispatch(setPost(JSON.parse(props.page)[0]))
    dispatch(
      setLanguages({
        locales: props.locales,
        locale: props.locale,
        defaultLocale: props.defaultLocale,
      })
    );
  }, [props.page]);

  // console.log(page, " PROPST PAGE")

  let headDisplay: ReactElement;
  if (page && page !== null){
    headDisplay = (
      <Head>
        <title>{page.post_title}</title>
        <meta property="og:title" content={page.post_title} key="title" />
        <meta property="og:keywords" key="keywords" name="keywords" content={page.tagNames !== null ? page.tagNames : page.post_title}/>
        <meta property="og:description" key="description" name="description" content={page.post_content.substring(0,200)}/>
      </Head>
    )
  }

  return (
    <main id="post-page">
      <section>
        {headDisplay}
        <Post post={page} />
      </section>
    </main>
  );
};

ContentPage.layout = 'main';

export const getServerSideProps = async (context: NextPageContext) => {

  const navItemsResponse = await excuteQuery({
    query: selectMenuItems(),
  });
  const navItems = JSON.stringify(navItemsResponse);

  const pageResponse = await excuteQuery({
    query: selectPostByName({
      name: context.query.name.toString().split(':__--__:').join('#'),
      locale: context.locale,
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
};

export default ContentPage;

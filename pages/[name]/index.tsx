import { ReactElement, useEffect } from 'react';
import excuteQuery from 'lib/db';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import { selectPostByName } from 'lib/queries/posts';
import { selectMenuItems } from 'lib/queries/menuItems';
import { setMenuItems } from 'store/nav/navSlice';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import { NextPageContext } from 'next';
import { setLanguages } from 'store/languages/languagesSlice';
import { setPost } from 'store/posts/postsSlice';
import dynamic from 'next/dynamic'

const PostPage = dynamic(() => import('@/components/posts/PostPage'), {
  ssr: false,
});

const ContentPage: LayoutPage = (props: LayoutPageProps) => {

  let page = {
    ...JSON.parse(props.page)[0],
    stripeProducts: props.stripeProducts ? JSON.parse(props.stripeProducts) : null
  }
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
        <PostPage post={page} />
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

  let stripeProducts = null;
  if (context.query.name === "spenden"){
    const stripeProductsResponse = await fetch(`http://${context.req.headers.host}/api/stripeproducts`);
    stripeProducts = JSON.stringify(await stripeProductsResponse.json()) ;
  }

  const page = JSON.stringify(pageResponse);

  return {
    props: {
      page,
      navItems,
      locale: context.locale,
      defaultLocale: context.defaultLocale,
      stripeProducts
    },
  };
};

export default ContentPage;

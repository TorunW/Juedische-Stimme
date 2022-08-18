import { useEffect } from 'react';
import { NextPageContext } from 'next';
import { hasCookie } from 'cookies-next';

import type { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';

import excuteQuery from 'lib/db';
import { selectPosts, selectPostsByTag } from 'lib/queries/posts';
import { selectGalleryById, selectMenuItems } from 'lib/queries';

import { useDispatch, useSelector } from 'store/hooks';
import { setToken, setEvents, setFeed } from 'store/fbdata/fbDataSlice';
import { setPosts, setNewsletter } from 'store/posts/postsSlice';
import { setMenuItems } from 'store/nav/navSlice';
import { setLanguages } from 'store/languages/languagesSlice';
import { setAboutInfo } from 'store/aboutinfo/aboutinfoSlice';

import Posts from '@/components/posts/Posts';
import FacebookFeed from '@/components/facebook/FacebookFeed';
import FacebookEvents from '@/components/facebook/FacebookEvents';
import Header from 'components/Header';
import AboutInfo from 'components/AboutInfo';

import CallToAction from '@/components/CallToAction';

import { getPlaiceholder } from "plaiceholder";

const Home: LayoutPage = (props: LayoutPageProps) => {
  const dispatch = useDispatch();
  const { posts, newsletter } = useSelector((state) => state.posts);

  useEffect(() => {

    dispatch(setMenuItems(JSON.parse(props.navItems)));
    dispatch(setPosts(JSON.parse(props.posts)));
    dispatch(setNewsletter(JSON.parse(props.newsletter)));
    dispatch(
      setToken(
        JSON.parse(props.fbToken).length > 0
          ? JSON.parse(props.fbToken)[0].token
          : null
      )
    );
    dispatch(setEvents(JSON.parse(props.fbEvents)[0]));
    dispatch(setFeed(JSON.parse(props.fbFeed)[0]));

    dispatch(
      setAboutInfo({
        aboutInfo: JSON.parse(props.aboutInfo)[0],
        gallery: JSON.parse(props.gallery)[0],
        headerImage:JSON.parse(props.headerImage)
      })
    );
    dispatch(
      setLanguages({
        locales: props.locales,
        locale: props.locale,
        defaultLocale: props.defaultLocale,
      })
    );
  }, []);

  return (
    <main id="home-page">
      <Header />
      {posts ? <Posts posts={posts} title={'Aktuelles'} /> : ''}
      <FacebookEvents />
      <AboutInfo />
      {newsletter ? <Posts posts={newsletter} title={'Newsletter'} /> : ''}
      <CallToAction />
      <FacebookFeed />
    </main>
  );
};

Home.layout = 'main';

export const getServerSideProps = async (context: NextPageContext) => {

  if (!hasCookie('Token', { req: context.req, res: context.res })) 
    return { redirect: { destination: '/login', permanent: false } };

  // NAVIGATION
  const navItemsResponse = await excuteQuery({
    query: selectMenuItems(),
  });
  const navItems = JSON.stringify(navItemsResponse);

  // POSTS ( aktuelles )
  const postsResponse = await excuteQuery({
    query: selectPosts({
      numberOfPosts: 6,
      pageNum: 0,
      showUnpublished: false,
      postType: 'post',
      fieldsList: [
        'ID',
        'post_date',
        'post_content',
        'post_title',
        'post_name',
        'categoryId',
        'categoryName',
        'postImage'
      ],
      exclude: {
        category: 66,
      },
      locale: context.locale !== context.defaultLocale ? context.locale : '',
    }),
  });
  const posts = JSON.stringify(postsResponse);

  // Newsletter
  const newsletterResponse = await excuteQuery({
    query: selectPostsByTag({
      slug: 'newsletter',
      numberOfPosts: 6,
      pageNum: 1,
      isCategory: true,
      fieldsList: [
        'ID',
        'post_date',
        'post_content',
        'post_title',
        'post_name',
        'categoryId',
        'categoryName',
        'postImage'
      ],
      locale: context.locale !== context.defaultLocale ? context.locale : '',
    }),
  });
  const newsletter = JSON.stringify(newsletterResponse);

  // ABOUT INFO ( texts & gallery)
  const aboutInfoResponse = await excuteQuery({
    query: `SELECT * FROM js_about_info LIMIT 1`,
  });
  const aboutInfo = JSON.stringify(aboutInfoResponse);
  const galleryId = await aboutInfoResponse[0].about_gallery_id;
  const galleryResponse = await excuteQuery({
    query: selectGalleryById(galleryId),
  });
  const gallery = JSON.stringify(galleryResponse);

  // FB
  const fbTokenResponse = await excuteQuery({
    query: `SELECT * FROM fb_token LIMIT 1`,
  });
  const fbToken = JSON.stringify(fbTokenResponse);
  const fbFeedResponse = await excuteQuery({
    query: `SELECT * FROM fb_feed WHERE type='posts' ORDER BY ID DESC LIMIT 1`,
  });
  const fbFeed = JSON.stringify(fbFeedResponse);
  const fbEventsReponse = await excuteQuery({
    query: `SELECT * FROM fb_feed WHERE type='events' ORDER BY ID DESC LIMIT 1`,
  });
  const fbEvents = JSON.stringify(fbEventsReponse);

  const headerImageUri = `${context.req.headers.referer}header-background.jpg`
  let { img , svg} = await getPlaiceholder(headerImageUri, {
    size: 64,
  });
  const headerImage = JSON.stringify({
    uri:headerImageUri,
    img,
    svg
  })
  
  return {
    props: {
      navItems,
      posts,
      newsletter,
      fbFeed,
      fbEvents,
      fbToken,
      aboutInfo,
      gallery,
      locales: context.locales,
      locale: context.locale,
      defaultLocale: context.defaultLocale,
      headerImage
    },
  };
};

export default Home;

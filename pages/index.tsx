import { app } from '../firebaseConfig';
import type { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';

import { useEffect } from 'react';
import excuteQuery from 'lib/db';
import { selectPosts, selectPostsByTag } from 'lib/queries/posts';
import { selectGalleryById, selectMenuItems } from 'lib/queries';

import { useDispatch, useSelector } from 'store/hooks';
import { setToken, setEvents, setFeed } from 'store/fbdata/fbDataSlice';
import { setPosts, setNewsletter } from 'store/posts/postsSlice';
import { setMenuItems } from 'store/nav/navSlice';

import Posts from 'components/Posts';
import FacebookFeed from 'components/FacebookFeed';
import FacebookEvents from 'components/FacebookEvents';
import Header from 'components/Header';
import AboutInfo from 'components/AboutInfo';
import { setAboutInfo } from 'store/aboutinfo/aboutinfoSlice';
import { NextPageContext } from 'next';
import { setLanguages } from 'store/languages/languagesSlice';
import NewsletterForm from '@/components/NewsletterForm';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

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

  // console.log(posts, ' POSTS ');

  // console.log(newsletter, ' NEWSLETTER ');

  return (
    <div>
      <Header />
      {posts ? <Posts posts={posts} title={'Aktuelles'} /> : ''}
      <FacebookEvents />
      <AboutInfo />
      {newsletter ? <Posts posts={newsletter} title={'Newsletter'} /> : ''}
      <CallToAction />
      <FacebookFeed />
      <Footer />
    </div>
  );
};

Home.layout = 'main';

export const getServerSideProps = async (context: NextPageContext) => {
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
        'post_author',
        'post_date',
        'post_date_gmt',
        'post_content',
        'post_title',
        'post_name',
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
    },
  };
};

export default Home;

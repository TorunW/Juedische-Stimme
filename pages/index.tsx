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
import Header from '@/components/header/Header';
import AboutInfo from '@/components/about/AboutInfo';

import CallToAction from '@/components/callToAction/CallToAction';

import { getPlaiceholder } from 'plaiceholder';
import axios from 'axios';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import { setHeaderGallery } from 'store/galleries/galleriesSlice';

import Head from 'next/head';

const Home: LayoutPage = (props: LayoutPageProps) => {
  const dispatch = useDispatch();
  const { posts, newsletter } = useSelector((state) => state.posts);
  const { gallery, aboutInfo, headerImage } = useSelector(
    (state) => state.aboutinfo
  );

  useEffect(() => {
    initHomePage();
  }, []);

  useEffect(() => {
    if (headerImage.isLoaded === true) {
      getFbToken();
      getNewsletterPosts();
    }
  }, [headerImage.isLoaded]);

  function initHomePage() {
    dispatch(setMenuItems(JSON.parse(props.navItems)));
    dispatch(setHeaderGallery(JSON.parse(props.headerGallery)[0]));
    dispatch(setPosts(JSON.parse(props.posts)));
    dispatch(
      setAboutInfo({
        aboutInfo: JSON.parse(props.aboutInfo)[0],
        gallery: JSON.parse(props.gallery)[0],
        headerImage: JSON.parse(props.headerImage),
      })
    );
    dispatch(
      setLanguages({
        locales: props.locales,
        locale: props.locale,
        defaultLocale: props.defaultLocale,
      })
    );
  }

  async function getFbToken() {
    const fbTokenResult = await fetch('/api/fbtoken');
    const fbToken = await fbTokenResult.json();
    dispatch(setToken(fbToken[0].token));
  }

  async function getNewsletterPosts() {
    axios
      .post('/api/posts/category', {
        locale: props.locale,
        defaultLocale: props.defaultLocale,
        category: 'newsletter',
      })
      .then(function (response) {
        dispatch(setNewsletter(response.data));
      })
      .catch(function (error) {
        console.log(error, ' ERROR ON FETCHING NEWSLETTER ');
      });
  }

  return (
    <main id='home-page'>
      <Head>
        <title>Jüdische Stimme</title>
        <div>
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
        </div>
      </Head>
      <Header />
      <Posts posts={posts} title={'Aktuelles'} />
      <FacebookEvents />
      <AboutInfo gallery={gallery} aboutInfo={aboutInfo} />
      <Posts posts={newsletter} title={'Newsletter'} />
      <CallToAction />
      <FacebookFeed />
    </main>
  );
};

Home.layout = 'main';

export const getServerSideProps = async (context: NextPageContext) => {
  // if (!hasCookie('Token', { req: context.req, res: context.res }))
  //   return { redirect: { destination: '/login', permanent: false } };

  // NAVIGATION
  const navItemsResponse = await excuteQuery({
    query: selectMenuItems(),
  });
  const navItems = JSON.stringify(navItemsResponse);

  // POSTS
  const postsResponse = await excuteQuery({
    query: selectPosts({
      numberOfPosts: 6,
      pageNum: 0,
      showUnpublished: false,
      postType: 'post',
      fieldsList: [
        'ID',
        'post_date',
        'post_excerpt',
        'post_content',
        'post_title',
        'post_name',
        'categoryId',
        'categoryName',
        'postImage',
      ],
      exclude: {
        category: 66,
      },
      locale: context.locale !== context.defaultLocale ? context.locale : '',
    }),
  });
  const posts = JSON.stringify(postsResponse);

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

  const headerGalleryResponse = await excuteQuery({
    query: selectGalleryById(6),
  });
  const headerGallery = JSON.stringify(headerGalleryResponse);

  const headerImageUri = `http://${context.req.headers.host}/${generateImageUrl(
    headerGalleryResponse[0].imageSrcs.split(',')[0]
  )}`;
  let { img, svg } = await getPlaiceholder(headerImageUri, {
    size: 32,
  });
  const headerImage = JSON.stringify({
    uri: headerImageUri,
    img,
    svg,
  });

  return {
    props: {
      navItems,
      posts,
      aboutInfo,
      gallery,
      locales: context.locales,
      locale: context.locale,
      defaultLocale: context.defaultLocale,
      headerGallery,
      headerImage,
    },
  };
};

export default Home;

import type { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';

import { useEffect } from 'react';
import excuteQuery from 'lib/db';
import { selectPosts } from 'lib/queries/posts';
import { selectGalleryById, selectNavItems } from 'lib/queries';

import { useDispatch, useSelector } from 'store/hooks';
import { setToken, setEvents, setFeed } from 'store/fbdata/fbDataSlice';
import { setPosts } from 'store/posts/postsSlice';
import { setMenuItems } from 'store/nav/navSlice';

import Posts from 'components/Posts';
import FacebookFeed from 'components/FacebookFeed';
import FacebookEvents from 'components/FacebookEvents';
import Header from 'components/Header';
import AboutInfo from 'components/AboutInfo';
import { setAboutInfo } from 'store/aboutinfo/aboutinfoSlice';

const Home: LayoutPage = (props: LayoutPageProps) => {

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    if (props.navItems) dispatch(setMenuItems(JSON.parse(props.navItems)));
    if (props.posts) dispatch(setPosts(JSON.parse(props.posts)));
    if (props.fbToken)
      dispatch(
        setToken(
          JSON.parse(props.fbToken).length > 0
            ? JSON.parse(props.fbToken)[0].token
            : null
        )
      );
    if (props.fbEvents) dispatch(setEvents(JSON.parse(props.fbEvents)[0]));
    if (props.fbFeed) dispatch(setFeed(JSON.parse(props.fbFeed)[0]));
    if (props.aboutInfo && props.gallery){
      dispatch(setAboutInfo({aboutInfo:JSON.parse(props.aboutInfo)[0],gallery:JSON.parse(props.gallery)[0]}))
    }
  }, []);
  
  return (
    <div>
      <Header />
      {posts ? <Posts posts={posts} /> : ''}
      <hr />
      <FacebookEvents />
      <hr />
      <h1>BUTTONS AND CALL TO ACTION</h1>
      <blockquote>BUTTONS AND CALL TO ACTION</blockquote>
      <hr />
      <h1>SIGN UP TO NEWSLETTER</h1>
      <div>SIGN UP TO NEWSLETTER COMPONENET!</div>
      <hr />
      <FacebookFeed />
      <hr />
      <AboutInfo />
    </div>
  );
};

Home.layout = 'main';

export const getServerSideProps = async () => {

  // NAVIGATION
  const navItemsResponse = await excuteQuery({
    query: selectNavItems(),
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
        'post_author',
        'post_date',
        'post_date_gmt',
        'post_content',
        'post_title',
        'post_name',
      ],
    }),
  });
  const posts = JSON.stringify(postsResponse);

  // ABOUT INFO ( texts & gallery)
  const aboutInfoResponse = await excuteQuery({
    query: `SELECT * FROM js_about_info LIMIT 1`,
  });
  const aboutInfo = JSON.stringify(aboutInfoResponse)
  const galleryId = await aboutInfoResponse[0].about_gallery_id;
  const galleryResponse = await excuteQuery({
    query: selectGalleryById(galleryId)
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
      fbFeed,
      fbEvents,
      fbToken,
      aboutInfo,
      gallery
    },
  };
};

export default Home;

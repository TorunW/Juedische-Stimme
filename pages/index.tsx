import { useEffect, useState } from "react";

import type { LayoutPage } from "types/LayoutPage.type";
import { LayoutPageProps } from "types/LayoutPageProps.type";

import excuteQuery from "lib/db";
import { selectGalleryById } from "lib/queries";
import { selectPosts } from "lib/queries/posts";

import { setAboutInfo } from "store/aboutinfo/aboutinfoSlice";
import { useDispatch, useSelector } from "store/hooks";
import { setLanguages } from "store/languages/languagesSlice";
import { setMenuItems } from "store/nav/navSlice";
import { setNewsletter, setPosts } from "store/posts/postsSlice";

import AboutInfo from "@/components/about/AboutInfo";
import FacebookEvents from "@/components/facebook/FacebookEvents";
import FacebookFeed from "@/components/facebook/FacebookFeed";
import Header from "@/components/header/Header";
import Posts from "@/components/posts/Posts";

import CallToAction from "@/components/callToAction/CallToAction";

import axios from "axios";
import { PageProps } from "page/page";
import { createServerSideProps } from "page/server-side-props";
import { getPlaiceholder } from "plaiceholder";
import { setHeaderGallery } from "store/galleries/galleriesSlice";

import { generateFileServerSrc } from "helpers/generateFileServerSrc";
import Head from "next/head";
import { setLabels } from "store/labels/labelsSlice";

export interface HomePageProps extends PageProps {
  someCustomParameter: string;
}

export const getServerSideProps = createServerSideProps<HomePageProps>(
  async ({ context, data: { navItems, labels, locale } }) => {
    // POSTS
    const postsResponse = await excuteQuery({
      query: selectPosts({
        numberOfPosts: 6,
        slug: "aktuelles",
        pageNum: 0,
        showUnpublished: false,
        postType: "post",
        fieldsList: [
          "ID",
          "post_date",
          "post_excerpt",
          "post_content",
          "post_title",
          "post_name",
          "categoryId",
          "categoryName",
          "postImage",
        ],
        exclude: {
          category: 66,
        },
        locale: locale !== context.defaultLocale ? locale : "",
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

    // HEADER
    const headerGalleryResponse = await excuteQuery({
      query: selectGalleryById(6),
    });
    const headerGallery = JSON.stringify(headerGalleryResponse);

    return {
      props: {
        navItems,
        posts,
        aboutInfo,
        gallery,
        locales: context.locales,
        locale,
        defaultLocale: context.defaultLocale,
        headerGallery,
        labels,
      },
    };
  }
);

const Home: LayoutPage = (props: LayoutPageProps) => {
  const [fbt, setFbt] = useState();

  const dispatch = useDispatch();
  const { posts, newsletter } = useSelector((state) => state.posts);
  const { aboutInfo } = useSelector((state) => state.aboutinfo);

  useEffect(() => {
    initHomePage();
  }, []);

  useEffect(() => {
    // if (headerImage.isLoaded === true) {
    // }
  }, []);

  function initHomePage() {
    dispatch(setMenuItems(JSON.parse(props.navItems)));
    dispatch(setHeaderGallery(JSON.parse(props.headerGallery)[0]));
    dispatch(setPosts(JSON.parse(props.posts)));
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
    dispatch(setLabels(JSON.parse(props.labels)));
    getFbToken();
    getNewsletterPosts();
  }

  async function getFbToken() {
    const fbTokenResult = await fetch("/api/fbtoken");
    const fbToken = await fbTokenResult.json();
    setFbt(fbToken[0].token);
    // dispatch(setToken(fbToken[0].token));
  }

  async function getNewsletterPosts() {
    axios
      .post("/api/posts/category", {
        locale: props.locale,
        defaultLocale: props.defaultLocale,
        category: "newsletter",
      })
      .then(function (response) {
        dispatch(setNewsletter(response.data));
      })
      .catch(function (error) {});
  }

  return (
    <main id="home-page">
      <Head>
        <title>Jüdische Stimme | für gerechten Frieden in Nahost</title>
        <div>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="manifest"
            href="/site.webmanifest"
          />
        </div>
      </Head>
      <Header />
      <Posts
        posts={posts}
        title={"Aktuelles"}
      />
      <FacebookEvents fbt={fbt} />
      <AboutInfo aboutInfo={aboutInfo} />
      <Posts
        posts={newsletter}
        title={"Newsletter"}
      />
      <CallToAction />
      <FacebookFeed />
    </main>
  );
};

Home.layout = "main";

export default Home;

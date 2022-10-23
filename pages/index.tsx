import { useEffect, useState } from "react";
import { NextPageContext } from "next";

import type { LayoutPage } from "types/LayoutPage.type";
import { LayoutPageProps } from "types/LayoutPageProps.type";

import excuteQuery from "lib/db";
import { selectPosts } from "lib/queries/posts";
import { selectGalleryById } from "lib/queries";
import { selectMenuItems } from "lib/queries/menuItems";

import { useDispatch, useSelector } from "store/hooks";
import { setPosts, setNewsletter } from "store/posts/postsSlice";
import { setMenuItems } from "store/nav/navSlice";
import { setLanguages } from "store/languages/languagesSlice";
import { setAboutInfo } from "store/aboutinfo/aboutinfoSlice";

import Posts from "@/components/posts/Posts";
import FacebookFeed from "@/components/facebook/FacebookFeed";
import FacebookEvents from "@/components/facebook/FacebookEvents";
import Header from "@/components/header/Header";
import AboutInfo from "@/components/about/AboutInfo";

import CallToAction from "@/components/callToAction/CallToAction";

import { getPlaiceholder } from "plaiceholder";
import axios from "axios";
import { generateImageUrl } from "helpers/imageUrlHelper";
import { setHeaderGallery } from "store/galleries/galleriesSlice";
import { Page, PageProps } from "page/page";
import { createServerSideProps } from "page/server-side-props";

import Head from "next/head";
import { Container } from "@/components/atoms/Container";
import { setLabels } from "store/labels/labelsSlice";

export interface HomePageProps extends PageProps {
  someCustomParameter: string;
}

export const getServerSideProps = createServerSideProps<HomePageProps>(
  async ({ context, data: { navItems, labels } }) => {
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
        locale: context.locale !== context.defaultLocale ? context.locale : "",
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

    const headerImageUri = `http://${
      context.req.headers.host
    }/${generateImageUrl(headerGalleryResponse[0].imageSrcs.split(",")[0])}`;
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
        labels,
      },
    };
  }
);

const Home: LayoutPage = (props: LayoutPageProps) => {
  const [fbt, setFbt] = useState();

  const dispatch = useDispatch();
  const { posts, newsletter } = useSelector((state) => state.posts);
  const { gallery, aboutInfo, headerImage } = useSelector(
    (state) => state.aboutinfo
  );

  useEffect(() => {
    initHomePage();
  }, []);

  useEffect(() => {
    // if (headerImage.isLoaded === true) {
    getFbToken();
    getNewsletterPosts();
    // }
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
    dispatch(setLabels(JSON.parse(props.labels)));
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
          <link rel="manifest" href="/site.webmanifest" />
        </div>
      </Head>
      <Header />
      <Posts posts={posts} title={"Aktuelles"} />
      <FacebookEvents fbt={fbt} />
      <AboutInfo gallery={gallery} aboutInfo={aboutInfo} />
      <Posts posts={newsletter} title={"Newsletter"} />
      <CallToAction />
      <Container>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F12juedischestimme%2F&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=788247842185302"
          width="500"
          height="500"
          style={{
            border: "none",
            overflow: "hidden",
            margin: "20px auto",
            display: "table",
          }}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </Container>
    </main>
  );
};

Home.layout = "main";

export default Home;

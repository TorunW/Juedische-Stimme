import { useRouter } from "next/router";
import { LayoutPage } from "types/LayoutPage.type";
import { LayoutPageProps } from "types/LayoutPageProps.type";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Result.module.css";
import { useEffect, useState } from "react";
import FacebookLink from "@/components/socialmediaLinks/FacebookLink";
import TwitterLink from "@/components/socialmediaLinks/TwitterLink";
import InstagramLink from "@/components/socialmediaLinks/InstagramLink";
import YoutubeLink from "@/components/socialmediaLinks/YoutubeLink";
import { createServerSideProps } from "page/server-side-props";
import excuteQuery from "lib/db";
import { selectPostByName } from "lib/queries/posts";
import { postNameToString } from "helpers/postNameToString";
import { HomePageProps } from "pages";
import { useDispatch } from "react-redux";
import { setMenuItems } from "store/nav/navSlice";
import { setLanguages } from "store/languages/languagesSlice";
import { setLabels } from "store/labels/labelsSlice";
import { setPost } from "store/posts/postsSlice";
import { generateFileServerSrc } from "helpers/generateFileServerSrc";

export const getServerSideProps = createServerSideProps<HomePageProps>(
  async ({ context, data: { navItems, labels, locale } }) => {
    const pageResponse = await excuteQuery({
      query: selectPostByName({
        name: "spenden",
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

const Result: LayoutPage = (props: LayoutPageProps) => {
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

  const [loading, setLoading] = useState(false);

  const {
    query: { session_id },
  } = useRouter();

  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    (url) => axios.get(url).then((res) => res.data)
  );

  if (loading === true) {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }

  const post = page;

  let socialMediaDisplay = (
    <div className={styles.socialmediaMenu}>
      <p>{`Don't forget to follow us on socialmedia`}</p>
      <FacebookLink
        color={"white"}
        type={"link"}
      />
      <TwitterLink
        color={"white"}
        type={"link"}
      />
      <InstagramLink color={"white"} />
      <YoutubeLink color={"white"} />
    </div>
  );

  return (
    <main className={styles.resultsPage}>
      <Image
        src={generateFileServerSrc(post.post_image)}
        alt="donations-page-background"
        title="donations-page-background"
        layout="fill"
        objectFit="cover"
      />

      <div className={styles.container}>
        <div className={styles.topRow}>
          {error ? (
            <div>
              <h2>Sorry, something went wrong!</h2>
              <p>{error.message}</p>
            </div>
          ) : !data ? (
            <div className={styles.loadingButton}>
              <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <div>
              <h2>
                <span>Thanks for your donation!</span>
              </h2>
              <p>Check your inbox for the receipt.</p>
            </div>
          )}
        </div>
        <div className={styles.bottomRow}>
          {loading === true ? (
            <div className={styles.loadingButton}>
              <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <Link href="/">
              <button
                className={styles.loginButton + " " + styles.button}
                onClick={() => setLoading(true)}
              >
                Take me back to the main page
              </button>
            </Link>
          )}

          {socialMediaDisplay}
        </div>
      </div>
    </main>
  );
};

Result.layout = "result";

export default Result;

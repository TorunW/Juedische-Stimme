import { useEffect } from "react";
import styles from "styles/Home.module.css";
import excuteQuery from "lib/db";
import PostForm from "@/components/admin/posts/PostForm";
import { selectPostByName } from "lib/queries/posts";
import { selectCategories, selectGalleries } from "lib/queries";

import { useDispatch, useSelector } from "store/hooks";
import { setPost } from "store/posts/postsSlice";
import { setCatgories } from "store/categories/categoriesSlice";
import { setGalleries } from "store/galleries/galleriesSlice";
import { LayoutPage } from "types/LayoutPage.type";
import { LayoutPageProps } from "types/LayoutPageProps.type";
import { setLanguages } from "store/languages/languagesSlice";

import { setLoggedUser } from "store/users/usersSlice";

import { useLoggedUser } from "hooks/useLoggedUser";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const postsResponse = await excuteQuery({
      query: selectPostByName({
        name: context.query.name.toString().split(":__--__:").join("#"),
        showUnpublished: true,
        locales: context.locales.filter(
          (l: string) => l !== context.defaultLocale
        ),
      }),
    });
    const post = JSON.stringify(postsResponse);
    const categoriesResponse = await excuteQuery({
      query: selectCategories(50, context.query.number),
    });
    const categories = JSON.stringify(categoriesResponse);
    const galleriesResponse = await excuteQuery({
      query: selectGalleries(50, context.query.number),
    });
    const galleries = JSON.stringify(galleriesResponse);

    return {
      props: {
        post,
        categories,
        galleries,
        locales: context.locales,
        locale: context.locale,
        defaultLocale: context.defaultLocale,
        loggedUser,
      },
    };
  }
);

const EditPostPage: LayoutPage = (props: LayoutPageProps) => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const {} = useLoggedUser(props);

  useEffect(() => {
    if (props.loggedUser)
      dispatch(setLoggedUser(JSON.parse(props.loggedUser)[0]));
    dispatch(setPost(JSON.parse(props.post)[0]));
    dispatch(setCatgories(JSON.parse(props.categories)));
    dispatch(setGalleries(JSON.parse(props.galleries)));
    dispatch(
      setLanguages({
        locales: props.locales,
        locale: props.locale,
        defaultLocale: props.defaultLocale,
      })
    );
  }, [props.post]);

  return (
    <div className={styles.container}>
      {post ? <PostForm post={post} /> : ""}
    </div>
  );
};

EditPostPage.layout = "admin";

export default EditPostPage;

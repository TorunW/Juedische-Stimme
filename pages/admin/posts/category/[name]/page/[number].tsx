import { ReactElement, useEffect } from "react";

import styles from "styles/Home.module.css";
import excuteQuery from "lib/db";

import Posts from "@/components/admin/posts/Posts";
import { countPostsByTag, selectPosts } from "lib/queries/posts";

import { useDispatch, useSelector } from "store/hooks";
import { setPosts, setPostsPagination } from "store/posts/postsSlice";
import { selectCategories, selectCategory } from "lib/queries";
import {
  setCategory,
  setCategoryName,
  setCatgories,
} from "store/categories/categoriesSlice";
import { getCookie, hasCookie } from "cookies-next";
import { selectUserByEmail } from "lib/queries/users";
import AdminTopBar from "@/components/atoms/AdminTopBar";

export default function AdminPostsPage(props) {
  // const { state, dispatch } = useContext(Context);
  const dispatch = useDispatch();
  const { posts, postsPerPage, postsCount, pageNum } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(setPosts(JSON.parse(props.posts)));
    dispatch(
      setPostsPagination({
        postsPerPage: props.postsPerPage,
        postsCount: props.postsCount,
        pageNum: props.pageNum,
      })
    );
    dispatch(setCatgories(JSON.parse(props.categories)));
    dispatch(setCategory(JSON.parse(props.category)[0]));
    dispatch(setCategoryName(props.categoryName));
  }, [props.posts]);

  let postsDisplay: ReactElement;
  if (posts) {
    postsDisplay = (
      <Posts
        posts={posts}
        pageNum={pageNum}
        postsPerPage={postsPerPage}
        postsCount={postsCount}
        type={"admin/posts/category"}
        title={props.categoryName}
      />
    );
  }

  return <>{postsDisplay}</>;
}

AdminPostsPage.layout = "admin";

export const getServerSideProps = async (context) => {
  let userEmail: string;
  if (!hasCookie("Token", { req: context.req, res: context.res })) {
    return { redirect: { destination: "/login", permanent: false } };
  } else {
    userEmail = getCookie("UserEmail", {
      req: context.req,
      res: context.res,
    }).toString();
  }

  let loggedUser: string;
  if (userEmail) {
    const userResponse = await excuteQuery({
      query: selectUserByEmail(userEmail),
    });
    loggedUser = JSON.stringify(userResponse);
  }

  const categoryResponse = await excuteQuery({
    query: selectCategory({ categoryName: context.query.name }),
  });
  const category = JSON.stringify(categoryResponse);
  const postsResponse = await excuteQuery({
    query: selectPosts({
      numberOfPosts: 50,
      slug: context.query.name.split(" ").join("-").toLowerCase(),
      isCategory: true,
      pageNum: context.query.number,
      showUnpublished: true,
      postType: "post",
      locale: context.locale !== context.defaultLocale ? context.locale : "",
    }),
  });
  const posts = JSON.stringify(postsResponse);
  const categoriesResponse = await excuteQuery({
    query: selectCategories(100),
  });
  const categories = JSON.stringify(categoriesResponse);
  return {
    props: {
      posts,
      category,
      categories,
      pageNum: context.query.number,
      postsCount: categoryResponse[0].count,
      postsPerPage: 50,
      categoryName: context.query.name,
      loggedUser,
    },
  };
};

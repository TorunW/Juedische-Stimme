import { useEffect } from "react";
import excuteQuery from "lib/db";
import Posts from "@/components/admin/posts/Posts";
import { selectPosts } from "lib/queries/posts";
import { useDispatch, useSelector } from "store/hooks";
import { setPosts, setPostsPagination } from "store/posts/postsSlice";
import { selectCategories, selectCategory } from "lib/queries";
import {
  setCategory,
  setCategoryName,
  setCatgories,
} from "store/categories/categoriesSlice";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import { useLoggedUser } from "hooks/useLoggedUser";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const categoryResponse = await excuteQuery({
      query: selectCategory({ categoryName: context.query.name }),
    });
    const category = JSON.stringify(categoryResponse);
    const postsResponse = await excuteQuery({
      query: selectPosts({
        numberOfPosts: 50,
        slug: context.query.name.toString().split(" ").join("-").toLowerCase(),
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
  }
);

export default function AdminPostsPage(props) {
  const dispatch = useDispatch();
  const {} = useLoggedUser(props);

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

  return (
    <>
      {posts && (
        <Posts
          posts={posts}
          pageNum={pageNum}
          postsPerPage={postsPerPage}
          postsCount={postsCount}
          type={"admin/posts/category"}
          title={props.categoryName}
        />
      )}
    </>
  );
}

AdminPostsPage.layout = "admin";

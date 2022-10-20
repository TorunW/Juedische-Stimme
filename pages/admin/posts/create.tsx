import { useEffect } from "react";

import excuteQuery from "lib/db";
import PostForm from "components/admin/posts/PostForm";
import { selectCategories } from "lib/queries";

import { useDispatch, useSelector } from "store/hooks";
import { setCatgories } from "store/categories/categoriesSlice";
import { setLoggedUser } from "store/users/usersSlice";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import { useLoggedUser } from "hooks/useLoggedUser";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const nextPostIdResponse = await excuteQuery({
      query: ` SELECT max_id FROM js_maxids WHERE js_maxids.table='posts' ORDER BY js_maxids.ID DESC LIMIT 1`,
    });
    const nextPostId = JSON.stringify(nextPostIdResponse);

    const categoriesResponse = await excuteQuery({
      query: selectCategories(50, context.query.number),
    });
    const categories = JSON.stringify(categoriesResponse);
    return {
      props: {
        nextPostId,
        categories,
        loggedUser,
      },
    };
  }
);

export default function CreatePostPage(props) {
  const dispatch = useDispatch();
  const {} = useLoggedUser(props);

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    if (props.loggedUser)
      dispatch(setLoggedUser(JSON.parse(props.loggedUser)[0]));
    dispatch(setCatgories(JSON.parse(props.categories)));
  }, []);

  let nextPostId =
    JSON.parse(props.nextPostId).length > 0
      ? JSON.parse(props.nextPostId)[0].max_id
      : "";

  return (
    <PostForm
      nextPostId={nextPostId}
      categories={categories}
    />
  );
}

CreatePostPage.layout = "admin";

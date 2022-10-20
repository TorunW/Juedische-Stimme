import { useEffect } from "react";
import excuteQuery from "lib/db";
import { selectCategories } from "lib/queries";
import AdminCategories from "components/admin/Categories";

import { useDispatch, useSelector } from "store/hooks";
import { setCatgories } from "store/categories/categoriesSlice";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import { useLoggedUser } from "hooks/useLoggedUser";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const categoriesResponse = await excuteQuery({
      query: selectCategories(50, context.query.number),
    });
    const categories = JSON.stringify(categoriesResponse);
    return {
      props: {
        categories,
        pageNum: context.query.number,
        loggedUser,
      },
    };
  }
);

export default function AdminCategoriesPage(props) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const {} = useLoggedUser(props);

  useEffect(() => {
    dispatch(setCatgories(JSON.parse(props.categories)));
  }, [props.categories]);
  let categoriesDisplay;
  if (categories) {
    categoriesDisplay = <AdminCategories categories={categories} />;
  }
  return (
    <div>
      <AdminTopBar title="Categories List" />
      {categoriesDisplay}
    </div>
  );
}

AdminCategoriesPage.layout = "admin";

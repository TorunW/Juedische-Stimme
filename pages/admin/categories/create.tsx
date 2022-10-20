import CategoryForm from "components/admin/CategoryForm";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    return {
      props: {
        loggedUser,
      },
    };
  }
);

export default function CreateCategoryPage() {
  return (
    <div>
      <AdminTopBar title="Create new Category" />
      <CategoryForm />
    </div>
  );
}

CreateCategoryPage.layout = "admin";

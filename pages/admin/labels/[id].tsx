import LabelForm from "@/components/admin/labels/LabelForm";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { useLoggedUser } from "hooks/useLoggedUser";
import excuteQuery from "lib/db";
import { getLabelById } from "lib/queries/labels";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const labelResponse = await excuteQuery({
      query: getLabelById(context.params.id),
    });
    console.log(labelResponse);
    return {
      props: {
        loggedUser,
        label: JSON.stringify(labelResponse),
      },
    };
  }
);

export default function LabelsAdminPage(props) {
  const {} = useLoggedUser(props);
  return (
    <>
      <AdminTopBar title="Edit Label" />
      <LabelForm label={JSON.parse(props.label)[0]} />;
    </>
  );
}

LabelsAdminPage.layout = "admin";

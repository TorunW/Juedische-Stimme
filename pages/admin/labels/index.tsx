import { Labels } from "@/components/admin/labels/Labels";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { useLoggedUser } from "hooks/useLoggedUser";
import excuteQuery from "lib/db";
import { getLabels } from "lib/queries/labels";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const labelsResponse = await excuteQuery({
      query: getLabels(),
    });
    return {
      props: {
        loggedUser,
        labels: JSON.stringify(labelsResponse),
      },
    };
  }
);

export default function LabelsAdminPage(props) {
  const {} = useLoggedUser(props);
  return (
    <>
      <AdminTopBar title="Labels" />
      <Labels labels={JSON.parse(props.labels)} />;
    </>
  );
}

LabelsAdminPage.layout = "admin";

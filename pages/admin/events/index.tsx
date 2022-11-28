import AdminTopBar from "@/components/atoms/AdminTopBar";
import { useLoggedUser } from "hooks/useLoggedUser";
import excuteQuery from "lib/db";
import { getEvents } from "lib/queries/events";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const labelsResponse = await excuteQuery({
      query: getEvents(),
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
      <AdminTopBar title="Events" />
      <Events events={JSON.parse(props.events)} />;
    </>
  );
}

LabelsAdminPage.layout = "admin";

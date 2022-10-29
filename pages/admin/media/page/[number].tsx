import { useEffect } from "react";
import { selectMediaItems } from "lib/queries";
import excuteQuery from "lib/db";
import styles from "styles/Home.module.css";
import MediaItems from "components/admin/media/MediaItems";
import { setMediaItems } from "store/mediaitems/mediaItemsSlice";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import { useDispatch, useSelector } from "store/hooks";
import AdminTopBar from "@/components/atoms/AdminTopBar";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const mediaResponse = await excuteQuery({
      query: selectMediaItems(200, context.query.number),
    });
    const mediaItems = JSON.stringify(mediaResponse);
    return {
      props: {
        mediaItems,
        loggedUser,
        pageNum: context.query.number,
        itemsPerPage: 200,
      },
    };
  }
);

export default function AdminMediaPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMediaItems(JSON.parse(props.mediaItems)));
  }, []);

  return (
    <>
      <AdminTopBar title="Media" />
      <MediaItems />
    </>
  );
}

AdminMediaPage.layout = "admin";

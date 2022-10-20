import { useEffect } from "react";
import excuteQuery from "lib/db";
import { selectTag } from "lib/queries";
import styles from "styles/Home.module.css";
import { useDispatch, useSelector } from "store/hooks";
import { setTag } from "store/tags/tagsSlice";
import TagForm from "components/admin/TagForm";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import { useLoggedUser } from "hooks/useLoggedUser";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const tagResponse = await excuteQuery({
      query: selectTag({ tagId: context.query.id }),
    });
    const tag = JSON.stringify(tagResponse);
    return {
      props: {
        tag,
        loggedUser,
      },
    };
  }
);

export default function EditTagPage(props) {
  const dispatch = useDispatch();
  const {} = useLoggedUser(props);

  const { tag } = useSelector((state) => state.tags);
  useEffect(() => {
    dispatch(setTag(JSON.parse(props.tag)[0]));
  }, [props.tag]);

  return (
    <div className={styles.container}>
      <AdminTopBar title={tag === undefined ? "Create Tag" : "Edit Tag"} />
      {tag !== null ? <TagForm tag={tag} /> : ""}
    </div>
  );
}

EditTagPage.layout = "admin";

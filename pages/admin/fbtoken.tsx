import excuteQuery from "lib/db";
import FacebookTokenForm from "components/admin/FacebookTokenForm";
import { selectUserByEmail } from "lib/queries/users";
import { getCookie, hasCookie } from "cookies-next";
import { useDispatch, useSelector } from "store/hooks";
import { useEffect } from "react";
import { setLoggedUser } from "store/users/usersSlice";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import { useLoggedUser } from "hooks/useLoggedUser";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const fbTokenResponse = await excuteQuery({
      query: `SELECT * FROM fb_token LIMIT 1`,
    });
    const fbToken = JSON.stringify(fbTokenResponse);
    return {
      props: {
        fbToken,
        loggedUser,
      },
    };
  }
);

export default function EditFbTokenPage(props) {
  const {} = useLoggedUser(props);
  return <FacebookTokenForm fbToken={JSON.parse(props.fbToken)[0]} />;
}

EditFbTokenPage.layout = "admin";

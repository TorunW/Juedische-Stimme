import React, { useEffect } from "react";
import { NextPageContext } from "next";
import excuteQuery from "lib/db";
import { useDispatch, useSelector } from "store/hooks";
import { setLoggedUser } from "store/users/usersSlice";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { Typography, Card, Box } from "@mui/material";
import FacebookTokenForm from "@/components/admin/FacebookTokenForm";
import { useLoggedUserCookie } from "pages/hooks/useLoggedUser";

function AdminDashboard(props) {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.users);

  useEffect(() => {
    if (props.loggedUser)
      dispatch(setLoggedUser(JSON.parse(props.loggedUser)[0]));
  }, []);

  return (
    <Box>
      <AdminTopBar title="Dashboard" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
          minHeight: "50vh",
        }}
      >
        <Typography variant="h4">
          Hello
          {loggedUser
            ? loggedUser.display_name.length > 0
              ? " " + loggedUser.display_name
              : " " + loggedUser.user_email
            : ""}
          !
        </Typography>
        <Card sx={{ marginTop: 2, padding: 4 }}>
          <FacebookTokenForm fbToken={JSON.parse(props.fbToken)[0]} />
        </Card>
      </Box>
    </Box>
  );
}

AdminDashboard.layout = "admin";
export default AdminDashboard;

export const getServerSideProps = async (context: NextPageContext) => {
  const loggedUser = await useLoggedUserCookie({
    req: context.req,
    res: context.res,
  });
  if (!loggedUser) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }
  const fbTokenResponse = await excuteQuery({
    query: `SELECT * FROM fb_token LIMIT 1`,
  });
  const fbToken = JSON.stringify(fbTokenResponse);

  return {
    props: {
      loggedUser,
      fbToken,
    },
  };
};

import React from "react";
import excuteQuery from "lib/db";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { Typography, Card, Box } from "@mui/material";
import FacebookTokenForm from "@/components/admin/FacebookTokenForm";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import { useLoggedUser } from "hooks/useLoggedUser";

function AdminDashboard(props) {
  const { loggedUser } = useLoggedUser(props);

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
          {loggedUser !== null
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

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
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
  }
);

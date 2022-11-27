import React from "react";
import excuteQuery from "lib/db";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { Typography, Card, Box, Grid } from "@mui/material";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import { useLoggedUser } from "hooks/useLoggedUser";
import ConstructionIcon from "@mui/icons-material/Construction";
import { Container } from "@mui/system";
import { PageViews } from "./dashboard/PageViews";

function AdminDashboard(props) {
  const { loggedUser } = useLoggedUser(props);

  return (
    <Box>
      <AdminTopBar title="Dashboard" />
      <Container>
        <Card sx={{ marginTop: 2, padding: 4 }}>
          <Box textAlign="center">
            <ConstructionIcon sx={{ fontSize: "159px" }} />
          </Box>
          <Typography variant="h4">
            Hello
            {loggedUser !== null
              ? loggedUser.display_name.length > 0
                ? " " + loggedUser.display_name
                : " " + loggedUser.user_email
              : ""}
            !
          </Typography>
          <Typography textAlign="center">
            Dashboard is under construction....
          </Typography>

          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <PageViews />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              CREATE NEW POST / CATEGORY / TAG
            </Grid>
          </Grid>
        </Card>
      </Container>
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

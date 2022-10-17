import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import ListSubheader from "@mui/material/ListSubheader";
import {
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "store/hooks";

//
function AdminNav(props) {
  const router = useRouter();
  const { loggedUser } = useSelector((state) => state.users);

  console.log(loggedUser);

  function logout() {
    deleteCookie("Token");
    sessionStorage.removeItem("Token");
    deleteCookie("UserEmail");
    sessionStorage.removeItem("UserEmail");
    router.push("/login");
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ textAlign: "center", marginY: 2 }}>
        <Link href={"/admin"}>
          <Typography variant="h5">Admin Menu</Typography>
        </Link>
      </Box>
      <Divider />
      <Accordion
        disableGutters
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Post</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/posts/create`}>Create new post</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/posts`}>Edit posts</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/tags/create`}>Add new post tag</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/tags`}>Edit post tag</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/categories/create`}>Add new post category</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/categories`}>Edit post categories</Link>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        disableGutters
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sections</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/about`}>About Us</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <a href={`/admin/posts/spenden`}>Donation</a>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <a href={`/admin/posts/mitgliedsantrag`}>Membership</a>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/header`}>Header</Link>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        disableGutters
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Menus</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/menus`}>Edit Menus and Links</Link>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disableGutters
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Users</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />

          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/users/register`}>Register new user</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/users`}>See/Edit users</Link>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            alignItems: "center",
          }}
        >
          <AccountCircleIcon />
          <Typography variant="h6">
            {loggedUser !== null
              ? loggedUser.display_name.length > 0
                ? " " + loggedUser.display_name
                : " " + loggedUser.user_email
              : ""}
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={logout}
          color="secondary"
          sx={{ marginTop: 3 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default AdminNav;

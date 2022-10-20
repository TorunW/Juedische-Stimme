import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
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
import ArticleIcon from "@mui/icons-material/Article";
import WebIcon from "@mui/icons-material/Web";
import MenuIcon from "@mui/icons-material/Menu";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import EditIcon from "@mui/icons-material/Edit";
import TagIcon from "@mui/icons-material/Tag";
import CategoryIcon from "@mui/icons-material/Category";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import InfoIcon from "@mui/icons-material/Info";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ListIcon from "@mui/icons-material/List";

function AdminNav(props) {
  const router = useRouter();
  const { loggedUser } = useSelector((state) => state.users);

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
          <ArticleIcon sx={{ marginRight: 1 }} />
          <Typography>Posts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/posts/create`}>
              <Box
                display="flex"
                sx={{ cursor: "pointer" }}
              >
                <NoteAddIcon sx={{ marginRight: 1 }} />
                <Typography>Create new post</Typography>
              </Box>
            </Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/posts`}>
              <Box
                display="flex"
                sx={{ cursor: "pointer" }}
              >
                <EditIcon sx={{ marginRight: 1 }} />
                <Typography>Edit posts</Typography>
              </Box>
            </Link>
          </Box>

          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/tags`}>
              <Box
                display="flex"
                sx={{ cursor: "pointer" }}
              >
                <TagIcon sx={{ marginRight: 1 }} />
                <Typography>Tags</Typography>
              </Box>
            </Link>
          </Box>

          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/categories`}>
              <Box
                display="flex"
                sx={{ cursor: "pointer" }}
              >
                <CategoryIcon sx={{ marginRight: 1 }} />
                <Typography>Categories</Typography>
              </Box>
            </Link>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        disableGutters
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <WebIcon sx={{ marginRight: 1 }} />
          <Typography>Sections</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/about`}>
              <Box
                display="flex"
                sx={{ cursor: "pointer" }}
              >
                <InfoIcon sx={{ marginRight: 1 }} />
                <Typography>About</Typography>
              </Box>
            </Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <a href={`/admin/posts/spenden`}>
              <Box
                display="flex"
                sx={{ cursor: "pointer" }}
              >
                <VolunteerActivismIcon sx={{ marginRight: 1 }} />
                <Typography>Donations</Typography>
              </Box>
            </a>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <a href={`/admin/posts/mitgliedsantrag`}>
              <Box
                display="flex"
                sx={{ cursor: "pointer" }}
              >
                <CardMembershipIcon sx={{ marginRight: 1 }} />
                <Typography>Membership</Typography>
              </Box>
            </a>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/header`}>
              <Box
                display="flex"
                sx={{ cursor: "pointer" }}
              >
                <ViewCarouselIcon sx={{ marginRight: 1 }} />
                <Typography>Header</Typography>
              </Box>
            </Link>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        disableGutters
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MenuIcon sx={{ marginRight: 1 }} />
          <Typography>Menus</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/menus`}>
              <Box
                display="flex"
                sx={{ cursor: "pointer" }}
              >
                <ListIcon sx={{ marginRight: 1 }} />
                <Typography>Menus & Links</Typography>
              </Box>
            </Link>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disableGutters
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <GroupIcon sx={{ marginRight: 1 }} />
          <Typography>Users</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />

          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/users/register`}>
              <Box
                display="flex"
                sx={{ cursor: "pointer" }}
              >
                <GroupAddIcon sx={{ marginRight: 1 }} />
                <Typography>Register User</Typography>
              </Box>
            </Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1, marginLeft: 1 }}>
            <Link href={`/admin/users`}>
              <Box
                display="flex"
                sx={{ cursor: "pointer" }}
              >
                <PeopleOutlineIcon sx={{ marginRight: 1 }} />
                <Typography>Register User</Typography>
              </Box>
            </Link>
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

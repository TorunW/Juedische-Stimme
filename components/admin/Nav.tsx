import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import ListSubheader from '@mui/material/ListSubheader';
import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Toolbar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//
function AdminNav() {
  const router = useRouter();

  function logout() {
    deleteCookie('Token');
    sessionStorage.removeItem('Token');
    deleteCookie('UserEmail');
    sessionStorage.removeItem('UserEmail');
    router.push('/login');
  }

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ textAlign: 'center' }}>
        <h2>Admin Menu</h2>
      </Box>
      <Divider />
      <Accordion disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Post</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Box sx={{ marginY: 1 }}>
            <Link href={`/admin/posts/create`}>Create new post</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1 }}>
            <Link href={`/admin/posts`}>Edit posts</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1 }}>
            <Link href={`/admin/tags/create`}>Add new post tag</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1 }}>
            <Link href={`/admin/tags`}>Edit post tag</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1 }}>
            <Link href={`/admin/categories/create`}>Add new post category</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1 }}>
            <Link href={`/admin/categories`}>Edit post categories</Link>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sections</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ marginY: 1 }}>
            <Link href={`/admin/about`}>Edit About Us section</Link>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1 }}>
            <a href={`/admin/posts/spenden`}>Edit Donation section</a>
          </Box>
          <Divider />
          <Box sx={{ marginY: 1 }}>
            <a href={`/admin/posts/mitgliedsantrag`}>Edit Membership section</a>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Website Menus</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link href={`/admin/menus/create`}>Add new link to menu</Link>
          <Divider />
          <Link href={`/admin/menus`}>Edit menus and links</Link>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Gallery</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link href={`/admin/galleries/create`}>Add new gallery</Link>
          <Divider />
          <Link href={`/admin/galleries`}>Edit Gallery</Link>
          <Divider />
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Users</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Link href={`/admin/users/register`}>Register new user</Link>
          <Divider />
          <Link href={`/admin/users`}>See/Edit users</Link>
          <Divider />
          <Link href={`/admin/fbtoken`}>Edit fbToken</Link>
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant='contained'
          onClick={logout}
          color='secondary'
          sx={{ marginTop: 3 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default AdminNav;

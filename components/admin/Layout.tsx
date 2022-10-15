import React from 'react';
import AdminNav from './Nav';
import styles from '/components/admin/Admin.module.css';
import Link from 'next/link';
import { Box, Drawer } from '@mui/material';

const drawerWidth = 240;

function AdminLayout({ children }) {
  // display what user is logged in
  // log out button
  return (
    <Box id='admin-layout' sx={{ display: 'flex', height: '100%' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <AdminNav />
      </Drawer>
      <Box sx={{ width: '100%', overflowX: 'hidden', height: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}
export default AdminLayout;

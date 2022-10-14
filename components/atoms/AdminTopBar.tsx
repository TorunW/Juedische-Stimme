import React, { useState, Suspense, ReactElement, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'store/hooks';
import { v4 as uuidv4 } from 'uuid';
import { generateFileName } from 'helpers/generateFileName';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import { GeneratePostUrl } from 'helpers/generatePostUrl';
import dateTimeHelper from 'helpers/dateTimeHelper';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  title?: string;
  tabs?: any;
}
const AdminTopBar: React.FC<Props> = ({ title, tabs }) => {
  return (
    <Box
      sx={{
        // position: 'relative',
        background: '#2e2e2e',
        color: 'white',
        width: '100%',
        boxShadow: 4,
        zIndex: 3,
      }}
    >
      <Box>
        <Box sx={{ marginX: 3, paddingBottom: tabs === undefined ? 1 : 0 }}>
          <h1>{title}</h1>
        </Box>
        {tabs}
      </Box>
    </Box>
  );
};

export default AdminTopBar;

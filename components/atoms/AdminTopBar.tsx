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
import {
  Box,
  Button,
  Card,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Tab,
  Tabs,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';

interface Props {
  title?: string;
  tabs?: any;
}
const AdminTopBar: React.FC<Props> = ({ title, tabs }) => {
  return (
    <Box
      sx={{
        background: '#2e2e2e',
        color: 'white',
        width: '100%',
        minHeight: '10px',
      }}
    >
      <Box sx={{ marginX: 3 }}>
        <h1>{title}</h1>
      </Box>
      {tabs}
    </Box>
  );
};

export default AdminTopBar;

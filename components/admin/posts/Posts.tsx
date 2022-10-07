import React, { ReactElement } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { GeneratePostUrl } from 'helpers/generatePostUrl';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import Pagination from 'components/pagination/Pagination';
import PostsHeader from './PostsHeader';
import {
  AppBar,
  Box,
  Button,
  Card,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Tab,
  Tabs,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Link,
  Divider,
} from '@mui/material';

interface PostsProps {
  posts: any[];
  title?: string;
  phrase?: string;
  postsCount?: number;
  postsPerPage?: number;
  pageNum?: number;
  type?: string;
}

function Posts({
  posts,
  title,
  phrase,
  postsCount,
  postsPerPage,
  pageNum,
  type,
}: PostsProps) {
  function deletePost(post) {
    let deleteRequests = [];
    if (post.tagIds !== null) {
      let tagIds = post.tagIds.split(',');
      tagIds.forEach(function (tagId, index) {
        const deleteTagPostRelationshipUrl = `/api/tags/${post.postId}/${tagId}`;
        const deleteTagPostRelationshipRequest = axios.delete(
          deleteTagPostRelationshipUrl
        );
        deleteRequests.push(deleteTagPostRelationshipRequest);
      });
    }

    if (post.post_image !== null && post.post_image.indexOf('null') === -1) {
      const deleteFileUrl = `http://${window.location.hostname}${
        window.location.port !== '80' ? ':' + window.location.port : ''
      }/media/${post.post_image.split('/').join('+++')}`;
      const deleteFileRequest = axios.delete(deleteFileUrl);
      deleteRequests.push(deleteFileRequest);
    }

    const deletePostUrl = `/api/posts/${post.postId}`;
    const deletePostRequest = axios.delete(deletePostUrl, {
      data: { categoryId: post.categoryId },
    });
    deleteRequests.push(deletePostRequest);

    axios
      .all([...deleteRequests])
      .then(
        axios.spread((...responses) => {
          // console.log(responses)
          window.location.reload();
        })
      )
      .catch((errors) => {
        console.log(errors, ' ERRORS');
        // react on errors.
      });
  }

  let listHeaderDisplay: ReactElement;

  let postsDisplay: ReactElement[];
  if (posts) {
    postsDisplay = posts.map((post, index) => (
      <TableBody
        key={index}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableRow hover role='checkbox' tabIndex={-1}>
          <TableCell>
            <Link href={'/admin/posts/' + GeneratePostUrl(post.post_name)}>
              {post.post_title}
            </Link>
          </TableCell>
          <TableCell align='right'>{post.username}</TableCell>
          <TableCell align='right'>
            {new Date(post.post_date).toLocaleString('de')}
          </TableCell>
          <TableCell align='right'>
            <Image
              height='100'
              width='100'
              src={generateImageUrl(post.post_image)}
            />
          </TableCell>
          <TableCell align='right'>
            <button onClick={() => deletePost(post)}>DELETE POST</button>
          </TableCell>
        </TableRow>
      </TableBody>
    ));
  }

  let paginationDisplay: ReactElement;
  if (postsCount > postsPerPage) {
    paginationDisplay = (
      <Pagination
        pageNum={pageNum}
        itemsCount={postsCount}
        itemsPerPage={postsPerPage}
        type={type}
        title={title}
      />
    );
  }

  return (
    <div id='admin-posts'>
      <PostsHeader />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 740 }}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align='right'>Author</TableCell>
                <TableCell align='right'>Date published</TableCell>
                <TableCell align='right'>Image</TableCell>
                <TableCell align='right'>Delete</TableCell>
              </TableRow>
            </TableHead>
            {postsDisplay}
          </Table>
        </TableContainer>
        <Divider />
        {paginationDisplay}
      </Paper>
    </div>
  );
}

export default Posts;

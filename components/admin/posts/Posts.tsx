import React, { ReactElement } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { GeneratePostUrl } from 'helpers/generatePostUrl';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import Pagination from 'components/pagination/Pagination';
import PostsHeader from './PostsHeader';
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Link,
  Divider,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (post) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <IconButton
              // onClick={handleClickOpen}
              onClick={() => deletePost(post)}
            >
              <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>{'Delete Post?'}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {`Once the post is delete it can't be retrived again`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant='outlined'
                  onClick={() => deletePost(post)}
                  autoFocus
                >
                  Delete
                </Button>
                <Button variant='outlined' onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
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
          <Table sx={{ minWidth: 650 }} stickyHeader>
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
      </Paper>
      <Box sx={{ marginTop: 3 }}>{paginationDisplay}</Box>
    </div>
  );
}

export default Posts;

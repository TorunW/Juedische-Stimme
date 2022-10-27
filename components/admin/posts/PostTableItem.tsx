import React from 'react';
import { GeneratePostUrl } from 'helpers/generatePostUrl';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import Image from 'next/image';

import {
  TableRow,
  TableCell,
  Link,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function PostTableItem({ post, deletePost }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableRow
      hover
      role='checkbox'
      tabIndex={-1}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
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
        <IconButton onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{`Delete ${post.post_title}`}</DialogTitle>
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
  );
}

export default PostTableItem;

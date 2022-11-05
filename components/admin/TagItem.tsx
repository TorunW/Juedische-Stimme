import React from 'react';
import Link from 'next/link';
import {
  TableRow,
  TableCell,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

function TagItem({ tag, onDeleteTag }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>
        <Typography>{tag.name}</Typography>
      </TableCell>
      <TableCell align='right'>{tag.count}</TableCell>
      <TableCell align='right'>
        <Link href={`/admin/tags/${tag.term_id}`}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
      </TableCell>
      <TableCell align='right'>
        <a href={`/tag/${tag.slug}/page/1`} target='_blank' rel='noreferrer'>
          <IconButton>
            <SubdirectoryArrowRightIcon />
          </IconButton>
        </a>
      </TableCell>

      <TableCell align='right'>
        <IconButton onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{`Delete ${tag.name}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Once the tag is delete it can't be retrived again`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              onClick={() => onDeleteTag(tag)}
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

export default TagItem;

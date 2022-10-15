import React, { FC } from 'react';
import axios from 'axios';
import { Tag } from 'types/Tag.type';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

interface AdminTagsProps {
  tags?: Tag[];
}

const AdminTags: FC<AdminTagsProps> = ({ tags }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onDeleteTag(tag: Tag) {
    axios.delete(`/api/tags/tag/${tag.term_id}`).then(
      (response) => {
        window.location.reload();
        console.log(response, 'response on delete tag');
        console.log('NOW NEEDS TO REFRESH TAGS LIST!');
      },
      (error) => {
        console.log(error, 'ERROR on delete tag');
        console.log('NOW NEEDS TO DISPLAY ERROR');
      }
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 740 }}>
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Tag name</TableCell>
              <TableCell align='right'>Count</TableCell>
              <TableCell align='right'>Edit</TableCell>
              <TableCell align='right'>View Live</TableCell>
              <TableCell align='right'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {tags.map((tag, index) => (
              <TableRow hover tabIndex={-1} key={tag.term_id}>
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
                  <a
                    href={`/tag/${tag.slug}/page/1`}
                    target='_blank'
                    rel='noreferrer'
                  >
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
                    <DialogTitle>{'Delete Tag?'}</DialogTitle>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AdminTags;

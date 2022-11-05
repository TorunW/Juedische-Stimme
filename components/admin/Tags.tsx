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
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TagForm from './TagForm';
import TagItem from './TagItem';

interface AdminTagsProps {
  tags?: Tag[];
}

const AdminTags: FC<AdminTagsProps> = ({ tags }) => {
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
    <Box sx={{ maxWidth: '1067px', margin: '0 auto' }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TagForm />
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
            <TableBody
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {tags.map((tag, index) => (
                <TagItem key={index} tag={tag} onDeleteTag={onDeleteTag} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminTags;

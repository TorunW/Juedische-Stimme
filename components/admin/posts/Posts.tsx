import React, { ReactElement } from "react";
import axios from "axios";

import Pagination from "components/pagination/Pagination";
import PostsHeader from "./PostsHeader";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Divider,
} from "@mui/material";
import PostTableItem from "./PostTableItem";

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
      let tagIds = post.tagIds.split(",");
      tagIds.forEach(function (tagId, index) {
        const deleteTagPostRelationshipUrl = `/api/tags/${post.postId}/${tagId}`;
        const deleteTagPostRelationshipRequest = axios.delete(
          deleteTagPostRelationshipUrl
        );
        deleteRequests.push(deleteTagPostRelationshipRequest);
      });
    }

    if (post.post_image !== null && post.post_image.indexOf("null") === -1) {
      const deleteFileUrl = `http://${window.location.hostname}${
        window.location.port !== "80" ? ":" + window.location.port : ""
      }/media/${post.post_image.split("/").join("+++")}`;
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
          console.log(responses);
          window.location.reload();
        })
      )
      .catch((errors) => {
        console.log(errors, " ERRORS");
        // react on errors.
      });
  }

  let postsDisplay: ReactElement[];
  if (posts) {
    postsDisplay = posts.map((post, index) => (
      <PostTableItem
        key={index}
        post={post}
        deletePost={deletePost}
      />
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
    <div id="admin-posts">
      <PostsHeader />
      <Paper
        sx={{
          maxWidth: "1067px",
          margin: "0 auto",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ maxHeight: 740 }}>
          <Table
            sx={{ minWidth: 650 }}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Date published</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{postsDisplay}</TableBody>
          </Table>
        </TableContainer>
        <Divider />
      </Paper>
      <Box sx={{ marginTop: 3 }}>{paginationDisplay}</Box>
    </div>
  );
}

export default Posts;

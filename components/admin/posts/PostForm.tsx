import React, { useState, ReactElement } from "react";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "store/hooks";
import { v4 as uuidv4 } from "uuid";
import { generateFileName } from "helpers/generateFileName";
import { generateImageUrl } from "helpers/imageUrlHelper";
import { GeneratePostUrl } from "helpers/generatePostUrl";
import dateTimeHelper from "helpers/dateTimeHelper";
import PostTagForm from "./PostTagForm";
import PostTranslations from "./PostTranslations";
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
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import FormError from "@/components/atoms/FormError";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { PerformantTextField } from "@/components/atoms/PerformantTextField";
import { Post } from "types/Post.type";

import TipTapEditor from "components/tiptap/TipTapEditor";
import { ImageUploadField } from "../ImageUploadField";
import { Container } from "@/components/atoms/Container";
import { generatePostImgRequests } from "helpers/generatePostImgRequests";

interface PostFormProps {
  post?: any;
  nextPostId?: string | number;
  categories?: any[];
}

const PostForm = ({ post, nextPostId }: PostFormProps) => {
  const tabs = ["post", "translations"];

  const { categories } = useSelector((state) => state.categories);
  const { loggedUser } = useSelector((state) => state.users);

  const { locales, defaultLocale } = useSelector((state) => state.languages);

  const [currentTab, setCurrentTab] = useState("post");
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageFile, setPreviewImageFile] = useState(null);

  const [previewImage2, setPreviewImage2] = useState(null);
  const [previewImage2File, setPreviewImage2File] = useState(null);

  const initialValues = {
    post_author: post
      ? post.post_author
      : loggedUser !== null
      ? loggedUser.ID
      : "",
    post_date: post ? post.post_date : "",
    post_content: post
      ? post.post_content.replace(/(?:\r\n|\r|\n)/g, "<br>")
      : "",
    post_content_2:
      post && post.post_content_2 !== null
        ? post.post_content_2.replace(/(?:\r\n|\r|\n)/g, "<br>")
        : "",
    post_title: post ? post.post_title : "",
    post_excerpt: post ? post.post_excerpt : "",
    post_excerpt_2: post ? post.post_excerpt_2 : "",
    post_status: post ? post.post_status : "draft",
    post_name: post ? post.post_name : "",
    post_modified: post ? post.post_modified : "",
    categoryId: post ? post.categoryId : 2,
    post_image: post ? post.post_image : "",
    post_image_2: post ? post.post_image_2 : "",
    post_type: post ? post.post_type : "post",
    post_layout: post ? post.post_layout : "",
  };

  const imageValidation = Yup.string().required("Add an Image");
  const postExcerptValidation = Yup.string()
    .min(160)
    .max(200)
    .required("Add an excerpt from the Post");
  const postContentValidation = Yup.string()
    .min(700, "Post content should be a least 700 characters")
    .required("Add some text to the post");

  const validationSchema = Yup.object().shape({
    post_title: Yup.string().min(3).required("Add a title to the post"),
    categoryId: Yup.number().when("post_type", {
      is: "post",
      then: Yup.number().required("Choose a category"),
    }),
    post_layout: Yup.string().when("post_type", {
      is: "post",
      then: Yup.string().min(2).required("Choose a layout for the post"),
    }),
    post_image: Yup.string()
      .when("post_layout", {
        is: "article",
        then: imageValidation,
      })
      .when("post_layout", {
        is: "newsletter",
        then: imageValidation,
      }),
    post_content: postContentValidation,
    post_excerpt: Yup.string().when("post_layout", {
      is: "article",
      then: postExcerptValidation,
    }),
    post_excerpt_2: Yup.string().when("post_layout", {
      is: "article",
      then: postExcerptValidation,
    }),
    post_content_2: Yup.string().when("post_layout", {
      is: "article",
      then: postContentValidation,
    }),
  });

  const onSubmit = (values) => {
    const requestsArray = [];

    let postAuthor = post ? post.post_author : loggedUser.ID;

    // POST
    const postUrl = `/api/posts${post ? "/" + post.postId : ""}`;
    const postData = {
      ...values,
      post_date: post ? post.post_date : dateTimeHelper(new Date()),
      // post_date_gmt: like post_date but one hour less
      post_name: values.post_title.replace(/\s+/g, "-").toLowerCase().replace(),
      post_modified: dateTimeHelper(new Date()),
      previousCategoryId: post ? post.categoryId : null,
      post_content: values.post_content.replaceAll(`'`, `"`),
      nextPostId,
      post_author: postAuthor,
    };

    const postRequest = post
      ? axios.put(postUrl, postData)
      : axios.post(postUrl, postData);

    requestsArray.push(postRequest);

    // POST IMAGE FILE ( FILE UPLOAD )
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    requestsArray.push(
      ...generatePostImgRequests(post, previewImageFile, nextPostId, config),
      ...generatePostImgRequests(post, previewImage2File, nextPostId, config)
    );

    axios
      .all([...requestsArray])
      .then(
        axios.spread((...responses) => {
          console.log(responses, " RESPONSES");
          window.location.href = `/admin/posts/${values.post_title
            .replace(/\s+/g, "-")
            .toLowerCase()
            .replace()
            .replaceAll("#", ":__--__:")}`;
        })
      )
      .catch((errors) => {
        console.log(errors, " ERRORS");
      });
  };

  let selectCategoriesDisplay: ReactElement[];
  if (categories) {
    selectCategoriesDisplay = categories.map((category, index) => (
      <MenuItem
        key={Date.now() + index}
        value={category.term_id}
      >
        {category.name}
      </MenuItem>
    ));
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  let pathname;
  if (typeof window !== "undefined") {
    pathname = window.location.pathname;
  }

  const isMinimalLayout =
    (post && post.post_layout === "donation") ||
    (post && post.post_layout === "member_form");

  return (
    <Box sx={{ width: "100%" }}>
      <AdminTopBar
        title={
          pathname === "/admin/posts/create" ? "Create new Post" : "Edit Post"
        }
        tabs={
          pathname !== "/admin/posts/create" ? (
            <Tabs
              value={currentTab}
              onChange={handleChange}
              indicatorColor="secondary"
              sx={{ color: "white !important" }}
              TabIndicatorProps={{
                style: {
                  height: "4px",
                  color: "white !important",
                },
              }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={Date.now() + index}
                  value={tab}
                  label={tab}
                  sx={{ color: "white !important" }}
                />
              ))}
            </Tabs>
          ) : null
        }
      />
      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<Post>) => (
            <Form>
              <Card
                sx={{
                  paddingX: 4,
                  paddingY: 2,
                  margin: 2,
                }}
              >
                {console.log(props.errors)}
                {currentTab === "post" ? (
                  <>
                    <Grid
                      container
                      item
                      xs={12}
                    >
                      <Grid
                        container
                        md={post ? 9 : 12}
                        xs={12}
                        spacing={2}
                      >
                        <Grid
                          item
                          md={6}
                          xs={12}
                        >
                          <FormControl
                            fullWidth
                            margin="normal"
                          >
                            <InputLabel>Category</InputLabel>
                            <Select
                              id="categoryId"
                              name="categoryId"
                              value={props.values.categoryId}
                              onChange={props.handleChange}
                              label="Post Category"
                            >
                              {selectCategoriesDisplay}
                            </Select>
                            {props?.errors?.categoryId ? (
                              <FormError message={props.errors.categoryId} />
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          md={6}
                          xs={12}
                        >
                          <FormControl
                            fullWidth
                            margin="normal"
                          >
                            <InputLabel>Layout</InputLabel>
                            <Select
                              id="post_layout"
                              name="post_layout"
                              label="Post Layout"
                              value={props.values.post_layout}
                              onChange={props.handleChange}
                              placeholder="Layout"
                            >
                              <MenuItem value={"article"}>Article</MenuItem>
                              <MenuItem value={"newsletter"}>
                                Newsletter
                              </MenuItem>
                              <MenuItem value={"legacy"}>Legacy</MenuItem>
                              {/* <MenuItem value={'member_form'}>Membership Page</MenuItem> */}
                              {/* <MenuItem value={'donation'}>Donation Page</MenuItem> */}
                            </Select>
                            {props?.errors?.post_layout ? (
                              <FormError message={props.errors.post_layout} />
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          container
                          xs={12}
                        >
                          <FormControl
                            fullWidth
                            sx={{ marginBottom: 4 }}
                          >
                            <PerformantTextField
                              id="post_title"
                              name="post_title"
                              label="Title"
                              margin="normal"
                              placeholder="Title"
                              onChange={props.handleChange}
                              value={props.values.post_title}
                            />
                            {props?.errors?.post_title ? (
                              <FormError message={props.errors.post_title} />
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                      {post && (
                        <Grid
                          item
                          xs={12}
                          md={3}
                          sx={{ paddingRight: 0 }}
                        >
                          <FormControl
                            fullWidth
                            margin="normal"
                            sx={{
                              padding: 2,
                              paddingTop: 0,
                              height: "calc(100% - 32px)",
                            }}
                          >
                            <Link
                              target={"_blank"}
                              rel="noreferrer"
                              href={"/" + GeneratePostUrl(post.post_name)}
                              sx={{ width: "100%", height: "100%" }}
                            >
                              <Button
                                variant="contained"
                                sx={{ height: "100%", width: "100%" }}
                              >
                                View Post in Livemode
                              </Button>
                            </Link>
                          </FormControl>
                        </Grid>
                      )}
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      display="flex"
                      alignItems={"center"}
                    >
                      <Grid
                        container
                        item
                        xs={12}
                      >
                        <>
                          <ImageUploadField
                            image={
                              post?.post_image
                                ? generateImageUrl(post.post_image)
                                : null
                            }
                            previewImage={previewImage}
                            setPreviewImage={setPreviewImage}
                            setPreviewImageFile={setPreviewImageFile}
                            error={
                              props?.errors?.post_image ? (
                                <FormError message={props.errors.post_image} />
                              ) : (
                                ""
                              )
                            }
                          />
                        </>
                      </Grid>
                      {props.values.post_layout === "article" ||
                        (props.values.post_layout === "newsletter" && (
                          <Grid
                            container
                            item
                            sx={{ marginY: 2 }}
                          >
                            <TipTapEditor
                              onChange={(val: string) =>
                                props.setFieldValue("post_excerpt", val, true)
                              }
                              value={props.values.post_excerpt}
                              itemType={"post"}
                              itemId={post ? post.postId : nextPostId}
                              height={150}
                              title={"Post Summary"}
                            />
                            {props?.errors?.post_excerpt && (
                              <FormError message={props.errors.post_excerpt} />
                            )}
                          </Grid>
                        ))}

                      <Grid
                        container
                        item
                        sx={{ marginY: 2 }}
                      >
                        <TipTapEditor
                          onChange={(val: string) =>
                            props.setFieldValue("post_content", val, true)
                          }
                          value={props.values.post_content}
                          itemType={"post"}
                          itemId={post ? post.postId : nextPostId}
                          height={150}
                          title={"Post top content"}
                          min={700}
                        />

                        {props?.errors?.post_content ? (
                          <FormError message={props.errors.post_content} />
                        ) : (
                          ""
                        )}
                      </Grid>
                      {!isMinimalLayout &&
                        props.values.post_layout !== "legacy" && (
                          <>
                            <Grid
                              container
                              item
                            >
                              <ImageUploadField
                                image={
                                  post?.post_image_2
                                    ? generateImageUrl(post.post_image_2)
                                    : null
                                }
                                previewImage={previewImage2}
                                setPreviewImage={setPreviewImage2}
                                setPreviewImageFile={setPreviewImage2File}
                                error={
                                  props?.errors?.post_image_2 ? (
                                    <FormError
                                      message={props.errors.post_image_2}
                                    />
                                  ) : (
                                    ""
                                  )
                                }
                              />
                            </Grid>

                            <Grid
                              container
                              item
                              sx={{ marginY: 2 }}
                            >
                              <TipTapEditor
                                onChange={(val: string) =>
                                  props.setFieldValue(
                                    "post_excerpt_2",
                                    val,
                                    true
                                  )
                                }
                                value={props.values.post_excerpt_2}
                                itemType={"post"}
                                itemId={post ? post.postId : nextPostId}
                                height={150}
                                title={"Second post summary"}
                              />
                              {props?.errors?.post_excerpt_2 && (
                                <FormError
                                  message={props.errors.post_excerpt_2}
                                />
                              )}
                            </Grid>

                            <Grid
                              container
                              item
                              sx={{ marginY: 2 }}
                            >
                              <TipTapEditor
                                onChange={(val: string) =>
                                  props.setFieldValue(
                                    "post_content_2",
                                    val,
                                    true
                                  )
                                }
                                value={props.values.post_content_2}
                                itemType={"post"}
                                itemId={post ? post.postId : nextPostId}
                                height={150}
                                title={"Bottom Post Content"}
                              />
                            </Grid>

                            <PostTagForm
                              postId={post ? post.postId : nextPostId}
                            />

                            <Grid
                              item
                              sx={{ marginY: 2 }}
                              xs={12}
                            >
                              <FormControl
                                fullWidth
                                margin="normal"
                              >
                                <InputLabel>Post Status</InputLabel>
                                <Select
                                  id="post_status"
                                  name="post_status"
                                  label="Post Status"
                                  value={props.values.post_status}
                                  onChange={props.handleChange}
                                >
                                  <MenuItem value={"publish"}>
                                    Publish post
                                  </MenuItem>
                                  <MenuItem value={"draft"}>
                                    Save to drafts
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          </>
                        )}

                      <Grid
                        item
                        sx={{ marginY: 2 }}
                        xs={12}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          {post ? "update post" : "create post"}
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) : currentTab === "translations" ? (
                  <PostTranslations
                    post={post}
                    locales={locales}
                    defaultLocale={defaultLocale}
                  />
                ) : null}
              </Card>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default PostForm;

import React, { useRef } from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import FormatTextdirectionLToRIcon from "@mui/icons-material/FormatTextdirectionLToR";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import AddLinkIcon from "@mui/icons-material/AddLink";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { Link, Box } from "@mui/material";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { Stack } from "@mui/system";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import ImageIcon from "@mui/icons-material/Image";

type Props = {
  editor: any;
  itemId?: number | string;
  itemType?: string;
};

const MenuBar = ({ editor, itemId, itemType }: Props) => {
  const fileInputRef = useRef(null);

  if (!editor) {
    return null;
  }

  function onUpladImageClick() {
    fileInputRef.current.click();
  }

  const onImageInputChangeHanlder = (event) => {
    if (!event.target.files?.length) {
      return;
    }
    const formData = new FormData();
    const file = event.target.files[0];
    let fileType = file.name.split(".")[file.name.split.length - 1];
    let fileName =
      file.name.split(`.${fileType}`)[0] + `__${uuidv4()}.${fileType}`;
    console.log(fileName, " FILENAME ");
    Array.from(event.target.files).forEach((file: string | Blob) => {
      formData.append(event.target.name, file, fileName);
    });
    console.log(fileInputRef, " FILE INPUT RED");
    fileInputRef.current.value = "";
    uploadImage(formData, fileName);
  };

  const uploadImage = async (formData, fileName) => {
    // UPLOAD THE FILE
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post("/api/uploads", formData, config);

    const today = new Date();
    let month: string | number = today.getMonth();
    month += 1;
    month = month < 10 ? "0" + month : month;

    const meta_value = `${today.getFullYear()}/${month}/${fileName}`;

    // CREATE THE DB RECORD FOR wp_postmeta
    axios({
      method: "post",
      url: `/api/media`,
      data: {
        post_id: itemId,
        meta_key: "_wp_attached_file",
        meta_value,
      },
    }).then(
      (response) => {
        console.log(response, "response on insert media item");
        insertImage(`/wp-content/uploads/${meta_value}`);
      },
      (error) => {
        console.log(error, "ERROR on insert media item");
      }
    );
  };

  const insertImage = (url) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  function setLinkHandler() {
    const href = prompt("Enter a Url to link:");
    editor.commands.setLink({ href });
  }

  return (
    <Box
      sx={{
        display: "flex",
        columnGap: 2,
        paddingX: 2,
        paddingTop: 1,
        alignItems: "center",
      }}
    >
      <Stack
        flexDirection="row"
        gap={2}
      >
        <Link
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="bold"
          sx={{
            color: editor.isActive("bold") ? "#8179A6" : "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
        >
          <FormatBoldIcon />
        </Link>
        <Link
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="italic"
          sx={{
            cursor: "pointer",
            color: editor.isActive("italic") ? "#8179A6" : "black",
            "&:hover": { color: "#8179A6" },
          }}
        >
          <FormatItalicIcon />
        </Link>
        <Link
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="strike"
          sx={{
            color: editor.isActive("strike") ? "#8179A6" : "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
        >
          <FormatStrikethroughIcon />
        </Link>
        <Link
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title="clear formating"
          sx={{
            color: editor.isActive("clear formatting") ? "#8179A6" : "black",

            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
        >
          <FormatClearIcon />
        </Link>
      </Stack>

      <Stack
        flexDirection="row"
        gap={2}
      >
        <Link
          title="align left"
          sx={{
            color: editor.isActive({ textAlign: "left" }) ? "#8179A6" : "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
          onClick={() => editor.commands.setTextAlign("left")}
        >
          <FormatAlignLeftIcon />
        </Link>

        <Link
          title="align center"
          sx={{
            color: editor.isActive({ textAlign: "center" })
              ? "#8179A6"
              : "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
          onClick={() => editor.commands.setTextAlign("center")}
        >
          <FormatAlignCenterIcon />
        </Link>

        <Link
          title="align right"
          sx={{
            color: editor.isActive({ textAlign: "right" })
              ? "#8179A6"
              : "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
          onClick={() => editor.commands.setTextAlign("right")}
        >
          <FormatAlignRightIcon />
        </Link>
      </Stack>

      <Stack
        flexDirection="row"
        gap={2}
      >
        <Link
          onClick={() => editor.chain().focus().setParagraph().run()}
          title="paragraph"
          sx={{
            color: editor.isActive("paragraph") ? "#8179A6" : "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
        >
          <FormatTextdirectionLToRIcon />
        </Link>
        <Link
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          title="h2"
          sx={{
            color: editor.isActive("h2") ? "#8179A6" : "black",
            cursor: "pointer",
            fontWeight: 800,
            fontSize: 18,
            marginBottom: 1,
            textDecoration: "none",
            "&:hover": { color: "#8179A6" },
          }}
        >
          H2
        </Link>
        <Link
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          title="h3"
          sx={{
            color: editor.isActive("h3") ? "#8179A6" : "black",
            cursor: "pointer",
            fontWeight: 800,
            fontSize: 18,
            marginBottom: 1,
            textDecoration: "none",
            "&:hover": { color: "#8179A6" },
          }}
        >
          H3
        </Link>
        <Link
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          title="h4"
          sx={{
            color: editor.isActive("h4") ? "#8179A6" : "black",
            cursor: "pointer",
            fontWeight: 800,
            fontSize: 18,
            marginBottom: 1,
            textDecoration: "none",
            "&:hover": { color: "#8179A6" },
          }}
        >
          H4
        </Link>
        <Link
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="block quote"
          sx={{
            color: editor.isActive("block quote") ? "#8179A6" : "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
        >
          <FormatQuoteIcon />
        </Link>
      </Stack>

      <Stack
        flexDirection="row"
        gap={2}
      >
        <Link
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="bullet list"
          sx={{
            color: editor.isActive("bullet list") ? "#8179A6" : "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
        >
          <FormatListBulletedIcon />
        </Link>
        <Link
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="ordered list"
          sx={{
            color: editor.isActive("ordered list") ? "#8179A6" : "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
        >
          <FormatListNumberedIcon />
        </Link>
      </Stack>

      <Stack
        flexDirection="row"
        gap={2}
      >
        {" "}
        <Link
          onClick={() => setLinkHandler()}
          title="add link"
          sx={{
            color: editor.isActive("link") ? "#8179A6" : "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
        >
          <AddLinkIcon />
        </Link>
        <Link
          onClick={() => editor.commands.unsetLink()}
          title="remove link"
          sx={{
            color: "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
        >
          <LinkOffIcon />
        </Link>
        {itemType === "post" && (
          <Link
            title="upload image"
            onClick={onUpladImageClick}
            sx={{
              color: "black",
              cursor: "pointer",
              "&:hover": { color: "#8179A6" },
            }}
          >
            <ImageIcon />
            <input
              accept={".*"}
              multiple={false}
              name={"theFiles"}
              onChange={onImageInputChangeHanlder}
              ref={fileInputRef}
              style={{ display: "none" }}
              type="file"
            />
          </Link>
        )}
      </Stack>

      <Stack
        flexDirection="row"
        gap={2}
      >
        <Link
          onClick={() => editor.chain().focus().undo().run()}
          title="undo"
          sx={{
            color: editor.isActive("undo") ? "#8179A6" : "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
        >
          <UndoIcon />
        </Link>
        <Link
          onClick={() => editor.chain().focus().redo().run()}
          title="redo"
          sx={{
            color: editor.isActive("redo") ? "#8179A6" : "black",
            cursor: "pointer",
            "&:hover": { color: "#8179A6" },
          }}
        >
          <RedoIcon />
        </Link>
      </Stack>
    </Box>
  );
};

export default MenuBar;

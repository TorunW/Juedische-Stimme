import React, { ReactElement, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Link from "@tiptap/extension-link";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import MenuBar from "./MenuBar";
import {
  TextField,
  Box,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // Grid version 1
import FormHelp from "../atoms/FormHelp";

interface TipTapEditorProps {
  value: string;
  onChange: Function;
  itemId?: string | number;
  itemType?: string;
  showMenu?: boolean;
  height?: number;
  title?: string;
  help?: string;
  min?: number;
}

const TipTapEditor = (props: TipTapEditorProps) => {
  const { value, onChange, showMenu, height, title } = props;
  const [charLength, setCharLength] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        HTMLAttributes: {
          class: "tiptap-link",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      setCharLength(editor.getText().length);
    },
    onBlur: ({ editor }) => {
      let rawHtml = editor.getHTML();
      onChange(rawHtml);
    },
  });
  let menuDispaly: ReactElement;
  if (showMenu !== false) {
    menuDispaly = <MenuBar editor={editor} />;
  }
  return (
    <>
      <Box
        sx={{
          border: 2,
          borderRadius: 1,
          borderColor: "black",
        }}
      >
        {menuDispaly}
        <Divider />
        <Box
          sx={{
            height: height ? height : "auto",
            overflowY: "scroll",
            marginY: 1,
            marginX: 1,
            "> div": {
              height: "100%",
              "> div": {
                height: "100%",
                "&:focus": {
                  outline: "none",
                },
              },
            },
          }}
        >
          <EditorContent editor={editor} />
        </Box>
      </Box>
      <Chip
        sx={{
          fontSize: "16px",
          marginTop: "8px",
          borderRadius: "4px",
        }}
        label={
          <>
            {charLength} {props.min && `/ ${props.min}`}
          </>
        }
      ></Chip>
    </>
  );
};

const TipTapEditorWrapper = (props: TipTapEditorProps) => {
  const [showEditor, setShowEditor] = useState(true);

  let editorDisplay: ReactElement;
  if (showEditor === true) {
    editorDisplay = <TipTapEditor {...props} />;
  } else {
    editorDisplay = (
      <TextField
        margin="normal"
        variant="outlined"
        focused
        multiline
        sx={{
          width: "100%",
        }}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    );
  }
  return (
    <Grid
      item
      xs={12}
    >
      <Grid
        container
        sx={{ marginBottom: 2 }}
      >
        <Grid
          item
          xs={7}
        >
          <Box
            flexDirection="row"
            display="flex"
            alignItems="center"
          >
            {props.title && <Typography variant="h6">{props.title}</Typography>}
            {props.help && <FormHelp text={props.help}></FormHelp>}
          </Box>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                color="secondary"
                onClick={() =>
                  setShowEditor(showEditor === true ? false : true)
                }
              />
            }
            label={showEditor === true ? "Show html" : "Show editor"}
          />
        </Grid>
      </Grid>
      {editorDisplay}
    </Grid>
  );
};

export default TipTapEditorWrapper;

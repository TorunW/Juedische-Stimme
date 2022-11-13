import React, { ReactElement, useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import MenuBar from "./MenuBar";
import {
  TextField,
  Box,
  Divider,
  FormControlLabel,
  Button,
  Switch,
  Typography,
  Chip,
  ButtonGroup,
} from "@mui/material";
import FormHelp from "../atoms/FormHelp";
import { Stack } from "@mui/system";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";

import HtmlIcon from "@mui/icons-material/Html";
import { type } from "@testing-library/user-event/dist/types/utility";

export enum EditorHeight {
  small = "250px",
  medium = "500px",
  large = "100vh",
}

interface TipTapEditorProps {
  value: string;
  onChange: Function;
  setCharLength?: Function;
  editorId?: string;
  itemId?: string | number;
  itemType?: string;
  showMenu?: boolean;
  help?: string;
  error?: string | ReactElement;
  height?: EditorHeight | number;
  title?: string;
  min?: number;
}

const TipTapEditor = (props: TipTapEditorProps) => {
  const {
    value,
    editorId,
    setCharLength,
    onChange,
    showMenu,
    height,
    itemId,
    itemType,
  } = props;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        HTMLAttributes: {
          class: "tiptap-link",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      let rawHtml = editor.getHTML();
      onChange(rawHtml);
      setCharLength(editor.getText().length);
    },
  });

  useEffect(() => {
    if (editor) setCharLength(editor.getText().length);
  }, [editor]);

  return (
    <>
      <Box
        sx={{
          border: 2,
          borderRadius: 1,
          borderColor: "black",
          height: height ?? "auto",
        }}
      >
        {showMenu !== false && (
          <MenuBar
            editor={editor}
            itemId={itemId}
            itemType={itemType}
          />
        )}
        <Divider />
        <Box
          id={editorId}
          sx={{
            overflowY: "auto",
            maxHeight: "calc(100% - 60px)",
            marginY: 1,
            marginX: 1,
            height: "100%",
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
    </>
  );
};

const TipTapEditorWrapper = (props: TipTapEditorProps) => {
  const { value, onChange, min, height, title, itemId, itemType } = props;

  const [showEditor, setShowEditor] = useState(true);
  const [isResizable, setIsResizable] = useState(false);

  const [charLength, setCharLength] = useState(0);
  const [adjustedHeight, setAdjustedHeight] = useState<EditorHeight | number>(
    height
  );

  const [editorId, setEditorId] = useState("");

  function handleMouseMove(event) {
    if (isResizable === true) {
      const editorTopPosition = document
        .getElementById(editorId)
        ?.getBoundingClientRect().top;
      const mousePosition = event.clientY;
      if (!!editorTopPosition) {
        const newEditorHeight = mousePosition - editorTopPosition + 40;
        setAdjustedHeight(newEditorHeight);
      }
    }
  }

  function handleMouseUp() {
    setIsResizable(false);
  }

  useEffect(() => {
    setEditorId(`editor-${Date.now()}`);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizable]);

  function handleResize() {
    setIsResizable(true);
  }

  let editorDisplay: ReactElement;
  if (showEditor === true) {
    editorDisplay = (
      <TipTapEditor
        {...props}
        setCharLength={setCharLength}
        editorId={editorId}
        height={adjustedHeight}
      />
    );
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

  const charDisplay = charLength + (!!min ? "/" + min : "");

  return (
    <>
      <Stack
        sx={{ minWidth: "100%" }}
        marginBottom={1}
      >
        <Stack
          flexDirection="row"
          paddingY={2}
          justifyContent="space-between"
        >
          <Box
            flexDirection="row"
            display="flex"
            alignItems="center"
          >
            {props.title && <Typography variant="h6">{props.title}</Typography>}
            {props.help && <FormHelp text={props.help}></FormHelp>}
          </Box>
        </Stack>
        {editorDisplay}
      </Stack>
      <Stack
        sx={{ minWidth: "100%" }}
        flexDirection="row-reverse"
      >
        <ButtonGroup variant="contained">
          <Button sx={{ backgroundColor: "secondary.main", cursor: "default" }}>
            {charDisplay}
          </Button>
          <Button
            sx={{ backgroundColor: "secondary.main" }}
            onClick={() => setShowEditor(!showEditor)}
          >
            <HtmlIcon />
          </Button>
          <Button
            sx={{ backgroundColor: "secondary.main" }}
            onMouseDown={handleResize}
          >
            <AspectRatioIcon />
          </Button>
        </ButtonGroup>
      </Stack>
    </>
  );
};

export default TipTapEditorWrapper;

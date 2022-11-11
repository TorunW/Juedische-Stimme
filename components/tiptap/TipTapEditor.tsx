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
} from "@mui/material";
import FormHelp from "../atoms/FormHelp";
import { Stack } from "@mui/system";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";

export enum EditorHeight {
  small = "250px",
  medium = "500px",
  large = "100vh",
}

interface TipTapEditorProps {
  value: string;
  onChange: Function;
  itemId?: string | number;
  itemType?: string;
  showMenu?: boolean;
  height?: EditorHeight;
  title?: string;
  help?: string;
  min?: number;
  error?: string | ReactElement;
}

const TipTapEditor = (props: TipTapEditorProps) => {
  const { value, onChange, showMenu, height, title } = props;
  const [isResizable, setIsResizable] = useState(false);

  const [editorId, setEditorId] = useState("");

  const [charLength, setCharLength] = useState(0);
  const [adjustedHeight, setAdjustedHeight] = useState<EditorHeight | number>(
    height
  );

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

  function handleResize() {
    setIsResizable(true);
  }

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
    if (editor) setCharLength(editor.getText().length);
  }, [editor]);

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

  return (
    <>
      <Box
        sx={{
          border: 2,
          borderRadius: 1,
          borderColor: "black",
          height: adjustedHeight ?? "auto",
        }}
      >
        {showMenu !== false && <MenuBar editor={editor} />}
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
      <Stack
        justifyContent="space-between"
        flexDirection="row"
      >
        <Chip
          sx={{
            fontSize: "16px",
            marginTop: "8px",
            borderRadius: "4px",
          }}
          label={charLength}
        ></Chip>
        <AspectRatioIcon
          onMouseDown={handleResize}
          sx={{
            cursor: "pointer",
            marginY: 1,
          }}
        />
      </Stack>
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
    <Stack sx={{ minWidth: "100%" }}>
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
        <FormControlLabel
          control={
            <Switch
              defaultChecked
              color="secondary"
              onClick={() => setShowEditor(showEditor === true ? false : true)}
            />
          }
          label={showEditor === true ? "Show html" : "Show editor"}
        />
      </Stack>
      {editorDisplay}
    </Stack>
  );
};

export default TipTapEditorWrapper;

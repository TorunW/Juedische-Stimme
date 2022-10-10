import React, { ReactElement, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import styles from './Styles.module.css';
import MenuBar from './MenuBar';
import {
  TextField,
  Button,
  Box,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';
import Grid from '@mui/material/Grid'; // Grid version 1

interface TipTapEditorProps {
  value: string;
  onChange: Function;
  itemId?: string | number;
  itemType?: string;
  showMenu?: boolean;
  height?: number;
  title?: string;
}

const TipTapEditor = (props: TipTapEditorProps) => {
  const { value, onChange, showMenu, height, title } = props;
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: value,
    onUpdate: ({ editor }) => {
      let rawHtml = editor.getHTML();
      onChange(rawHtml);
    },
  });
  let menuDispaly: ReactElement;
  if (showMenu !== false) {
    menuDispaly = <MenuBar editor={editor} />;
  }
  return (
    <div>
      <Box
        sx={{
          border: 2,
          borderRadius: 1,

          borderColor: '#8179A6',
        }}
      >
        {menuDispaly}
        <Divider sx={{ borderColor: '#8179A6' }} />
        <Box sx={{ height: '100%', paddingY: 2, paddingX: 4 }}>
          <EditorContent editor={editor} />
        </Box>
      </Box>
    </div>
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
        margin='normal'
        variant='outlined'
        focused
        multiline
        sx={{
          width: '100%',
          // minHeight: 70,
        }}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    );
  }
  console.log(showEditor);
  return (
    <Grid item xs={10}>
      <Grid container sx={{ marginBottom: 2 }}>
        <Grid item xs={7}>
          <h3>{props.title}</h3>
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  color='secondary'
                  onClick={() =>
                    setShowEditor(showEditor === true ? false : true)
                  }
                />
              }
              label={showEditor === true ? 'Show html' : 'Show editor'}
            />
          </FormGroup>
        </Grid>
      </Grid>

      {editorDisplay}
    </Grid>
  );
};

export default TipTapEditorWrapper;

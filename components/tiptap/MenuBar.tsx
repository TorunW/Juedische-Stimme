import React, { useRef } from 'react';
import styles from './Styles.module.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatTextdirectionLToRIcon from '@mui/icons-material/FormatTextdirectionLToR';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { Link, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: 2,
        paddingX: 2,
        paddingTop: 1,
        alignItems: 'center',
      }}
    >
      <Link
        onClick={() => editor.chain().focus().toggleBold().run()}
        title='bold'
        sx={{
          color: editor.isActive('bold') ? '#8179A6' : 'black',
          cursor: 'pointer',
          '&:hover': { color: '#8179A6' },
        }}
      >
        <FormatBoldIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title='italic'
        sx={{
          cursor: 'pointer',
          color: editor.isActive('italic') ? '#8179A6' : 'black',
          '&:hover': { color: '#8179A6' },
        }}
      >
        <FormatItalicIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title='strike'
        sx={{
          color: editor.isActive('strike') ? '#8179A6' : 'black',
          cursor: 'pointer',
          '&:hover': { color: '#8179A6' },
        }}
      >
        <FormatStrikethroughIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        title='clear formating'
        sx={{
          color: editor.isActive('clear formatting') ? '#8179A6' : 'black',

          cursor: 'pointer',
          '&:hover': { color: '#8179A6' },
        }}
      >
        <FormatClearIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().setParagraph().run()}
        title='paragraph'
        sx={{
          color: editor.isActive('paragraph') ? '#8179A6' : 'black',
          cursor: 'pointer',
          '&:hover': { color: '#8179A6' },
        }}
      >
        <FormatTextdirectionLToRIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title='h2'
        sx={{
          color: editor.isActive('h2') ? '#8179A6' : 'black',
          cursor: 'pointer',
          fontWeight: 800,
          fontSize: 18,
          marginBottom: 1,
          textDecoration: 'none',
          '&:hover': { color: '#8179A6' },
        }}
      >
        H2
      </Link>
      <Link
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title='h3'
        sx={{
          color: editor.isActive('h3') ? '#8179A6' : 'black',
          cursor: 'pointer',
          fontWeight: 800,
          fontSize: 18,
          marginBottom: 1,
          textDecoration: 'none',
          '&:hover': { color: '#8179A6' },
        }}
      >
        H3
      </Link>
      <Link
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        title='h4'
        sx={{
          color: editor.isActive('h4') ? '#8179A6' : 'black',
          cursor: 'pointer',
          fontWeight: 800,
          fontSize: 18,
          marginBottom: 1,
          textDecoration: 'none',
          '&:hover': { color: '#8179A6' },
        }}
      >
        H4
      </Link>
      <Link
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title='bullet list'
        sx={{
          color: editor.isActive('bullet list') ? '#8179A6' : 'black',
          cursor: 'pointer',
          '&:hover': { color: '#8179A6' },
        }}
      >
        <FormatListBulletedIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title='ordered list'
        sx={{
          color: editor.isActive('ordered list') ? '#8179A6' : 'black',
          cursor: 'pointer',
          '&:hover': { color: '#8179A6' },
        }}
      >
        <FormatListNumberedIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title='block quote'
        sx={{
          color: editor.isActive('block quote') ? '#8179A6' : 'black',
          cursor: 'pointer',
          '&:hover': { color: '#8179A6' },
        }}
      >
        <FormatQuoteIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().undo().run()}
        title='undo'
        sx={{
          color: editor.isActive('undo') ? '#8179A6' : 'black',
          cursor: 'pointer',
          '&:hover': { color: '#8179A6' },
        }}
      >
        <UndoIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().redo().run()}
        title='redo'
        sx={{
          color: editor.isActive('redo') ? '#8179A6' : 'black',
          cursor: 'pointer',
          '&:hover': { color: '#8179A6' },
        }}
      >
        <RedoIcon />
      </Link>
    </Box>
  );
};

export default MenuBar;
/*
<a className={editor.isActive('bold') ? styles.isActive : ''}></a>
<a className={editor.isActive('italic') ? styles.isActive : ''}></a>
<a className={editor.isActive('strike') ? styles.isActive : ''}></a>
<a className={editor.isActive('code') ? styles.isActive : ''}></a>
      <a className={editor.isActive('paragraph') ? styles.isActive : ''}></a>
      <a className={editor.isActive('orderedList') ? styles.isActive : ''}></a>
      <a className={editor.isActive('bulletList') ? styles.isActive : ''}></a>
      <a
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive('heading', { level: 5 }) ? styles.isActive : ''
        }
      >
        h5
      </a>
      <a
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive('heading', { level: 6 }) ? styles.isActive : ''
        }
      >
        h6
      </a>
            <a
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? styles.isActive : ''}
      >
        code block
      </a>
            <a className={editor.isActive('blockquote') ? styles.isActive : ''}></a>

      */

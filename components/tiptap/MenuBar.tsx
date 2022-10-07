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
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { Link, Box } from '@mui/material';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: 2,
        padding: 1,
        alignItems: 'center',
      }}
    >
      <Link
        onClick={() => editor.chain().focus().toggleBold().run()}
        title='bold'
        sx={{
          cursor: 'pointer',
          '&:hover': { color: '#8179A6' },
        }}
      >
        <FormatBoldIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title='italic'
      >
        <FormatItalicIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title='strike'
      >
        <FormatStrikethroughIcon />
      </Link>

      <Link
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        title='clear formating'
      >
        <FormatClearIcon />
      </Link>

      <Link
        onClick={() => editor.chain().focus().setParagraph().run()}
        title='paragraph'
      >
        <FormatTextdirectionLToRIcon />
      </Link>

      <a
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title='h2'
        className={
          editor.isActive('heading', { level: 2 }) ? styles.isActive : ''
        }
      >
        h2
      </a>
      <a
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title='h3'
        className={
          editor.isActive('heading', { level: 3 }) ? styles.isActive : ''
        }
      >
        h3
      </a>
      <a
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        title='h4'
        className={
          editor.isActive('heading', { level: 4 }) ? styles.isActive : ''
        }
      >
        h4
      </a>
      <Link
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title='bullet list'
      >
        <FormatListBulletedIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title='ordered list'
      >
        <FormatListNumberedIcon />
      </Link>
      <Link
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title='block quote'
      >
        <FormatQuoteIcon />
      </Link>
      <Link onClick={() => editor.chain().focus().undo().run()} title='undo'>
        <UndoIcon />
      </Link>
      <Link onClick={() => editor.chain().focus().redo().run()} title='redo'>
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

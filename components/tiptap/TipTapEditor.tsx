import React, { ReactElement } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import styles from '/Styles.module.css';
import MenuBar from './MenuBar';

interface TipTapEditorProps {
  value: string;
  onChange: Function;
  itemId?: string | number;
  itemType?: string;
  showMenu?: boolean;
  height?: number;
}

const TipTapEditor = ({
  value,
  onChange,
  itemId,
  itemType,
  showMenu,
  height,
}: TipTapEditorProps) => {
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
    menuDispaly = (
      <MenuBar editor={editor} itemId={itemId} itemType={itemType} />
    );
  }

  return (
    <div className={styles.container}>
      {menuDispaly}
      <div className={styles.body} style={{ height: height ? height : '' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;

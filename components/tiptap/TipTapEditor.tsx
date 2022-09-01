import React, { ReactElement, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import styles from './Styles.module.css';
import MenuBar from './MenuBar';

interface TipTapEditorProps {
  value: string;
  onChange: Function;
  itemId?: string | number;
  itemType?: string;
  showMenu?: boolean;
  height?: number;
}

const TipTapEditor = (props : TipTapEditorProps) => {
  const { value, onChange, itemId, itemType, showMenu, height } = props
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

const TipTapEditorWrapper = (props:TipTapEditorProps) => {

  const [ showEditor , setShowEditor ] = useState(true)

  let editorDisplay: ReactElement;
  if (showEditor === true){
    editorDisplay = <TipTapEditor {...props}/>
  } else {
    editorDisplay = <textarea style={{width:"100%",minHeight:"400px"}} value={props.value} onChange={e => props.onChange(e.target.value)}></textarea>
  }

  return (
    <div style={{width:"100%"}} className='tip-tap-editor-wrapper'>
      <a style={{border:"1px solid #000"}} onClick={() => setShowEditor(showEditor === true ? false : true)}>Toggle Editor</a>
      {editorDisplay}
    </div>
  )
}

export default TipTapEditorWrapper;

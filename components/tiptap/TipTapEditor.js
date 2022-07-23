import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import styles from 'styles/tiptap.module.css'
import MenuBar from './MenuBar'

const TipTapEditor = ({value, onChange, itemId, itemType, showMenu, height}) => {

    const editor = useEditor({
        extensions: [
          StarterKit,Image
        ],
        content: value,
        onUpdate:({editor}) => {
            let rawHtml = editor.getHTML()
            onChange(rawHtml)
        }
    })

    let menuDispaly;
    if (showMenu !== false){
        menuDispaly = (
            <MenuBar 
              editor={editor} 
              itemId={itemId}
              itemType={itemType}
            />
        )
    }

    return (
        <div className={styles.container}>
            {menuDispaly}
            <div className={styles.body} style={{height:height ? height  : ""}}>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default TipTapEditor;
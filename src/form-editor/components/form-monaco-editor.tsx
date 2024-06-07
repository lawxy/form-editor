import React, { useRef, useState } from 'react';
import type { FC } from 'react';
import MonacoEditor from '@monaco-editor/react';

export const FormMonacoEditor: FC<{
  value?: string;
  onChange?: (value?: string) => void;
  [key: string]: any;
}> = ({ value, onChange, ...rest }) => {
  const handleChange = (val?: string) => {
    onChange?.(val)
  }
  const [height, setH] = useState(60)
  const editorRef = useRef<HTMLDivElement>(null);

  const handleEditorDidMount = (editor, monaco) => {
    // editorRef.current
    // console.log('editor')
    // console.log(editor)
    // console.log('monaco')
    // console.log(monaco)
    // console.log(editorRef.current)
    
    const resizeEditor = () => {
      setTimeout(() => {
        const lines = editorRef.current?.querySelectorAll('.view-line');
        console.log(lines)
        const h = lines.length*19;
        // const section = editorRef.current?.querySelector(':scope > section');
        // console.log('height')
        // console.log(h)
        // console.log('editorRef.current')
        // console.log(editorRef.current)
        // editorRef.current.style.cssText = `height: ${height}px !important;`
        if(h<60){
          setH(100)
        }else {

          setH(h)
        }
      })
      // const contentHeight = Math.min(500, editor.getContentHeight()); // 最多500高度
      // editor.layout({
      //   width: editor.getLayoutInfo().width,
      //   height: contentHeight
      // });
      // console.log('resizeEditor',resizeEditor)
    };

    resizeEditor();
    editor.onDidContentSizeChange(resizeEditor);
  };

  return (
   

      <MonacoEditor
        value={value}
        onChange={handleChange}
        {...rest}
      />
  );
};

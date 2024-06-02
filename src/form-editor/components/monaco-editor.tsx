import React, { useRef } from "react";

import MonacoEditor from "@monaco-editor/react";

function Editor() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }

  return (
    <MonacoEditor
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onMount={handleEditorDidMount}
      onChange={e => {
        console.log(e)
      }}
    />
  );
}

export default Editor;
import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import initWorkers from './userWorker';
// initWorkers();

interface EditorProps {
  onValidate?: (markers: monaco.editor.IMarker[]) => void;
  onChange?: (value: any) => void;
  language: string;
  value: string;
  style?: React.CSSProperties;
  options?: object;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const MonacoEditor: React.FC<EditorProps> = ({
  onValidate,
  style,
  language,
  value,
  onChange,
  options,
  onFocus,
  onBlur,
}) => {
  const monacoEl = useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    // 监听编辑器聚焦事件
    editor?.onDidFocusEditorText(() => {
      onFocus?.();
    });

    // 监听编辑器失去焦点事件
    editor?.onDidBlurEditorText(() => {
      onBlur?.();
    });
  }, [editor]);

  useEffect(() => {
    if (monacoEl.current) {
      const model = monaco.editor.createModel(value || '', language);

      const newEditor = monaco.editor.create(monacoEl.current, {
        model: model,
        ...(options || {}),
      });

      setEditor(newEditor);

      return () => {
        newEditor.dispose();
        model.dispose();
      };
    }
  }, [monacoEl.current]);

  useEffect(() => {
    if (editor) {
      const changeMarkersListener = monaco.editor.onDidChangeMarkers((uris) => {
        const editorUri = editor.getModel()?.uri;

        if (editorUri) {
          const currentEditorHasMarkerChanges = uris.some(
            (uri) => uri.path === editorUri.path,
          );
          if (currentEditorHasMarkerChanges) {
            const markers = monaco.editor.getModelMarkers({
              resource: editorUri,
            });
            onValidate?.(markers);
          }
        }
      });

      return () => {
        changeMarkersListener.dispose();
      };
    }
  }, [editor, onValidate]);

  useEffect(() => {
    if (editor && value !== undefined && editor.getValue() !== value) {
      editor.setValue(value);
    }
  }, [editor, value]);

  useEffect(() => {
    if (!editor) return;
    const handleChange = editor.onDidChangeModelContent(() => {
      onChange?.(editor.getValue());
    });
    return () => {
      handleChange.dispose();
    };
  }, [editor, onChange]);

  return <div style={style || {}} ref={monacoEl} />;
};

export const useMonaco = () => {
  return useMemo(() => monaco, [monaco]);
};

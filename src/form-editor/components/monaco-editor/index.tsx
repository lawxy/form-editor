import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import loader from '@monaco-editor/loader';
// loader.config({ monaco });
// loader.init()
import './userWorker'

interface EditorProps {
	onValidate?: (markers: monaco.editor.IMarker[]) => void;
	onChange?: (value: any) => void;
	language: string;
	defaultValue: string;
	style?: React.CSSProperties;
	options?: object;
}

const MonacoEditor: React.FC<EditorProps> = ({ onValidate, style, language, defaultValue, onChange, options }) => {
	const monacoEl = useRef<HTMLDivElement | null>(null);
	const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);

	useEffect(() => {
		if (monacoEl.current) {
			const model = monaco.editor.createModel(
				defaultValue || '',
				language
			);

			const newEditor = monaco.editor.create(monacoEl.current, {
				model: model,
				...(options || {})
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
					const currentEditorHasMarkerChanges = uris.some((uri) => uri.path === editorUri.path);
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
		if (!editor) return
		const handleChange = editor.onDidChangeModelContent(() => {
			// console.log('Content changed:', editor.getValue());
			onChange?.(editor.getValue())
		});
		return () => {
			handleChange.dispose();
		}
	}, [editor, onChange])

	return <div style={style || {}} ref={monacoEl} />;
};

export default MonacoEditor;

export const useMonaco = () => {
	return useMemo(() => monaco, [monaco])
}
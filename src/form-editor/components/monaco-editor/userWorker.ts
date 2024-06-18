import * as monaco from 'monaco-editor';
// import loader from '@monaco-editor/loader';
// loader.config({ monaco });
// loader.init()

self.MonacoEnvironment = {
	getWorkerUrl: function (_moduleId: any, label: string) {
		// if (label === 'json') {
		// 	return './json.worker.bundle.js';
		// }
		// if (label === 'css' || label === 'scss' || label === 'less') {
		// 	return './css.worker.bundle.js';
		// }
		// if (label === 'html' || label === 'handlebars' || label === 'razor') {
		// 	return './html.worker.bundle.js';
		// }
		// if (label === 'typescript' || label === 'javascript') {
		// 	return './ts.worker.bundle.js';
		// }
		// return './editor.worker.bundle.js';
	}
};


monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

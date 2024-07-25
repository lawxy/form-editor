import * as monaco from 'monaco-editor';
import loader from '@monaco-editor/loader';

loader.config({ monaco });
const _this = self;

_this.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      // return '../../../workers/css.worker.bundle.js';
      return './css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  },
};
monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  noSemanticValidation: true,
  noSyntaxValidation: true,
});

const initWorkers = () => {
  // @ts-ignore
  _this.MonacoEnvironment = {
    getWorkerUrl: function (_moduleId: any, label: string) {
      if (label === 'json') {
        return './json.worker.bundle.js';
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        // return '../../../workers/css.worker.bundle.js';
        return './css.worker.bundle.js';
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return './html.worker.bundle.js';
      }
      if (label === 'typescript' || label === 'javascript') {
        return './ts.worker.bundle.js';
      }
      return './editor.worker.bundle.js';
    },
  };
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });
};

// Initialize Monaco Editor
// loader
//   .init()
//   .then(() => {
//     initWorkers();
//   })
//   .catch((err) => {
//     console.error('Error initializing Monaco Editor:', err);
//   });

export default initWorkers;

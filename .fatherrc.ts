// import { defineConfig } from 'father';

// const isWatch = process.argv.toString().indexOf('--watch') > -1;

// const config = isWatch
//   ? {
//       esm: {
//         type: 'babel',
//         importLibToEs: true,
//       },
//       disableTypeCheck: true,
//     }
//   : defineConfig({
//       // more father config: https://github.com/umijs/father/blob/master/docs/config.md
//       esm: { output: 'es' },
//       cjs: { output: 'lib' },
//     });

// export default config;

import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: { output: 'es' },
  // cjs: { output: 'lib' },
});

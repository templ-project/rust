import templEslintConfig from '@templ-project/eslint';

export default [
  {
    ignores: [
      '.eslintignore',
      '.gitignore',
      '.jscpd/**',
      '.prettierignore',
      '.venv/**',
      '_uvx_install/**',
      '**/*.config.cjs',
      '**/*.config.js',
      '**/*.config.mjs',
      'coverage/**',
      'dist/**',
      'docs-html/**',
      'jsconfig.json',
      'LICENSE',
      'node_modules/**',
      'package-lock.json',
      'package.json',
      'target/**',
      'tsconfig.json',
    ],
  },
  ...templEslintConfig,
];

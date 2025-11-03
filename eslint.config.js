import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import reactDom from 'eslint-plugin-react-dom';
import prettier from 'eslint-config-prettier';

export default tseslint.config({
	extends: [...tseslint.configs.recommended, prettier],
	files: ['src/**/*.{ts,tsx}'],
	languageOptions: {
		ecmaVersion: 2020,
		globals: globals.browser,
		parserOptions: {
			project: ['./tsconfig.json'],
			tsconfigRootDir: import.meta.dirname,
		},
	},
	plugins: {
		react: react,
		'react-dom': reactDom,
		'react-hooks': reactHooks,
		'react-refresh': reactRefresh,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		...react.configs.recommended.rules,
		...reactDom.configs.recommended.rules,
		...reactHooks.configs.recommended.rules,
		...reactRefresh.configs.recommended.rules,
		'react/react-in-jsx-scope': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'react-dom/no-dangerously-set-innerhtml': "off",
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'never',
			},
		],
	},
});

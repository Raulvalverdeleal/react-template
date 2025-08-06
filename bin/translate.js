import fs from 'fs';
import path from 'path';

/**
 * KEY CONSIDERATIONS
 * - do not use any kind of expression inside translation strings, use placeholders instead.
 * - Comented translations will also be added to the output file.
 * - do not use translation codes, only translation itself as the key, ex:
 *   * "my translation": "my translation"
 */

/* CONFIG ======================================================= */
/** @type {TranslateConfig} */
const config = {
	searchIn: 'src',
	fileExtensions: ['ts', 'tsx'],
	json: {
		fileName: 'default-translations',
		output: 'src/assets',
	},
	patterns: [
		/__\([\s]{0,}"((?:\\.|[^"\\])*)"/g, //__("capture this")
		/__\([\s]{0,}'((?:\\.|[^'\\])*)'/g, //__('capture this')
	],
};
/* ============================================================== */

/* SCRIPT ======================================================= */
const translations = new Set();

// -> get initial translations if specified
extractTranslations();

// -> searchIn for translations in the specified inputs
handleSearch();

// -> sort translations
const sortedTranslations = new Set([...translations].sort((a, b) => a.localeCompare(b)));

// -> build translation files
buildJSON();
buildPHP();
/* ============================================================== */

/* HELPERS ====================================================== */
function exitIfNotFound(dir) {
	if (fs.existsSync(dir)) return;

	console.error(`Error: '${dir}' not found.`);
	process.exit(1);
}

function extractTranslationsFromJSONFile(directory) {
	const fileTranlations = new Set();

	if (!fs.existsSync(directory)) return fileTranlations;
	const content = fs.readFileSync(directory, 'utf-8');

	try {
		const json = JSON.parse(content);
		Object.values(json).forEach((translations) => fileTranlations.add(translations));
	} catch (error) {
		console.error(error);
	}

	return fileTranlations;
}

function extractTranslationsFromPHPFile(directory) {
	const fileTranlations = new Set();

	if (!fs.existsSync(directory)) return fileTranlations;

	const content = fs.readFileSync(directory, 'utf-8');
	for (const pattern of config.patterns) {
		let match;
		while ((match = pattern.exec(content)) !== null) {
			fileTranlations.add(match[1]);
		}
	}

	return fileTranlations;
}

function extractTranslations() {
	if (!config.input) return;
	const inputs = (Array.isArray(config.input) ? config.input : [config.input]).map((p) => resolvePath(p));

	for (const input of inputs) {
		if (!fs.existsSync(input)) {
			console.error(`${input} does not exist`);
			continue;
		}

		const extension = input.split('.').at(-1);
		if (extension === 'json') {
			extractTranslationsFromJSONFile(input).forEach((t) => translations.add(t));
		} else if (extension === 'php') {
			extractTranslationsFromPHPFile(input).forEach((t) => translations.add(t));
		} else {
			console.error(`File extension .${extension} is not supported as an input file.`);
			process.exit(1);
		}
	}
}

function buildJSON() {
	if (!config.json) return;
	const outputDir = path.join(resolvePath(config.json.output), config.json.fileName + '.json');

	let deleted = 0,
		added = 0;
	const previousTranlations = extractTranslationsFromJSONFile(outputDir);

	const data = {};
	previousTranlations.forEach((t) => {
		if (!sortedTranslations.has(t)) deleted += 1;
	});
	sortedTranslations.forEach((t) => {
		if (!previousTranlations.has(t)) added += 1;
		data[t] = t;
	});

	try {
		fs.writeFileSync(outputDir, JSON.stringify(data, null, 2), 'utf-8');
		printStatus('JSON', added, deleted, outputDir);
	} catch (err) {
		console.error(`\x1b[31merror:\x1b[0m ${err.message}`);
		process.exit(1);
	}
}

function buildPHP() {
	if (!config.php) return;

	const outputDir = path.join(resolvePath(config.php.output), config.php.fileName + '.php');

	let deleted = 0,
		added = 0;
	const previousTranlations = extractTranslationsFromPHPFile(outputDir);
	let data = `<?php\n\n$translations = [`;

	previousTranlations.forEach((t) => {
		if (!sortedTranslations.has(t)) deleted += 1;
	});
	sortedTranslations.forEach((t, index) => {
		if (!previousTranlations.has(t)) added += 1;
		data += `\n\t"${t}" => __("${t}","${config.php.template || config.name}")${index === sortedTranslations.size - 1 ? '' : ','}`;
	});

	data += '\n];';

	try {
		fs.writeFileSync(outputDir, data, 'utf-8');
		printStatus('PHP', added, deleted, outputDir);
	} catch (error) {
		console.error(`\x1b[31merror:\x1b[0m ${error.message}`);
		process.exit(1);
	}
}

function handleSearch() {
	if (!config.searchIn) return;
	let startSize = translations.size;

	const directories = (Array.isArray(config.searchIn) ? config.searchIn : [config.searchIn]).map((p) =>
		resolvePath(p)
	);

	for (const directory of directories) {
		searchIn(directory);
	}

	let endSize = translations.size;
	let searchCount = endSize - startSize;
	if (searchCount > 0) console.log(`\x1b[32m\u2714\x1b[0m ${searchCount} strings found.`);
}

function searchIn(directory) {
	exitIfNotFound(directory);
	const files = fs.readdirSync(directory, { withFileTypes: true });

	for (const file of files) {
		const filePath = path.join(directory, file.name);

		if (file.isDirectory()) {
			searchIn(filePath);
			continue;
		}

		if (config.fileExtensions.every((exension) => !file.name.endsWith(exension))) {
			continue;
		}

		try {
			const content = fs.readFileSync(filePath, 'utf-8');
			for (const pattern of config.patterns) {
				let match;
				while ((match = pattern.exec(content)) !== null) {
					translations.add(match[1]);
				}
			}
		} catch (err) {
			console.error(err.message);
		}
	}
}

function printStatus(title, added, deleted, output) {
	console.log(
		`\x1b[44m${title}:\x1b[0m\n\x1b[32m+\x1b[0m ${added} Added\n\x1b[31m-\x1b[0m ${deleted} Deleted\n\x1b[34m\u2192 ${output}\x1b[0m`
	);
}

function resolvePath(str) {
	if (path.isAbsolute(str)) return str;
	return path.resolve(process.cwd(), str);
}

/**
 *
 * @typedef {Object} JSONOptions
 * @property {string} fileName - the name of the generated json file
 * @property {string} output - the directory of the generated json file
 *
 * @typedef {Object} PHPOptions
 * @property {string} fileName - the name of the generated json file
 * @property {string} output - the directory of the generated json file
 * @property {string|undefined} template - if not set, will use `name` instead.
 *
 * @typedef {Object} TranslateConfig
 * @property {RegExp[]} patterns - everything that matches it will be captured & added to translations
 * @property {string | string[]} input - Translations to start with
 * @property {string[]} fileExtensions - Any other extension not included, will be ignored in the searchIn
 * @property {string | string[]} searchIn - the directory/s where the pattern will be searched
 * @property {JSONOptions} [json]
 * @property {PHPOptions} [php]
 */

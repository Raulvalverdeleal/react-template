import { execSync } from 'child_process';

/* CONFIG ======================================================= */
const config = {
	expectedBranch: 'main',
};
/* ============================================================== */

/* SCRIPT ======================================================= */
const args = loadArgs();
checkBranch(args.expectedBranch);
/* ============================================================== */

function checkBranch(expectedBranch) {
	try {
		const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
		if (currentBranch !== expectedBranch) {
			console.error(`\x1b[31m\u2718\x1b[0m Current branch ${currentBranch}, switch to ${expectedBranch} to proceed`);
			process.exit(1);
		}
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

function loadArgs() {
	const args = parseArgs();
	const computedArgs = {
		expectedBranch: args['-e'] || args['--expected'] || config.expectedBranch,
	};

	for (const [name, value] of Object.entries(computedArgs)) {
		if (value) continue;
		console.error(`${name} is not defined.`);
		process.exit(1);
	}

	return computedArgs;
}

function parseArgs() {
	const args = process.argv.slice(2);
	const params = {};

	for (let i = 0; i < args.length; i += 2) {
		const key = args[i];
		const value = args[i + 1];
		params[key] = value;
	}

	return params;
}

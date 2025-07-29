import { execSync } from 'child_process';

/**
 * KEY CONSIDERATIONS
 * - 1.0.0
 * - will exit with 1 if expected does not match with current branch.
 * - use case:
 *  branch.js -b main && npm run pro:deploy #unable to deploy in production any other branch than main
 *  npm run pre:deploy #able to deply in pre every branch
 */

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
			console.error(`\x1b[31m\u2718\x1b[0m switch to ${expectedBranch} to proceed`);
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
		expectedBranch: args['-b'] || args['-branch'] || args['--branch'] || config.expectedBranch,
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

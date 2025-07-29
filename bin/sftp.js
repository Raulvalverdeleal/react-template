import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

/**
 * KEY CONSIDERATIONS
 * - 1.0.0
 * - this script assumes you have added your ssh key to the server
 * - config values may be overwritten by args values
 * - use config as your default args to simplify the usage insead of
 *   passing every time action user host local remote.
 * - every key in config has it corresponding arg key with the following aliases, ex for `action`:
 *   * -a
 *   * -action
 *   * --action
 */
/* CONFIG ======================================================= */
/**@type {UploadOptions} */
const config = {
	user: 'root',
	host: 'example.com',
};
/* ============================================================== */

/* SCRIPT ======================================================= */
const args = loadArgs();
if (args.action.toLocaleLowerCase() === 'put') {
	upload();
} else if (args.action.toLocaleLowerCase() === 'get') {
	download();
} else {
	console.log("\x1b[31m\u2718\x1b[0m Action should be 'get' or 'put'");
	process.exit(1);
}
/* ============================================================== */

/* HELPERS ====================================================== */

function upload() {
	const isFile = path.extname(args.local) !== '';

	const sftpCommand = isFile
		? `mkdir ${args.remote}\ncd ${args.remote}\nput ${args.local}`
		: `mkdir ${args.remote}\ncd ${args.remote}\nlcd ${args.local}\nput -r .`;

	const sftpScript = `${sftpCommand}\nbye`;

	console.log(`\x1b[34m\u2192\x1b[0m sftp ${args.user}@${args.host}`);
	console.log(
		`\x1b[34m\u2192\x1b[0m ${args.action.toLocaleUpperCase()} \x1b[34mLocal:\x1b[0m ${args.local} \u2192 \x1b[34mRemote:\x1b[0m ${args.remote}`
	);
	handleSftpConnection(args, sftpScript);
}

function download() {
	const isFile = path.extname(args.remote) !== '';

	const sftpCommand = isFile ? `get ${args.remote} ${args.local}` : `lcd ${args.local}\ncd ${args.remote}\nget -r .`;

	const sftpScript = `${sftpCommand}\nbye`;

	console.log(`\x1b[34m\u2192\x1b[0m sftp ${args.user}@${args.host}`);
	console.log(
		`\x1b[34m\u2192\x1b[0m ${args.action.toLocaleUpperCase()} \x1b[34mRemote:\x1b[0m ${args.remote} \u2192 \x1b[34mLocal:\x1b[0m ${args.local}`
	);
	handleSftpConnection(args, sftpScript);
}

function handleSftpConnection({ user, host }, sftpScript) {
	try {
		const sftpProcess = spawn('sftp', [`${user}@${host}`]);

		sftpProcess.stdin.write(sftpScript);
		sftpProcess.stdin.end();

		// uncomment to show sftp logs
		// sftpProcess.stdout.on("data", (data) => {
		//     process.stdout.write(data);
		// });
		// sftpProcess.stderr.on("data", (data) => {
		//     process.stderr.write(data);
		// });

		sftpProcess.on('close', (code) => {
			if (code === 0) {
				console.log('\x1b[32m\u2714\x1b[0m Successfuly completed.');
			} else {
				console.error('\x1b[31m\u2718\x1b[0m SFTP process exited with code:', code);
				process.exit(code);
			}
		});
	} catch (error) {
		console.error('Error during SFTP', error.message);
		process.exit(1);
	}
}

/** @type {() => UploadOptions} */
function loadArgs() {
	const args = parseArgs();
	const computedArgs = {
		user: args['-u'] || args['-user'] || args['--user'] || config.user,
		host: args['-h'] || args['-host'] || args['--host'] || config.host,
		local: resolvePath(args['-l'] || args['-local'] || args['--local'] || config.local),
		remote: args['-r'] || args['-remote'] || args['--remote'] || config.remote,
		action: args['-a'] || args['-action'] || args['--action'] || config.action,
	};

	for (const [name, value] of Object.entries(computedArgs)) {
		if (value) continue;
		console.error(`${name} is not defined.`);
		process.exit(1);
	}

	if (computedArgs.action === 'put' && !fs.existsSync(computedArgs.local)) {
		console.error(`${computedArgs.local} does not exist.`);
		process.exit(1);
	}

	return computedArgs;
}

function resolvePath(str) {
	if (path.isAbsolute(str)) return str;
	return path.resolve(process.cwd(), str);
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

/**
 * @typedef {Object} UploadOptions
 * @property {string} [user]
 * @property {string} [host]
 * @property {string} [local]
 * @property {string} [remote]
 * @property {"put" | "get"} [action]
 */

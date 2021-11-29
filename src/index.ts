import chalk from 'chalk';
import child from 'child_process';
import path from 'path';
import { Message } from './types';

const wait = async () => {
	process.stdin.setRawMode(true);

	return new Promise<void>((resolve) =>
		process.stdin.once('data', (data) => {
			const byteArray = [...data];
			if (byteArray.length > 0 && byteArray[0] === 3) {
				console.log('^C');
				process.exit(1);
			}
			process.stdin.setRawMode(false);
			resolve();
		})
	);
};

const info = (text: string) => {
	console.log(
		chalk.bgCyanBright(chalk.black('INFO')),
		chalk.cyanBright(text)
	);
};

const success = (text: string) => {
	console.log(
		chalk.bgGreenBright(chalk.black('SUCCESS')),
		chalk.greenBright(text)
	);
};

const error = (text: string, customName: string | false = 'ERR') => {
	if (customName == false) {
		console.log(chalk.redBright(text));
	} else {
		console.log(
			chalk.bgRedBright(chalk.black(customName)),
			chalk.redBright(text)
		);
	}
};

const space = () => console.log(' ');

const log = (...s: string[]) => console.log(s.join(' '));

const init = async () => {
	process.title = 'Roblox Studio Presence Launcher';

	if (!process.argv.includes('--silent') && !process.argv.includes('-s')) {
		log(
			chalk.bgMagentaBright(chalk.black('Roblox Studio Presense v1.0.0'))
		);
		log(chalk.magentaBright('By RealSGII2'));
		space();

		log('The application is starting.');
		log(
			"Please install the plugin for Roblox Studio if you haven't already."
		);
		space();

		log('The presence will not work without it.');
		space();

		log(
			'You may safely close this window, and the presence will continue to run.'
		);
		log(
			'To close it, close the Node.js Javascript Runtime process in your task manager.'
		);
		space();

		log(
			'Run this application with the `--silent` option to skip this prompt.'
		);
		log('silent.bat will do this for you.');
		space();

		log(chalk.magentaBright('Press CTRL C or CMD C to close.'));
		space();

		wait();
	}

	child.fork(path.join(__dirname + '/server.asset.js'), {
		detached: true,
		stdio: 'ignore',
	}).unref();
};

init();

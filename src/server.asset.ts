import { cookie, port, clientId } from './app.config';
import chalk from 'chalk';
import express from 'express';
import RPC from 'discord-rpc';
import axios from 'axios';

import {
	ActivityDetails,
	ActivityToken,
	Message,
	MessageOp,
	Place,
} from './types';

if (cookie) {
	axios.defaults.headers.common = {
		Cookie: `.ROBLOSECURITY=${cookie}`,
	};
} else {
	console.warn('No cookie set');
}

const space = () => console.log(' ');

const log = (...s: string[]) => console.log(s.join(' '));

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

const client = new RPC.Client({
	transport: 'ipc',
});

let savedActivity: ActivityDetails;
const updateActivity = async (_activity: ActivityDetails) => {
	savedActivity = { ...savedActivity, ..._activity };

	if (_activity.startTime == 'now') {
		savedActivity.startTime = new Date(Date.now());
	}

	let { activity, placeId, startTime, isIdle } = savedActivity;

	const rpcActivity: RPC.Presence = {
		largeImageText: 'Roblox Studio',
	};

	if (isIdle) {
		rpcActivity.details = 'No experience open';
	}

	if (activity) {
		switch (activity.token) {
			case ActivityToken.Place:
				rpcActivity.state = 'Building World';
				rpcActivity.smallImageKey = 'build_icon_test1';
				rpcActivity.smallImageText = 'Editing the world';
				break;

			case ActivityToken.Script:
				rpcActivity.state = `Editing ${activity.state}.lua`;
				rpcActivity.smallImageKey = 'script_icon_test3';
				rpcActivity.smallImageText = 'Editing a script';
				break;
		}
	}

	if (placeId) {
		const place: Place = (
			await axios.get(
				`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeId}`
			)
		).data[0];

		console.log();

		rpcActivity.details = place.name;
		rpcActivity.largeImageKey = 'studio_icon';

		if (!rpcActivity.buttons) rpcActivity.buttons = new Array();

		rpcActivity.buttons.push({
			label: 'View Game',
			url: place.url,
		});
	}

	if (startTime) {
		rpcActivity.startTimestamp = startTime as number | Date | undefined;
	}

	client.setActivity(rpcActivity);
};

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

const init = async () => {
	process.title = 'Roblox Studio Presence Runtime';

	info('Starting RPC Client...')

	// Log in with the RPC Client
	await client
		.login({
			clientId,
		})
		.then(async () => {
			success('RPC Client started!')
			space()

			success('Starting Server...')

			// Start the server
			await initServer()
				.then(() => {
					success('Server started!')
					space()

					log('Please install the plug-in linked on the GitHub page if you haven\'t.')
					log('Also, be sure to report any bugs on GitHub.')
					space()

					success('Press any key to exit.')
				});
		})
		.catch(async (e: Error) => {});
};

const initServer = () => {
	process.title = 'Roblox Studio Presence Runtime';

	return new Promise<void>((resolve, reject) => {
		try {
			const app = express();
			app.use(express.json());

			app.put('/', (req, res) => {
				if (Object.keys(req.body ?? {}).length == 0) {
					return res.sendStatus(400);
				}

				try {
					updateActivity(req.body);

					res.sendStatus(200);
				} catch (e) {
					res.sendStatus(500);
				}
			});

			app.delete('/', (req, res) => {
				client.clearActivity();
			});

			app.listen(port, () => {
				resolve();
			});
		} catch (e) {
			reject(e);
		}
	});
};

init();

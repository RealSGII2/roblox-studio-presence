export enum ActivityToken {
	Place,
	Script,
}

export type ActivityDetails = {
	isIdle?: boolean;
	activity?:
		| {
				token: ActivityToken.Script;
				state: string;
		  }
		| {
				token: ActivityToken.Place;
		  }
		| null;
	placeId?: string | null;
	startTime?: Date | number | 'now' | null;
};

export type Place = {
	placeId: number;
	name: string;
	description: string;
	url: string;
	builder: string;
	builderId: string;
	isPlayable: boolean;
	reasonProhibited: string;
	universeId: number;
	universeRootPlaceId: number;
	price: number;
	imageToken: string;
};

export type MessageOp = 'log' | 'info' | 'success' | 'error' | 'space' | 'promptClose';

export type Message = {
    op: MessageOp;
    content: string;
    removeLabel: boolean;
}
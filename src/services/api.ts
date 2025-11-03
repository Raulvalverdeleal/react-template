import { SuperFetch, SuperFetchOptions } from '@/utils/classes/super-fetch.ts';

class Api extends SuperFetch {
	constructor(options: SuperFetchOptions) {
		super(options);
	}

	// add endpoints as methods
	// see docs for more information
}

export function createApi(options: SuperFetchOptions) {
	return new Api(options);
}

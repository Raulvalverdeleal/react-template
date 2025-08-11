import { fakeData } from '@/assets/index.ts';
import { ServiceOptions, SamplePayload, SampleResponse } from '@types';
import { Enviroments, SuperFetch, apiRoot, enviroment } from '@utils';

export class Api extends SuperFetch {
	constructor(options: ServiceOptions) {
		super(options.root, options);
	}

	doSomething(_data: SamplePayload) {
		// return this.get<SampleResponse>("/endpoint", {searchParams: "here"});
		// return this.post<SampleResponse>("/endpoint", {body: "here"});
		return this.fake<SampleResponse>(fakeData.apiResponses.doSomenthing);
	}
}
export const api = new Api({
	logRequests: enviroment !== Enviroments.PRO,
	root: `${apiRoot}/my-app-router`,
});

import { ServiceOptions, SamplePayload, SampleResponse } from '@types';
import { Enviroments, SuperFetch, apiRoot, enviroment } from '@utils';

export class Api extends SuperFetch {
	constructor(options: ServiceOptions) {
		super(options.root, options);
	}

	doSomething(data: SamplePayload) {
		return this.fake<SampleResponse>({ bar: data.foo });
	}
}

export const api = new Api({
	logRequests: enviroment !== Enviroments.PRO,
	root: `${apiRoot}/my-app-router`,
});

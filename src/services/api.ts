import { ServiceOptions, LoginPayload, LoginResponse } from '@types';
import { Enviroments, SuperFetch, Enviroment } from '@utils';
import { fakeData } from '@assets';

export class Api extends SuperFetch {
	constructor(options: ServiceOptions) {
		super(options.roots[Enviroment], options);
	}

	doSomething(_data: LoginPayload) {
		return this.fake<LoginResponse>({ data: fakeData.user });
	}
}

export const api = new Api({
	logRequests: Enviroment !== Enviroments.PRO,
	roots: {
		[Enviroments.LOCAL]: 'http://localhost:3080/api-pre/widget',
		[Enviroments.PRE]: 'https://rumba.cardamomo.com/api-pre/widget',
		[Enviroments.PRO]: 'https://rumba.cardamomo.com/api/widget',
	},
});

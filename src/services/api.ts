import { EnviromentsValue, LoginData, LoginResponse, SuperFetchOptions } from '@types';
import { Enviroments, SuperFetch, Enviroment, load, Storages, StorageKeys } from '@utils';
import { fakeData, data } from '@assets';

export class Api extends SuperFetch {
	constructor(enviroment: EnviromentsValue, options: SuperFetchOptions) {
		let root = '',
			outlet = '';

		switch (enviroment) {
			case Enviroments.LOCAL:
				root = 'http://localhost:3080';
				outlet = '/api-pre/router';
				break;
			case Enviroments.PRE:
				root = 'https://example.com';
				outlet = '/api-pre/router';
				break;
			case Enviroments.PRO:
				root = 'https://example.com';
				outlet = '/api/router';
				break;
		}

		super(root, outlet, options);
	}

	async login(_data: LoginData) {
		// return this.post<LoginResponse>("/login", data)
		return this.fake<LoginResponse>({ user: fakeData.user });
	}
}

export const api = new Api(Enviroment, {
	logRequests: Enviroment !== Enviroments.PRO,
	token: load(Storages.LOCAL, StorageKeys.USER, data.default.user).token,
});

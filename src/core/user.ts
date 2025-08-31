import { StateOptions, UserData } from '@types';
import { State } from '@utils';
import { mocks } from '@assets';

export class User extends State<UserData> {
	constructor(user: Partial<UserData>, options?: StateOptions) {
		super({ ...mocks.default.user, ...user }, options);
	}

	get token() {
		return this.data.token;
	}
	get id() {
		return this.data.id;
	}
	get name() {
		return this.data.name.trim();
	}
	get email() {
		return this.data.email;
	}

	clear() {
		if (this.localStorageKey) localStorage.removeItem(this.localStorageKey);
		if (this.sessionStorageKey) localStorage.removeItem(this.sessionStorageKey);

		return this.setData(mocks.default.user);
	}
}

import { StateOptions, UserData } from '@types';
import { State } from '@utils';
import { mocks } from '@assets';

export class User extends State<UserData> {
	#options?: StateOptions;

	constructor(user: Partial<UserData>, options?: StateOptions) {
		super({ ...mocks.default.user, ...user }, options);
		this.#options = options;
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
		if (this.#options?.localStorageKey) localStorage.removeItem(this.#options.localStorageKey);
		if (this.#options?.sessionStorageKey) localStorage.removeItem(this.#options.sessionStorageKey);

		return this.setData(mocks.default.user);
	}
}

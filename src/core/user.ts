import { LoginResponse, StateOptions, UserData } from '@types';
import { State, load, StorageKeys, Storages } from '@utils';
import { data } from '@assets';

export class User extends State<UserData> {
	#options?: StateOptions;

	constructor(user: Partial<UserData>, options?: StateOptions) {
		super({ ...data.default.user, ...user }, options);
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

	login(data: LoginResponse['user']) {
		return this.setData(data);
	}
	clear() {
		if (this.#options?.localStorageKey) localStorage.removeItem(this.#options.localStorageKey);
		if (this.#options?.sessionStorageKey) localStorage.removeItem(this.#options.sessionStorageKey);

		return this.setData(data.default.user);
	}
}

export const user = new User(load(Storages.LOCAL, StorageKeys.USER, data.default.user), {
	localStorageKey: StorageKeys.USER,
});

import { StateOptions } from '@types';

export class State<T> {
	#renderFunction?: () => void;
	protected data: T;
	protected localStorageKey;
	protected sessionStorageKey;
	protected dataEffect;

	constructor(data: T, options?: StateOptions) {
		this.data = JSON.parse(JSON.stringify(data));
		this.localStorageKey = options?.localStorageKey;
		this.sessionStorageKey = options?.sessionStorageKey;
		this.dataEffect = new Map();
	}

	render() {
		if (!this.#renderFunction) {
			throw new Error('state has not render funciton yet');
		}

		this.#renderFunction();
	}

	setRender(callback: () => void) {
		if (!this.#renderFunction) {
			this.#renderFunction = callback;
		}
	}

	setData(data: Partial<T>) {
		this.data = {
			...this.data,
			...data,
		};

		if (this.localStorageKey) {
			localStorage.setItem(this.localStorageKey, JSON.stringify(this.data));
		}
		if (this.sessionStorageKey) {
			sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(this.data));
		}

		this.dataEffect.forEach((callback) => callback());

		return this;
	}
}

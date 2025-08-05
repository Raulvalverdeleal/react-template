import { StateOptions } from '@types';

export class State<T> {
	#renderFunction?: () => void;
	private _data: T;
	protected localStorageKey;
	protected sessionStorageKey;
	protected dataEffect;

	constructor(data: T, options?: StateOptions) {
		this._data = JSON.parse(JSON.stringify(data));
		this.localStorageKey = options?.localStorageKey;
		this.sessionStorageKey = options?.sessionStorageKey;
		this.dataEffect = new Map();
	}

	get data() {
		return this._data;
	}

	protected set data(data: T) {
		this._data = data;
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
		this._data = {
			...this._data,
			...data,
		};

		if (this.localStorageKey) {
			localStorage.setItem(this.localStorageKey, JSON.stringify(this._data));
		}
		if (this.sessionStorageKey) {
			sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(this._data));
		}

		this.dataEffect.forEach((callback) => callback());
	}
}

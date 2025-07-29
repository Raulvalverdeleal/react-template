import { BaseResponse } from '@types';
import { __ } from '@utils';

type SuperFetchOptions = {
	token?: string | null;
	logRequests?: boolean;
	timeout?: number;
	retries?: number;
};

type RequestOptions = {
	token?: string | null;
	timeout?: number;
	log?: boolean;
	retries?: number;
	headers?: { [key: string]: string };
};
export class SuperFetch {
	#token: string | null;
	#root: string;
	#basePath: string;
	#logRequests: boolean;
	#defaultTimeout: number;
	#defaultRetries: number;
	#controllers: Map<string, AbortController>;

	constructor(root: string, basePath?: string, options: SuperFetchOptions = {}) {
		if (!root || typeof root !== 'string' || !/^https?:\/\//.test(root)) {
			throw new Error("Invalid 'root' URL provided.");
		}

		this.#root = root;
		this.#basePath = basePath || '';
		this.#token = options.token || null;
		this.#logRequests = options.logRequests || false;
		this.#defaultTimeout = options.timeout || 0;
		this.#defaultRetries = options.retries || 0;
		this.#controllers = new Map<string, AbortController>();
	}

	async #request(
		method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
		path: string,
		data: object | string | null = null,
		opts: RequestOptions = {}
	) {
		const url = this.#buildUrl(path, method === 'GET' ? (data as object | null) : null);
		const controller = this.#createAbortController(`${method}::${path}`);
		const timeoutMs = opts.timeout ?? this.#defaultTimeout;
		const attempts = 1 + (opts.retries ?? this.#defaultRetries);

		for (let attempt = 0; attempt < attempts; attempt++) {
			let timeoutId: number | undefined;
			const startTime = performance.now();

			try {
				if (timeoutMs > 0) {
					timeoutId = setTimeout(() => controller.abort(), timeoutMs);
				}

				const baseHeaders = {
					...(this.#token ? { authorization: `Bearer ${this.#token}` } : {}),
					...(opts.token ? { authorization: `Bearer ${opts.token}` } : {}),
					...(opts.headers || {}),
				};

				let body: string | object | null = null;
				let contentType: string | undefined = undefined;

				if (data && typeof data === 'object') {
					contentType = 'application/json';
					body = JSON.stringify(data);
				} else if (typeof data === 'string') {
					contentType = 'text/plain';
					body = data;
				}

				const headers: HeadersInit = {
					...(contentType ? { 'Content-Type': contentType } : {}),
					...baseHeaders,
				};

				const response = await fetch(url, {
					method,
					headers,
					body,
					signal: controller.signal,
				});

				if (response.status === 401) {
					localStorage.clear();
					window.location.reload();
					throw new Error(__('Unauthorized user'));
				}

				clearTimeout(timeoutId);

				if (response.ok) {
					this.#log(method, path, response.status, attempt, opts.log, startTime);

					if (response.headers.get('Content-Type')?.includes('application/json')) {
						return response.json();
					} else if (response.headers.get('Content-Type')?.includes('text/plain')) {
						return { data: response.text() };
					} else {
						return { data: response.arrayBuffer() };
					}
				} else {
					throw new Error(response.statusText);
				}
			} catch (err) {
				clearTimeout(timeoutId);

				const errorHasMessage = err instanceof Error || err instanceof DOMException;
				const result = {
					result: 'nok',
					message: errorHasMessage ? err.message : __('An unexpected error has ocurred.'),
					aborted: false,
				};

				if (err === 'abort_request') result.aborted = true;
				this.#log(method, path, 'ERROR', attempt, opts.log, startTime);
				return result;
			}
		}
	}

	get<T>(path: string, params?: object, opts?: RequestOptions): BaseResponse<T> {
		return this.#request('GET', path, params, opts);
	}

	post<T>(path: string, data: object | string, opts?: RequestOptions): BaseResponse<T> {
		return this.#request('POST', path, data, opts);
	}

	put<T>(path: string, data: object | string, opts?: RequestOptions): BaseResponse<T> {
		return this.#request('PUT', path, data, opts);
	}

	patch<T>(path: string, data: object | string, opts?: RequestOptions): BaseResponse<T> {
		return this.#request('PATCH', path, data, opts);
	}

	delete<T>(path: string, opts?: RequestOptions): BaseResponse<T> {
		return this.#request('DELETE', path, null, opts);
	}

	#buildUrl(path: string, params?: object | null): string {
		const url = new URL(`${this.#basePath}${path}`, this.#root);
		if (params && typeof params === 'object') {
			Object.entries(params).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					value.forEach((val) => url.searchParams.append(key, val));
				} else {
					url.searchParams.append(key, value);
				}
			});
		}
		return url.toString();
	}

	abort(key: string): void {
		const ctrl = this.#controllers.get(key);
		if (ctrl) {
			ctrl.abort('abort_request');
			this.#controllers.delete(key);
		}
	}

	#createAbortController(key: string): AbortController {
		this.abort(key);
		const controller = new AbortController();
		this.#controllers.set(key, controller);
		return controller;
	}

	abortAll(): void {
		this.#controllers.forEach((controller) => controller.abort());
		this.#controllers.clear();
	}

	#log(
		method: string,
		path: string,
		status: number | string,
		attempt: number,
		forceLog: boolean | undefined,
		startTime: number
	): void {
		if (!this.#logRequests && !forceLog) return;
		console.log(
			`${method} ${this.#basePath}${path} | Status: ${status} | Attempt: ${attempt + 1} | Duration: ${Math.round(performance.now() - startTime)}ms`
		);
	}

	protected async fake<T>(data?: T, ms?: number | undefined): BaseResponse<T> {
		const error = Math.random() > 1; //change to 0.5 for random failure
		return new Promise((resolve) => setTimeout(resolve, ms ?? 1000)).then(() => ({
			result: error ? 'nok' : 'ok',
			message: error ? 'error' : 'success',
			...(data || {}),
		}));
	}

	set token(value: string | null) {
		this.#token = value;
	}

	get token(): string | null {
		return this.#token;
	}

	get root(): string {
		return this.#root;
	}
}

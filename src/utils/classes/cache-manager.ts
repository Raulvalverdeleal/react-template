class CacheManager {
	private cache = new Map<string, { value: unknown; expiresAt: number }>();
	private expiration: number;

	constructor(expiration = 5 * 60 * 1000) {
		this.expiration = expiration;
	}

	get<T>(key: string): T | null {
		console.log(`Get cache ${String(key)}, current size: ${this.cache.size}`);
		const entry = this.cache.get(key);
		if (!entry) return null;

		if (Date.now() > entry.expiresAt) {
			this.cache.delete(key);
			return null;
		}

		return entry.value as T;
	}

	set(key: string, value: unknown): void {
		const expiresAt = Date.now() + this.expiration;
		this.cache.set(key, { value, expiresAt });
	}

	has(key: string): boolean {
		return this.get(key) !== null;
	}

	delete(key: string): boolean {
		return this.cache.delete(key);
	}

	clear(): void {
		this.cache.clear();
	}

	get size(): number {
		return this.cache.size;
	}
}

export function createCache() {
	return new CacheManager();
}

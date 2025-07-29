export class TimeoutsHandler {
	private tokens: Map<string, number>;

	constructor() {
		this.tokens = new Map<string, number>();
	}

	get pending(): number {
		return this.tokens.size;
	}

	set(token: string, callBack: () => void, ms: number): void {
		this.clear(token);
		const id = setTimeout(() => {
			callBack();
			this.tokens.delete(token);
		}, ms);
		this.tokens.set(token, id);
	}

	isPending(token: string): boolean {
		return this.tokens.has(token);
	}

	clear(token: string): void {
		if (!this.tokens.has(token)) return;
		clearTimeout(this.tokens.get(token));
		this.tokens.delete(token);
	}

	clearAll(): void {
		this.tokens.forEach((_, token) => {
			this.clear(token);
		});
	}
}

export class IntervalsHandler {
	private tokens: Map<string, number>;

	constructor() {
		this.tokens = new Map<string, number>();
	}

	get inProgress(): number {
		return this.tokens.size;
	}

	set(token: string, callBack: () => void, ms: number): void {
		this.clear(token);
		const id = setInterval(callBack, ms);
		this.tokens.set(token, id);
	}

	isInProgress(token: string): boolean {
		return this.tokens.has(token);
	}

	clear(token: string): void {
		const intervalId = this.tokens.get(token);
		if (!intervalId) return;

		clearInterval(intervalId);
		this.tokens.delete(token);
	}

	clearAll(): void {
		this.tokens.forEach((_, token) => this.clear(token));
	}
}

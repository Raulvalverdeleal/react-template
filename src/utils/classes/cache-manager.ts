import { CacheItem, TableSchema } from '@/types/global.js';

export class CacheManager<Tables extends TableSchema> {
	#memory: Map<keyof Tables, Map<string | number, CacheItem<Tables[keyof Tables]>>>;

	constructor(tableNames: (keyof Tables)[]) {
		this.#memory = new Map();
		tableNames.forEach((tableName) => this.#memory.set(tableName, new Map()));
	}

	get memory() {
		return this.#memory;
	}

	addTable<TableName extends keyof Tables>(name: TableName): void {
		this.#memory.set(name, new Map());
	}

	dropTable<TableName extends keyof Tables>(name: TableName): void {
		this.#memory.delete(name);
	}

	get<TableName extends keyof Tables>(table: TableName, key: string | number): Tables[TableName] | undefined {
		const tableMap = this.#memory.get(table);
		if (!tableMap) throw new Error(`table ${String(table)} does not exist`);

		const entry = tableMap.get(key);
		if (!entry) return undefined;

		if (entry.expiresAt && Date.now() > entry.expiresAt) {
			tableMap.delete(key);
			return undefined;
		}

		return entry.value as Tables[TableName];
	}

	add<TableName extends keyof Tables>(table: TableName, key: string | number, item: Tables[TableName]): void {
		const tableMap = this.#memory.get(table);
		if (!tableMap) throw new Error(`table ${String(table)} does not exist`);

		const expiresAt = Date.now() + 5 * 60 * 1000;

		tableMap.set(key, { value: item, expiresAt });
	}

	delete<TableName extends keyof Tables>(table: TableName, key: string | number): void {
		this.#memory.get(table)?.delete(key);
	}
}

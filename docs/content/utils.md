# Utils

## Cache manager

`CacheManager` is an in-memory cache utility that manages multiple tables of cached data.  
Each entry can have an expiration time, and expired entries are automatically cleaned up on access.

### Features

- Store and retrieve cached items by **table** and **key**.
- Automatic expiration handling (default: **5 minutes**).
- Add or drop entire tables dynamically.
- Type-safe with `TableSchema`.

### Methods

- `get(table: TableName, key: string | number): Tables[TableName] | undefined`
  Retrieve an item. Returns undefined if not found or expired.

- `add(table: TableName, key: string | number, item: Tables[TableName]): void`
  Store an item with a custom defined TTL, (5min by default)

### Usage

```ts
export const cache = new CacheManager<{
	availability: Availabilty;
	shifts: Shift[];
	products: Product[];
}>(['shifts', 'products', 'availability']);

cache.add('availability', month, availabilityResponse);
cache.get('availability', month);
```

---

## DateHelper

`DateHelper` is a utility class for working with JavaScript `Date` objects in a more ergonomic and feature-rich way.  
It abstracts common date/time operations like adding/subtracting time units, formatting, comparisons, and generating useful structures like month calendars.

### Features

- Supporting flexible **date construction** from strings, numbers, or `Date` objects.
- Adding or subtracting **days, weeks, months, or years**.
- Generating **ISO formats** (full timestamp, date-only, month-only).
- Producing a **month matrix** (calendar grid of weeks/days with metadata).
- Checking properties like _isWeekend_, _isToday_, _isBeforeToday_, etc.
- Providing range generators (`day`, `week`, `month`).
- Calculating **differences** between dates in multiple units (ms, s, m, h, d, w, months, years).
- Stripping time, getting start/end of months, years, and weeks.
- Comparing dates by year, month, weekday, or exact date.

### Usage

- Create a helper for today
    ```ts
    const helper = new DateHelper();
    console.log(helper.raw); // today's Date
    ```
- Add or subtract units

    ```ts
    const helper = new DateHelper({ date: '2025-09-01' });

    console.log(helper.addDays(5)); // 2025-09-06
    console.log(helper.subWeeks(2)); // 2025-08-18
    ```

- Get ISO formats

    ```ts
    const helper = new DateHelper();

    console.log(helper.ISO()); // 2025-09-02T12:34:56.000Z
    console.log(helper.ISODate()); // 2025-09-02
    console.log(helper.ISOMonth()); // 2025-09
    ```

- Month matrix (calendar grid)

    ```ts
    const helper = new DateHelper({ date: '2025-09-01', weekStart: 1 });
    const matrix = helper.getMonthMatrix();

    console.log(matrix[0][0]);
    // -> { date: Date, isWeekend: true/false, isInCurrentMonth: true/false, ... }
    ```

- Differences

    ```ts
    const d1 = new DateHelper({ date: '2025-01-01' });
    console.log(d1.diff('2025-09-01', 'd')); // 243 days
    console.log(d1.diff('2024-09-01', 'y')); // 1 year
    ```

- Comparisons

    ```ts
    console.log(DateHelper.compare('2025-09-01', '2025-09-05', 'month')); // true
    console.log(DateHelper.compare('2025-09-01', '2024-09-01', 'year')); // false
    ```

---

## IntervalsHandler

Utility class for managing multiple `setInterval` timers in a safe and organized way.  
It allows you to start, track, and clear intervals using string tokens, preventing conflicts or orphaned intervals.

### Features

- Keep track of multiple intervals simultaneously.
- Avoid duplicate intervals with the same token.
- Easily check if a specific interval is running.
- Clear a single interval or all intervals at once.
- Provides a central place to manage repeated async tasks or UI updates.

### Methods

- `inProgress`  
  returns the amount of intervals in progress
- `set(token: string, callBack: () => void, ms: number): void`  
  clears the interval with token if exists & create a new one.
- `isInProgress(token: string): boolean`  
   return `true` wether the interval is in progress or not
- `clear(token: string): void`  
  clears the specified interval
- `clearAll(): void`  
  clears all the intervals in progress

### Usage

```ts
export const intervals = new IntervalsHandler();
intervals.set('check-connection', handleCheckConnection, 1000);
```

---

## TimeoutsHandler

Utility class for managing multiple `setTimeout` timers in a safe and organized way.  
It allows you to start, track, and clear timeouts using string tokens, preventing conflicts or orphaned timeouts.

### Features

- Keep track of multiple timeouts simultaneously.
- Avoid duplicate timeouts with the same token.
- Easily check if a specific timeout is pending.
- Clear a single timeout or all timeouts at once.
- Provides a central place to manage repeated async tasks or UI updates.

### Methods

- `pending`  
  returns the amount of pending timeouts.
- `set(token: string, callBack: () => void, ms: number): void`  
  clears the timeout with that token if exists & create a new one.
- `isPending(token: string): boolean`  
   return `true` wether the interval is in progress or not
- `clear(token: string): void`  
  clears the specified timeout
- `clearAll(): void`  
  clears all pending timeouts

### Usage

```ts
export const timeouts = new TimeoutsHandler();
timeouts.set('redirect', handleRedirect, 10000);
```

---

## State

`State` is a base class for creating application core classes with **reactive capabilities**.  
It allows you to manage internal data, persist it to `localStorage` or `sessionStorage`, and trigger a React render function when needed.

### Features

- Encapsulates data with getter/setter.
- Supports partial updates via `setData`.
- Optional persistence via options `localStorageKey` or `sessionStorageKey`.
- Reactive: can link a render function to trigger UI updates.
- Extensible: create specialized classes for business logic (e.g., `User`, `Booking`).

### Methods

- `get data(): T`  
   Returns a reference of the internal data.

- `setData(data: Partial<T>)`  
   Updates state with partial data and persists if any storage key is defined.

- `render()`  
   Triggers the assigned render function (set via `setRender`).

- `setRender(callback: () => void)`  
   Assigns a render callback, typically a `forceUpdate` function from React.

### Usage

```ts
export class User extends State<UserData> {
	constructor(user: Partial<UserData>, options?: StateOptions) {
		super({ ...mocks.default.user, ...user }, options);
	}

	/* ... */
}
```

---

## Translator

`Translator` is a utility class for handling **translations and localization** in your application.  
It supports multiple languages, placeholder replacement, and inline formatting tags.

### Features

- Load and merge translation records.
- Extract translations from strings with language markers (`[:en]Hello[:]`).
- Apply placeholders and inline formatting (`%s`, `%break`, `%end`, custom `<span>` classes).
- Fallback to a default language if a key or translation is missing.
- Dynamic language switching via `setLang`.
- Static helper `translate` for one-off translations without instantiating the class.

### Methods

- `getTranslationCount(): number`  
  Returns the total number of translation keys loaded.

- `mergeTranslations(translations: TranslationsRecord)`  
  Merges new translation data into the existing translations.

- `getTranslationValue(key: TranslationKey): string`  
  Returns the raw translation string for a key, or the key itself if missing.

- `hasTranslation(key: TranslationKey): boolean`  
  Checks if a key exists in the translations.

- `get(key: TranslationKey, ...placeholders: (string | number)[]): string`  
  Returns the translated string with placeholders and formatting applied.

- `setLang(lang: string)`  
  Switches the active language for this instance.

- `json(): TranslationsRecord`  
  Returns the current translations object.

- `translate(key: TranslationKey, options: TranslatorConstructor & { placeholders: (string | number)[] }): string`  
  Quick static translation method that applies language selection, placeholders, and formatting.

- `isSupportedLanguage(language: string): boolean`  
  Checks if a language is supported by the application configuration.

### Usage

```ts
const translator = new Translator({ translations, lang, fallbackLang });
export const __ = (key: TranslationKey, ...placeholders: (string | number)[]) => translator.get(key, ...placeholders);
```

---

## SuperFetch

`SuperFetch` is a **robust wrapper around the native `fetch` API** designed for modern applications.  
It handles timeouts, retries, authorization tokens, logging, and abortable requests, providing a consistent interface for HTTP calls.

### Features

- Supports `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
- Automatic handling of **Bearer tokens** for authorization.
- Timeout and retry mechanisms built-in.
- Request logging with duration and attempt count.
- Abortable requests via tokens, including `abortAll()`.
- Supports JSON, plain text, and binary responses.
- Fake/mock requests for testing.

### Usage

```ts
const api = new SuperFetch('https://api.example.com', { token: 'abc123', logRequests: true });

const response = await api.get('/users', { page: '1' });
const created = await api.post('/users', { name: 'John' });

api.abort('GET::/users'); // aborts a specific request
api.abortAll(); // aborts all active requests

api.token = 'newToken'; // update default token
```

?> See how create services extending this class [here](/content/services.md#create-a-new-service)

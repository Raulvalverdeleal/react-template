# Utils

## Cache manager

`CacheManager` is an in-memory cache utility that manages cached data.  
Each entry can have an expiration time, and expired entries are automatically cleaned up on access.

### Features

- Store and retrieve cached items by **key**.
- Automatic expiration handling (default: **5 minutes**).

### Methods

- `get<T>(key: string): T`
  Retrieve an item of type `T`. Returns `null` if not found or expired.

- `add(key: string, value: unknown)`
  Store an item with a custom defined TTL, (5min by default)

### Usage

```ts
export const cache = createCache();
cache.add(month, availabilityResponse);
cache.get(month);
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

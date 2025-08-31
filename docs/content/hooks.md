# Hooks

---

## useApp

Provide access to the [AppProvider](/content/components.md#app-providertsx) value

## Usage

```tsx
const { content, setContent } = useApp();
```

---

## useDialog

`useDialog` is a thin wrapper around the global `AppProvider` state for dialogs (`dialogData`). With it, you are able
to switch views or close it anywhere in your app.

- `open(data: DialogData)` - set dialog data to `data`
- `close()` - set dialog data to `null`
- `currentView: DialogView | null` - gets the current value of `dialogData.view`

### Usage

```tsx
const dialog = useDialog();
function onDetailsClick(product: ProductData) {
	dialog.open({ view: 'details', product });
}
```

---

## useLoading

Centralized way to set and get **loading state** across the app.
It uses the global `AppProvider` `loading` counter and keeps things safe with proper cleanup.

- `start()` - +1 to the global loading counter
- `end()` - -1 to the global loading counter
- `now` - loading > 0

### Usage

!> Be sure that `.end()` is called no matter what.

```tsx
const loading = useLoading({ showToast: true });
async function getData() {
	loading.start();
	const response = await api.getData();
	loading.end();
}
```

---

### Preferences

Extends the functionality of the global state `preferences` by adding safe setters.

- `...preferences`
- `setLang(lang: string)` - check if the lang is supported before setting it

### Usage

```tsx
const preferences = usePreferences();
function onSelect(lang: string) {
	preferences.setLang(lang);
}
```

---

### useTranslator

Hook to get a translation function scoped to the current app language (`preferences.lang`).
It falls back to `config.defaultLang` if the key is missing.

- `(key: TranslationKey, ...placeholders): string`
    - `key` – translation key
    - `placeholders` – values to replace placeholders in the translation string

### Usage

!> The key must match the Regex patterns defined in [/bin/translate.js](/content/bins.md#translate) so the translation system can detect it.

```tsx
const __ = useTranslator();
return <p>{__('Hello world!')}</p>;
```

```js
// /bin/translate.js
const config = {
	searchIn: 'src',
	fileExtensions: ['ts', 'tsx'],
	languages: ['es', 'fr', 'it'],
	json: 'src/assets',
	patterns: [
		/__\([\s]{0,}"((?:\\.|[^"\\])*)"/g, //__("capture this")
		/__\([\s]{0,}'((?:\\.|[^'\\])*)'/g, //__('capture this')
	],
};
```

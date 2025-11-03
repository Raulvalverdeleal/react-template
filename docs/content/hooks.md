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

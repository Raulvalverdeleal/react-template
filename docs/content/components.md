# Components

Every react component is exported in `@/components/index.tsx`, no exception. The only export type in this folder is a `ReactNode`. Components folder is also divided in the followinw subdirectories:

| Folder      | Purpose                                                         |
| ----------- | --------------------------------------------------------------- |
| `dialogs`   | Dialog views included in `global-dialog.tsx`.                   |
| `layout`    | Formularies, page sections and so on.                           |
| `pages`     | Page-level components mapped directly in `router.tsx`.          |
| `providers` | Global context providers for state management.                  |
| `ui`        | Shared UI components reused across pages, dialogs, and layouts. |

---

## dialogs

**Adding a new dialog view**  
(`ErrorDialog` will serve as a example)

1. Create the view component in `@/components/dialogs` folder
2. Export it in `@/components/index.tsx`
3. Go to `@/types/global.d.ts` and in `DialogDataMap` add what you need. Note that the key will be the view name.
4. Import the view in `@/components/ui/global-dialog.tsx` and place it where the rest of the views are.

### Error Dialog

The `ErrorDialog` is a view for the `GlobalDialog` component. It accepts a `title` and a `message` and you can optionally add contact buttons similar to those in `ErrorPage`.
It’s perfect for handling known errors, such as API responses. Example usage:

```js
const dialog = useDialog();

async function getData() {
	const response = await api.getData();
	if (response.result !== 'ok') {
		dialog.open({
			view: 'error',
			title: __('Request failed'),
			message: response.message,
		});
	}
}
```

---

## layout

### Footer

The `Footer` component renders a bottom bar with social media links (Instagram, LinkedIn, GitHub) using icons.
It also adds and removes a `has-footer` class on the document body when mounted/unmounted.

### Header

The `Header` component provides a top navigation bar with branding (logo/icon) and a language selector.
It integrates user preferences and translation utilities to ensure the app adapts to user language settings, and toggles a `has-header` class on the document body while mounted.

### Page Wrapper

Defines the base layout for every page in the app. It handles the following responsibilities:

- **Page transitions**  
  Applies smooth opacity transitions between pages using [framer-motion](https://motion.dev/docs/react).

- **Shared layout**  
  Renders global UI components (e.g., `Header`, `Footer`, `Toaster`, `GlobalDialog`) and includes them conditionally depending on page configuration.

- **Secured pages**  
  Protects routes by either redirecting to the login page or managing authentication when the user is not logged in.

- **Outlet**  
  Hosts the [`<Outlet />`](https://api.reactrouter.com/v7/functions/react_router.Outlet.html) component, which renders the actual page components defined in the `BrowserRouter` configuration (`router.tsx`).

?> For secured pages, you can swap `<Loader />` with `<Navigate to="/login" />` to perform an immediate redirect. In cases where authentication is token-based (e.g., from a URL), handling it directly in PageWrapper with a loader might be the better fit. Pick the approach that matches your project’s flow.

---

## pages

### Error Page

The `ErrorPage` component shows a generic error message and offers quick contact options—call, WhatsApp, or email—for support. Users are redirected here whenever an uncaught error occurs.

### Home Page

The `HomePage` component displays a simple landing view as a sample.
It uses the translator hook for text and includes a button that intentionally throws an error when clicked.

### Not Found Page

The `NotFoundPage` component displays a 404 error message when a page is not found.

---

## providers

## app-provider.tsx

The `AppProvider` component sets up the [global app context](/content/contexts.md#appcontext), managing state like `preferences`, `translations`, `loading`, and `dialogs`.

**Key features:**

- Provides `preferences`, `translations`, `loading`, and `dialogData` via AppContext.
- Persists user preferences to localStorage automatically.
- Includes a `forceRender` function to trigger re-renders for dependent sample utilities (`user`, `booking`).
- Wraps children components so they can access and modify app-wide state.

---

## ui

### Error boundary

The `ErrorBoundary` component catches JavaScript errors in its child components and displays a fallback UI.

### Form step controls

The `FormStepControls` component renders a visual stepper interface for multi-step forms.

- The FormStepControls component renders a horizontal stepper for multi-step forms.
- Each step is a circular button displaying a custom icon, connected by lines that indicate progress.
- The current step is visually highlighted.
- Steps can be disabled based on conditions, which grays them out and prevents navigation.
- Connecting lines visually reflect progress between enabled steps.
- Clicking an enabled step triggers the onStepClick callback to navigate between steps.

### Global dialog

The `GlobalDialog` component extends a standard Dialog but must exist as a single instance for the `useDialog()` hook to work correctly.

**Features:**

- Renders a modal that displays different views based on `dialogData`.
- Built with Radix UI's `DialogPrimitive` for accessibility and smooth animations.
- Wrapped in a portal with an overlay and seamless open/close transitions.
- Includes an optional close button to dismiss the dialog.
- Supports custom class names and a centered layout.

### Icon

The `Icon` component renders an SVG icon by referencing a sprite sheet and allows customizing its size and additional HTML attributes.

**Key features:**

- `name` prop selects which icon to render from the sprite sheet.
- `size` prop controls the width and height of the icon (default: 24px).
- Supports standard HTML attributes and custom CSS classes.

### Loader

The `Loader` component displays a full-screen loading spinner when the loading prop is true.

**Key features:**

- Covers the entire parent container with a centered spinner.
- Smoothly hides itself and disables pointer events when `loading` is `false`.
- Uses the `Loader2Icon` with a spin animation.

### Library components

| name            | library                          |  docs                                                         |
| --------------- | -------------------------------- | ------------------------------------------------------------- |
| accordion       | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/accordion)       |
| alert-dialog    | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/alert-dialog)    |
| alert           | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/alert)           |
| avatar          | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/avatar)          |
| badge           | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/badge)           |
| breadcrumb      | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/breadcrumb)      |
| button          | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/button)          |
| calendar        | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/calendar)        |
| card            | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/card)            |
| carousel        | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/carousel)        |
| checkbox        | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/checkbox)        |
| command         | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/command)         |
| dialog          | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/dialog)          |
| form            | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/form)            |
| input-otp       | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/input-otp)       |
| input           | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/input)           |
| label           | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/label)           |
| menubar         | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/menubar)         |
| navigation-menu | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/navigation-menu) |
| popover         | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/popover)         |
| radio-group     | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/radio-group)     |
| select          | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/select)          |
| separator       | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/separator)       |
| sheet           | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/sheet)           |
| skeleton        | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/skeleton)        |
| switch          | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/switch)          |
| tabs            | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/tabs)            |
| textarea        | [shadcn](https://ui.shadcn.com/) | [docs](https://ui.shadcn.com/docs/components/textarea)        |

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

### Error Dialog

---

## layout

### Footer

### Header

### Page Wrapper

---

## pages

### Error Page

### Home Page

### Not Found Page

---

## providers

## app-provider.tsx

Provides access to the global context via `useApp()` hook.

- **forcedRenders**  
   [Core classes](/content/core.md) need a way to render changes in react. Thanks to `forceRender` function, you could write something like `booking.setDate(date).setShift(shift).render();`

- **dialogData**  
  you do not need to access / update this value manually, is managed by [`useDialog()`](/content/hooks.md#usedialog) & [`<GlobalDialog />`](/content/components.md#globaldialogtsx).

- **loading**  
  The number of the pending promises in the application, is managed by [`useLoading()`](/content/hooks.md#useloading).

- **translations**  
  The translations templated, managed by [`useTranslator()`](/content/hooks.md#usetranslator).

- **preferences**  
  The user preferences such as language, managed by [`usePreferences()`](/content/hooks.md#usepreferences)

---

## ui

### Error boundary

### Form step controls

### Global dialog

### Icon

### Loader

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

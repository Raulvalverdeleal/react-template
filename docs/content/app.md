# App

This section describes the core structure of the application, from entry point to layout:

1. [main.tsx](#maintsx) **– App mount**  
   The entry point. Bootstraps React and mounts the root component into the DOM.
2. [router.tsx](#routertsx) **- Routing**  
   Configures application routes using `createBrowserRouter`. Provides page options such us wether is secured or not.
3. [app-provider.tsx](#app-providertsx) **- Global context**  
   Centralized provider for global state and services (e.g., `preferences`, `loading`, `dialogData`). Makes context available across the app.
4. [app.tsx](#apptsx) **- Root logic**
    - Handles uncaught JavaScript errors and environment validation.
    - Wraps the application with high-level logic before rendering routes.
5. [page-wrapper.tsx](#page-wrappertsx) **- Shared layout**  
   Defines UI elements present on all (or most) pages.

---

## main.tsx

Entry point where React mounts.

```tsx
createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
```

> This is the place to integrate with [sentry](https://docs.sentry.io/platforms/javascript/guides/react/) or similar libraries.

---

## router.tsx

This file configures the application routes using `createBrowserRouter`.  
The root component is [`App`](#apptsx).  
Each page supports configurable options, which are handled by `PageWrapper`:

```jsx
{
    path: '*',
    element: <NotFoundPage />,
    handle: { header: true, footer: true, secured: false },
},
```

---

## app-provider.tsx

See `app-provider.tsx` docs [here](/content/components.md#app-providertsx)

---

## app.tsx

The root `App` component is responsible for:

- **Global error handling**  
  Captures uncaught JavaScript errors (e.g., `throw new Error()`, `.map()` on `undefined`, etc.).
  When such an error occurs, the user is redirected to `<ErrorPage />`, which provides contact information. This ensures you can safely throw errors without breaking the user experience.

- **Environment validation**  
  Even if environments are well managed, misconfigurations can still happen.
  The `checkEnvironment()` function ensures the app is running in the correct environment. If the environment is invalid (e.g., production host with a non-production config), it will throw an error. Adjust this check to match your deployment workflow.

!> **Global error handling** should be treated as a **fallback**, not the primary way to handle errors.
For a more user-friendly approach to known errors (e.g., API responses), see [ErrorDialog](/content/components.md#errordialog) or use `toast.error(__("message"))`

---

## page-wrapper.tsx

See `page-wrapper.tsx` docs [here](/content/components.md#page-wrappertsx)

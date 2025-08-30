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
For a more user-friendly approach to known errors (e.g., API responses), see [GlobalDialog](/content/components.md#globaldialog) or use `toast.error(__("message"))`

---

## page-wrapper.tsx

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

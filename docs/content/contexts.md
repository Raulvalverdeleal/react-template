# Contexts

---

## App context

- **forcedRenders**  
   An easy way to force a render in the application.

- **dialogData**  
  you do not need to access / update this value manually, is managed by [`useDialog()`](/content/hooks.md#usedialog) & [`<GlobalDialog />`](/content/components.md#globaldialogtsx).

- **loading**  
  The number of the pending promises in the application, is managed by [`useLoading()`](/content/hooks.md#useloading).

- **preferences**  
  The user preferences such as language, managed by [`usePreferences()`](/content/hooks.md#usepreferences)

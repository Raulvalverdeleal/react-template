# Contexts

## App context

- **forcedRenders**  
   [Core classes](/content/core.md) need a way to hook into react render cycle. Thanks to `forceRender` function, you could write something like `booking.setDate(date).setShift(shift).render();`

- **dialogData**  
  you do not need to access / update this value manually, is managed by [`useDialog()`](/content/hooks.md#usedialog) & [`<GlobalDialog />`](/content/components.md#globaldialogtsx).

- **loading**  
  The number of the pending promises in the application, is managed by [`useLoading()`](/content/hooks.md#useloading).

- **translations**  
  The translations templated, managed by [`useTranslator()`](/content/hooks.md#usetranslator).

- **preferences**  
  The user preferences such as language, managed by [`usePreferences()`](/content/hooks.md#usepreferences)

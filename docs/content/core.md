# Core

## Core Class Pattern

This project uses **classes instead of only React hooks** for managing business logic.
The idea: wrap state, rules, and helpers into reusable entities that are **framework-agnostic** and easy to reason about.

---

### Why use classes?

- **Better encapsulation**  
  All logic and data live inside one entity (`User`, `Booking`, `Order`, etc.) instead of being scattered across multiple hooks.
- **Not React-dependent**  
  Classes can be tested, instantiated, and reused **outside React** (in Node.js, scripts, or workers).
- **Static helpers**  
  Common utilities (like validators, formatters, or factories) can live as static methods.
- **New instances on demand**  
  You can create, reset, or clone entities at any time, without worrying about React’s lifecycle.

---

### How to create your own core class

1. **Extend** `State<T>` with your type (`UserData`, `OrderData`, etc.).
2. **Encapsulate logic** inside instance methods (`addItem()`, `updateProfile()`).
3. **Add static methods** for reusable helpers (`validateEmail()`, `formatDate()`).
4. **Use localStorage or sessionStorage** via `StateOptions` if the state should survive reloads.
5. **Expose a clean API** that React components can consume without caring about the internals.

---

### Usage examples

This class pattern shines when you design **fluent APIs** — methods that return `this` so you can chain multiple calls together and only trigger a re-render at the end.

```ts
// Chaining
order
	.mergeOrderLines(dialogData.order) // update
	.applyDiscount('WELCOME10') // more domain logic
	.render(); // render once at the end

// Impersonate and then render
user.impersonate(response.user).render();

// Login and render in a single chain
user.login(response.user).render();

// Pass booking data to React Router
setSearchParams(booking.entries());

// Work with orders
new Order(dialogData.order).getTotalVariantsQty();
```

Always return `this` **in your setters** so you can:

- Chain multiple operations together.
- Avoid unnecessary renders until the final .render() call.
- Keep the API consistent and predictable.

Example:

```ts
login(user: UserData) {
    this.setData(user);
    return this; // allows chaining
}
```

---

## State

The `State` class is the base for all core classes.
By extending `State`, your domain logic can:

- Hook into React’s rendering cycle (via `setRender`).
- Store data safely in **localStorage** or **sessionStorage**.
- Keep state mutations encapsulated, independent of React.

---

### Example: Hooking into React

Usually done in [`app-provider.tsx`](/content/components.md#app-providertsx)

```tsx
const forceRender = useCallback(() => {
	setForcedRenders((x) => x + 1);
}, []);

user.setRender(forceRender);
```

Now, whenever you call `user.render()`, React will render.

?> ¿Why not by default? Because of chaining, you may want to set various things before rendering. You can make it render by default by calling `render()` directly in the method.

---

### Extending `State`

Your core classes should inherit from `State<T>` to gain persistence and reactivity.

```ts
export class User extends State<UserData> {
	constructor(user: Partial<UserData>, options?: StateOptions) {
		super({ ...mocks.default.user, ...user }, options);
	}
}
```

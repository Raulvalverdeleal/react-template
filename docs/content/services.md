# Services

---

## Create a new service

Just as [core classes](/content/core.md#core-class-pattern) extends from [`state`](/content/core.md#state), services extends from [`SuperFetch`](/content/utils.md#superfetch).

### 1. Create your service class

In `@/services/your-service.md` add the corresponding class.

```ts
export class Api extends SuperFetch {
	constructor(options: ServiceOptions) {
		super(options.root, options);
	}
}
```

### 2. Add endpoints

Create a public method for every endpoint you need, `login()`, `getContent()`... with the corresponding [payload & response types](/content/types.md#api).

### 3. Export

In `@/services/index.ts` add the following line:

```ts
export * from '@/services/your-service.ts';`
```

### 4. Create

Import & create an instamce of your service in the [symbols](/content/utils.md#symbols) file.

```ts
export const api = new Api({
	logRequests: config.enviroment !== Enviroments.PRO,
	root: `${config.apiRoot}/my-app-router`,
});
```

---

## Usage

```ts
async function getClientSecret() {
	loading.start();
	const response = await api.getClientSecret(booking.toJSON()); // request
	loading.end();
	if (response.result !== 'ok') {
		toast.error(response.message);
		return;
	}
	if (response.amount !== booking.amount * 100) {
		toast.error(__('Payment error'));
		return;
	}
	setStripeOptions({ clientSecret: response.secret });
}
```

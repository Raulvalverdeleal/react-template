# Services

---

## Create a new service

Services extends from [`SuperFetch`](/content/utils.md#superfetch).

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

### 3. Create

Import & create an instamce of your service in the [symbols](/content/utils.md#symbols) file.

```ts
export const api = createApi({
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

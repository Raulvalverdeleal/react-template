# Assets

Location of every type of resource the application would need, from `.json` to `.mp4`.  
Here is some quick overview of the existing assets.

## mocks.json

Fake data & default values

| Key         | Used in                               | purpose                                                                                   |
| ----------- | ------------------------------------- | ----------------------------------------------------------------------------------------- |
| `default`   | `@/core/user.ts`, `@/core/booking.ts` | The default value for your models                                                         |
| `fake`      |                                       | Your models filled up with data, it may be useful for some sort of formularies or similar |
| `responses` | `@/services/api.ts`                   | Api responses mocks, for full application flow before the backend is ready                |

## icons.svg

The place to add your custom svgs, se how [here](/content/icons.md)

## translations.json

Your translations template, or its default value if you are storing the translations in the server side (recomended for big projects).

?> This file is entirely managed by `/bin/translate.js` your only duty here is to translate the null values.

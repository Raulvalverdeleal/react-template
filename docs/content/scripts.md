# Scripts

In addition to the vite scripts (`dev`, `start`, `build`, `preview`) **React Template** comes with a set of useful commands out of the box. Below is a list of all available scripts along with a short description.

---

## format

```bash
npm run format
```

?> _npx prettier . --write_

Formats every file in the project following the rules specified in `.prettierrc`. If you are using vscode, this will be executed on-save, see `.vscode/settings.json`.

---

## translate

> See [bin/translate](/content/bins.md#Translate) for more information.

```bash
npm run translate
```

?> _node bin/translate.js_

---

## build

### build:pre

```bash
npm run build:pre
```

?> _npm run translate && dotenv -e .env.pre -- vite build_

Executes `npm run translate` and creates a build with the vars defined in `.env.pre`.

### build:pro

```bash
npm run build:pro
```

?> _npm run translate && dotenv -e .env.pro -- vite build_

Executes `npm run translate` and creates a build with the vars defined in `.env.pro`.

---

## deploy

> See [bin/branch](/content/bins.md#Branch) & [bin/sftp](/content/bins.md#Sftp) for more information.

### deploy:pre

```bash
npm run deploy:pre
```

?> _npm run build:pre && node bin/sftp.js -a put -l build -r /pre/html_

Executes `npm run build:pre` and uses `bin/sftp.js` to upload the preproduction build to the desired remote directory via sftp.

### deploy:pro

```bash
npm run deploy:pro
```

?> _node bin/branch.js && npm run build:pro && node bin/sftp.js -a put -l build -r /pro/html_

Check if we are on branch main first, else aborts. _You can change this behavior in `bin/branch.js config`,_ then executes `npm run build:pro` and uses `bin/sftp.js` to upload the production build to the desired remote directory via sftp.

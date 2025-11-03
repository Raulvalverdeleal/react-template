# Bins

?> All bins (except **translate**) accept the same parameters as their corresponding config properties.  
This makes them flexible, since you don’t need to pass every argument manually — the config acts as a set of default values.  
See how **sftp** is used for both pre-production and production deployments.

---

## Translate

| option         | description                                                                                        | example                                                     |
| -------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| searchIn       | Path to the React application to scan                                                              | src                                                         |
| input          | Additional template files containing translations outside the search directory                     | ["backend/my-template-1.php", "backend/my-template-2.json"] |
| fileExtensions | File extensions to include in the search                                                           | ['ts', 'tsx']                                               |
| languages      | Languages to include directly in `src/assets/translations.json`. Use only if not managed elsewhere | ['es', 'fr', 'it']                                          |
| json           | Output directory for `translations.json`                                                           | src/assets                                                  |
| patterns       | Regular expressions used to extract translation strings                                            | `/\_\_\([\s]{0,}"((?:\\. \| [^"\\])\*)"/g`                  |
| php            | PHP-specific configuration                                                                         | -                                                           |
| php.filename   | Filename for the PHP translation template                                                          | translations                                                |
| php.output     | Output directory for the PHP translation template                                                  | backend                                                     |
| php.template   | WordPress translation template name                                                                | my-template-name                                            |

Translate iterates over the files located in `searchIn` directory building the template as you've specified in the config.
It is possible to generate both templates, or just the PHP one depends on your workflow.
Play around by adding / removing options and see how the output changes.

### Usage

```bash
npm run translate
```

---

## Branch

| option         | inline parameter | alias | description                                    | example |
| -------------- | ---------------- | ----- | ---------------------------------------------- | ------- |
| expectedBranch | --expected       | -b    | The branch to be compared with the current one | main    |

By mistake, you might run `npm run deploy:pro` on the wrong branch.  
This script prevents that by checking the active branch and exiting if it doesn’t match the configured `expectedBranch`.

### Usage

```json
{
	"deploy:pro": "node bin/branch.js && npm run build:pro && node bin/sftp.js -a put -l build -r /pro/html"
}
```

---

## Sftp

| option | inline parameter | alias | description                                              | example          |
| ------ | ---------------- | ----- | -------------------------------------------------------- | ---------------- |
| user   | --user           | -u    | SSH user for the SFTP connection                         | root             |
| host   | --host           | -h    | Target host or server address                            | example.com      |
| local  | --local          | -l    | Local file or directory path                             | build            |
| remote | --remote         | -r    | Remote file or directory path                            | /production/html |
| action | --action         | -a    | Operation to perform: `get` (download) or `put` (upload) | put              |
| dev    | --dev            | -d    | Shows sftp output                                        | 1                |

!> This bin does not handle passwords. It requires your public SSH key to be added to the server’s **authorized_keys**. This ensures sensitive information is not stored in the repository or even in the .env file.

Usually you may want to keep user & host in config, so you can create multiple scripts, for example:

```json
{
	"upload:translations": "node bin/sftp.js -a put -l ./backend/translations.php -r /var/www/wp-content/plugins/my-plugin/backend",
	"download:translations": "node bin/sftp.js -a get -l ./backend -r /var/www/wp-content/plugins/my-plugin/backend/translations.php",
	"upload:build": "node bin/sftp.js -a put -l build -r /var/www/html"
}
```

---

## Add Icon

| option    | inline parameter | alias | description                        | example                 |
| --------- | ---------------- | ----- | ---------------------------------- | ----------------------- |
| name      | --name           | -n    | The icon name                      | menu                    |
| iconsPath | --icons-path     | -i    | The path to the `icons.svg` file   | `src/assets/icons.svg`  |
| typePath  | --type-path      | -t    | The path to the `global.d.ts` file | `src/types/global.d.ts` |

---

## Possibilities

By combining these scripts, you can automate complex workflows with minimal effort.  
The `deploy:pro` pipeline runs through the following steps:

1. **Check branch**  
   Validate the current branch
    ```bash
    node bin/branch.js
    ```
2. **Download translations**  
   Retrieve the latest `translations.php` from the server.
    ```bash
    npm run download:translations
    ```
3. **Translate**  
   Process the downloaded file and update `translations.php` after scanning `searchIn` directory.
    ```bash
    npm run translate
    ```
4. **Upload translations**  
   Push the updated `translations.php` back to the server.

    ```bash
    npm run upload:translations
    ```

5. **Build (production)**  
   Generate a production build using `.env.pro`.

    ```bash
    npm run build:pro
    ```

6. **Deploy build**  
   upload the production build.

    ```bash
    npm run deploy:build:pro
    ```

Here are all the scripts:

```json
{
	"build:pro": "npm run translate && dotenv -e .env.pro -- vite build",
	"upload:translations": "node bin/sftp.js -a put -l ./backend/translations.php -r /var/www/wp-content/plugins/my-plugin/backend",
	"download:translations": "node bin/sftp.js -a get -l ./backend -r /var/www/wp-content/plugins/my-plugin/backend/translations.php",
	"translate": "node bin/translate.js",
	"deploy:build:pro": "node bin/branch.js && npm run build:pro && node bin/sftp.js -a put -l build -r /pro/html",
	"deploy:translations": "npm run download:translations && npm run translate && npm run upload:translations",

	"deploy:pro": "node bin/branch.js &&  npm run deploy:translations && npm run deploy:build:pro"
}
```

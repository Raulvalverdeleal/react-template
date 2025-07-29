# React + Vite + Tailwind + TypeScript Starter Template

Plantilla para proyectos React con Vite, Tailwind y TypeScript, lista para producción y desarrollo rápido, con configuración avanzada y buenas prácticas.

---

## 🚀 Características principales

- **Stack:** Vite + React + TypeScript + Tailwind CSS.
- **Linting:** ESLint configurado con reglas estándar, trailing commas y más.
- **Formateo:** Prettier con autoformat on save adaptado para React y TS.
- **UI Components:** Librería `sahdcn` integrada + componentes propios reutilizables.
- **Estructura modular:** Carpetas bien organizadas con alias para imports centralizados:

  ```ts
  import { Button, Menu } from "@components";
  ```
- **Optimización de bundles:** Configuración para mantener el tamaño de chunks controlado.
- **Vite Config:** Personalizada para emular CRA:
  - Servidor en puerto 3000.
  - Auto focus al terminal al iniciar.
- **Análisis bundle:** Librería para visualizar qué ocupa espacio en la build.
- **Scripts de despliegue:** Despliegue fácil a producción y preproducción vía SFTP con scripts personalizados en `/bin/sftp.js`.
- **Internacionalización:** Sistema de traducciones basado en JSON con función `__("translation")`.
  - `npm run translate` actualiza las cadenas automáticamente.
  - Exportación posible a PHP para integraciones tipo WordPress ver `bin/translate.js` y `bin/sftp.js`.
- **Wrapper API:** Clase base `SuperFetch` para manejar peticiones y errores.
- **Contexto global:** Provider montado para estado y contexto compartido.
- **Hooks personalizados:** `useLoading`, `useDialog` para UX fluida.
- **Routing:** Transiciones suaves con `react-router-dom`.

---

## 📁 Estructura de carpetas destacada

```
.
├── bin/                # Scripts CLI: branch, sftp, translate
├── components.json     # Config componentes UI
├── eslint.config.js    # Configuración ESLint
├── public/             # Assets públicos (favicon, manifest, robots)
├── src/
│   ├── app.tsx         # Entrada principal app
│   ├── assets/         # Imágenes, datos, iconos, traducciones JSON
│   ├── components/     # Componentes UI y layout (alias @components)
│   ├── contexts/       # Contextos React
│   ├── core/           # Lógica de negocio y utilidades core
│   ├── hooks/          # Hooks custom
│   ├── main.tsx        # Punto de entrada React
│   ├── services/       # Wrapper API y servicios
│   ├── styles/         # CSS global, Tailwind config y variantes
│   ├── types/          # Definiciones TS
│   └── utils/          # Helpers, clases, utils varios
├── tsconfig.json       # Config TypeScript
└── vite.config.ts      # Configuración avanzada Vite
```

---

## ⚙️ Instalación y uso

1. Clonar repo:

```bash
git clone https://github.com/tu-usuario/react-template.git
cd react-template
```

2. Instalar dependencias:

```bash
npm install
# o yarn
```

3. Levantar servidor dev:

```bash
npm run dev
# Abre http://localhost:3000
```

4. Ejecutar traducciones (si usás i18n):

```bash
npm run translate
```
> [!IMPORTANT]
> `translations.json` es el valor por defecto de las traducciones, para añadirlas, `translator.mergeTranslations(...)`

5. Desplegar:
   configurar `/bin/sftp.js` o añadir los parámetros necesarios desde el package.json

```bash
npm run deploy:pro
npm run deploy:pre
```

---

## 🛠 Scripts disponibles

| Script                 | Descripción                                    |
|------------------------|------------------------------------------------|
| `npm run start`          | Levanta servidor dev en localhost:3000         |
| `npm run translate`    | Actualiza JSON con cadenas para traducción      |
| `npm run format`    | Ejecuta npx prettier . --write      |
| `npm run deploy:pro` | Despliega build vía SFTP a producción        |
| `npm run deploy:pre` | Despliega a preproducción vía SFTP          |

---

## 🤝 Contribuciones

Este proyecto es open source y acepta PRs y issues. ¡Siéntete libre de mejorar!

---

## 📄 Licencia

MIT © Raúl Valverde

---

## Contacto

Si quieres contactarme o reportar bugs, abre una issue o escribeme por GitHub.

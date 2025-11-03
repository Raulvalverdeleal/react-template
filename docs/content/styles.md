# Styles

This project uses **TailwindCSS** for utility-first styling and includes custom base styles and layout rules. You can still use vanilla css in `app.css`.

## Theme

- **TailwindCSS utilities**
- **Maximum content width**  
  Applied to header, footer, and main container.

    ```css
    --max-width: 990px;
    ```

- **Layout**
    - Fixed header & footer with main in between
    - Classes `.has-header` and `.has-footer` are added via React effects in Header and Footer components when mounted / unmounted.

## Variants

Because of `react-refresh/only-export-components`, variants **must be separated from their components**.
If you install any Shadcn components that include variants, **remove them from the component file** and add them in `@/styles/variants.ts`

# Styles

This project uses **TailwindCSS** for utility-first styling and includes custom base styles and layout rules. You can still use vanilla css in `app.css`.

## Theme

- **TailwindCSS utilities**  
  used everywhere for spacing, typography, colors, etc.
- **Maximum content width**  
  Applied to header, footer, and main container.

    ```css
    --max-width: 990px;
    ```

- **Layout**
    - `#root` is a grid container with dynamic rows depending on header/footer presence.
    - Classes `.has-header` and `.has-footer` are added via React effects in Header and Footer components when mounted / unmounted.
    - The layout adapts automatically:
        - Only header → `auto` `1fr`
        - Only footer → `1fr` `auto`
        - Both → `auto` `1fr` `auto`

## Variants

Because of `react-refresh/only-export-components`, variants **must be separated from their components**.
If you install any Shadcn components that include variants, **remove them from the component file** and add them in `@/styles/variants.ts`

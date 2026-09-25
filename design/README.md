# design/

Aquí va el `DESIGN.md` elegido en Refero Styles (o extraído de una web de
referencia), junto con capturas o el logo si los hay.

**Estado: pendiente.** Mientras no llegue, `web/src/styles/tokens.css` usa
una paleta neutra provisional.

## Cómo se aplica

Del DESIGN.md se toman estos grupos, y cada uno cae en una variable concreta
de `tokens.css`:

| DESIGN.md                         | Variables                                   |
|-----------------------------------|---------------------------------------------|
| Colores: fondo, superficie        | `--color-bg`, `--color-surface`             |
| Colores: texto principal/atenuado | `--color-text`, `--color-text-muted`        |
| Color de acento y sus estados     | `--color-accent`, `--color-accent-hover`, `--color-accent-contrast` |
| Bordes                            | `--color-border`                            |
| Tipografía: familias              | `--font-sans`, `--font-display`, `--font-mono` |
| Escala de tamaños                 | `--text-xs` … `--text-5xl`                  |
| Pesos e interlineado              | `--weight-*`, `--leading-*`                 |
| Espaciado base                    | `--space-1` … `--space-24`                  |
| Ancho máximo y márgenes           | `--content-max`, `--section-y`              |
| Radios, sombras, líneas           | `--radius-*`, `--shadow-*`, `--border-width`|

Si el DESIGN.md define modo oscuro, sus valores van en el bloque
`[data-theme="dark"]` y en el `@media (prefers-color-scheme: dark)`.

Las familias tipográficas se instalan con `@fontsource` y se importan en
`web/src/main.tsx`.

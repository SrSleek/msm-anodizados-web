# CLAUDE.md — MSM Anodizados (sitio web)

## Proyecto
Sitio web corporativo estático (HTML/CSS/JS, sin framework) para **MSM Anodizados**,
empresa de anodizado natural, anodizado a color y recubrimiento electrostático,
ubicada en Puebla, México. Cliente: industria metalmecánica, automotriz, médica
(piezas quirúrgicas) e industrial.

## Stack
- HTML/CSS/JS estático — sin build step
- Fuentes: Google Fonts (Archivo, Inter, IBM Plex Mono) — ya enlazadas en `<head>`
- Sin dependencias de npm, sin Docker — deploy directo a Cloudflare Pages
- Idioma: español (es-MX)

## Estructura
```
index.html
css/styles.css
js/main.js
assets/images/logo-light.png   (logo con fondo transparente, texto oscuro — usar en fondos claros)
assets/images/logo-dark.png    (logo con texto blanco — usar en navbar/footer sobre fondo oscuro)
_headers                       (headers de seguridad para Cloudflare Pages)
.gitignore
```

## Identidad de marca
- Grafito #232323 / Ink #181818 — color dominante (seriedad industrial)
- Rojo #c8102e — acento principal (CTAs, detalles)
- Azul #1e5fa8, Verde #2f8f3c, Plata #aeb0b4, Cobre #c2611f — acentos secundarios,
  solo en galería de colores e iconografía
- Tipografía: Archivo (display/títulos, condensada, mayúsculas) + Inter (cuerpo) +
  IBM Plex Mono (labels técnicos, eyebrows)
- Tagline: "Protección y color en cada pieza"

## Pendientes técnicos antes de producción (CRÍTICO)

1. **Número de WhatsApp real**
   En `js/main.js`, línea ~5: `const WA_NUMBER = '52XXXXXXXXXX';`
   Reemplazar por el número real en formato `52` + 10 dígitos, SIN espacios,
   guiones ni `+`. Verificar antes probando `https://wa.me/52XXXXXXXXXX` en el navegador.

2. **Webhook de formulario de contacto**
   En `js/main.js`, buscar `WEBHOOK_URL` (placeholder actual:
   `https://n8n.agenciabrauu.com/webhook/msm-contacto`).
   Hay que crear el workflow en n8n: Webhook (POST, Allowed Origins = *) → Telegram/WhatsApp
   → Respond to Webhook. Body llega como string — usar `JSON.parse($json.body)`.
   Reemplazar la URL con la Production URL real del webhook.

3. **Correo de contacto**
   `hola@msmanodizados.com` es placeholder — depende del dominio final que se compre.
   Buscar y reemplazar en `index.html` (sección contacto) una vez definido el dominio.

4. **Dominio**
   Aún no se ha comprado. El sitio se puede deployar primero a `*.pages.dev` y
   conectar el dominio después (Cloudflare Pages → Settings → Domains & Routes).

## Reglas de desarrollo
- No usar frameworks ni añadir build step — mantener el sitio 100% estático.
- Las imágenes del logo ya están procesadas (fondo transparente). No regenerar.
- Mobile-first: revisar siempre breakpoints en 880px, 760px, 560px (ya definidos en CSS).
- Mantener `prefers-reduced-motion` respetado (ya implementado en `styles.css`).
- Si se agrega blog, seguir el patrón del Manual de Sitios Web Brauu v1 (sección 13):
  `blog/index.html` + `blog/posts.json` + artículos en `blog/[slug]/index.html`.

## Deploy (seguir Manual de Sitios Web Brauu v1)
1. `git init && git add . && git commit -m "Initial commit"`
2. `git branch -M main`
3. Crear repo público en GitHub: `msm-anodizados-web`
4. `git remote add origin https://github.com/[usuario]/msm-anodizados-web.git`
5. `git push -u origin main`
6. Cloudflare Pages → Create → Connect to Git → seleccionar el repo
   - Build command: vacío
   - Build output directory: `/`
7. Una vez comprado el dominio: Cloudflare Pages → Settings → Domains & Routes → Add

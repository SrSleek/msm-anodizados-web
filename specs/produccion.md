# Spec: Puesta en producción — MSM Anodizados

## Objetivo
Dejar el sitio estático de MSM Anodizados listo para producción: resolver los
cuatro pendientes críticos del CLAUDE.md, verificar que todo funcione, y publicarlo
en GitHub + Cloudflare Pages con dominio propio.

---

## Requisitos obligatorios

### 1. Número de WhatsApp real
- Archivo: `js/main.js`, constante `WA_NUMBER`
- Valor final: `522222397708`
- Todos los botones y enlaces de WhatsApp del sitio deben generar URLs del tipo
  `https://wa.me/522222397708?text=...`

### 2. Formulario de contacto → WhatsApp directo
- El formulario de la sección Contacto **no** usará webhook de n8n.
- Al enviar el formulario, el comportamiento debe ser:
  1. Tomar los campos (nombre, empresa, servicio, mensaje).
  2. Armar un mensaje preformateado en texto plano.
  3. Abrir `https://wa.me/522222397708?text=<mensaje codificado>` en nueva pestaña.
- Eliminar o inutilizar cualquier referencia a `WEBHOOK_URL` / fetch POST en `main.js`.
- El botón de submit debe decir algo como "Enviar por WhatsApp".

### 3. Correo de contacto
- Reemplazar todas las apariciones del placeholder `hola@msmanodizados.com` en
  `index.html` por `ventas@msmanodizados.com`.

### 4. Dominio
- Dominio confirmado: `msmanodizados.com` (ya adquirido).
- El sitio se deploya primero a Cloudflare Pages; el dominio se conecta en
  Cloudflare Pages → Settings → Domains & Routes → Add Custom Domain.

---

## Deploy

### GitHub
- Repo: `https://github.com/SrSleek/msm-anodizados-web` (público)
- Rama principal: `main`
- Raíz del repo: el contenido de `msm-site/` (index.html en la raíz del repo)
- Flujo:
  ```
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/SrSleek/msm-anodizados-web.git
  git push -u origin main
  ```

### Cloudflare Pages
- Conectar el repo `SrSleek/msm-anodizados-web`
- Build command: vacío
- Build output directory: `/`
- Variable de entorno: ninguna
- Después del primer deploy exitoso: conectar `msmanodizados.com` como dominio custom

---

## Casos borde a manejar

- Si el usuario abre el formulario en un dispositivo sin WhatsApp Web disponible,
  `wa.me` igual funciona (redirige a WhatsApp Web o a la app móvil).
- El mensaje armado con los campos del formulario debe estar codificado con
  `encodeURIComponent` para no romper la URL con caracteres especiales (tildes,
  comas, saltos de línea).
- Si algún campo del formulario está vacío, no bloquear el envío pero sí omitirlo
  del mensaje o indicarlo como "No especificado".

---

## Definición de hecho

Se considera completado cuando:

- [ ] `WA_NUMBER` en `main.js` es `522222397708` y los botones de WhatsApp del
      sitio abren `wa.me/522222397708` correctamente al hacer clic.
- [ ] El formulario de contacto, al enviarse, abre WhatsApp con un mensaje
      preformateado que incluye los datos ingresados. No hay llamada fetch/POST
      a ningún webhook.
- [ ] `ventas@msmanodizados.com` aparece en la sección de contacto del HTML;
      no existe ninguna aparición de `hola@msmanodizados.com`.
- [ ] El repo `https://github.com/SrSleek/msm-anodizados-web` existe y tiene
      el código del sitio en la rama `main`.
- [ ] Cloudflare Pages sirve el sitio en una URL `*.pages.dev` sin errores (200 OK,
      sin assets rotos).
- [ ] El dominio `msmanodizados.com` está conectado a Cloudflare Pages y carga
      el sitio vía HTTPS.

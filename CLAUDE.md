# CLAUDE.md — FitCoach IA

PWA de entrenamiento personal para iPhone, en español. Un único usuario, sin servidor, sin API de pago.

## Stack
- **Sin build, sin dependencias, sin `package.json`.** HTML + CSS + JS vanilla en un solo archivo.
- `index.html` (~7.600 líneas, ~550 KB): toda la app. Un único `<script>` inline (empieza en ~l.777).
- `sw.js`: service worker. Documento en *network-first* (offline cae a caché); resto *cache-first*.
- `manifest.json`, `icon-192.png`, `icon-512.png`: PWA instalable.
- `README.md` (~2.700 líneas): instrucciones de despliegue + **changelog por versión** (v6…v93).
  Es la memoria del proyecto: antes de tocar una función, busca su versión en el README
  (`grep -n "^## v" README.md`) para entender por qué está así.
- Todo va **plano en la raíz**. No crear subcarpetas (el subidor web de GitHub falla con carpetas).

## Datos y persistencia (no romper)
- Estado en `localStorage['fitcoach']` (objeto `S`), cargado por `load()` y migrado por `initState()`.
- Espejo en IndexedDB (`fitcoach-db`, store `kv`), copia a archivo y copia opcional a Gist secreto
  de GitHub (`cloudPush`, token del usuario; `copiaSinSecretos()` lo excluye de las copias).
- Si los datos no se leen, se apartan a `fitcoach-danado-AAAA-MM-DD`: no sobrescribir nunca.
- **Migraciones solo aditivas**: `initState` añade campos (p. ej. `v92Desde`), no renombra ni borra.
  Es la única copia de los datos del usuario.
- Fechas en hora local (bug histórico v66: agenda desplazada de madrugada). Probar con `TZ=Europe/Madrid`.

## Puente con Claude
- **Prohibido llamar a `api.anthropic.com`**: el puente es copiar/pegar un prompt en claude.ai y
  pegar el JSON de vuelta. El JSON pegado se valida y sanea (`validateExercise`, `coachingChecks`);
  debe tolerar comillas tipográficas de iOS.
- Las citas científicas del prompt y de «Base científica» se verifican contra su fuente (DOI/PubMed)
  antes de añadirlas. No inventar referencias.

## Despliegue
- GitHub Pages, rama `main`, carpeta `/ (root)` (según README; no hay workflow de Actions).
- Al publicar un cambio en `index.html`, **subir el número de caché en `sw.js`**
  (`const CACHE = 'fitcoach-vNN'`) y documentar la versión `## vNN` en el README.
  El marcador `vNN` también aparece en comentarios y textos de `index.html`.
- El usuario verifica al final en su iPhone (Safari / app instalada); dejar en el README una sección
  «Pendiente en el iPhone» con lo que no se puede comprobar aquí.

## Cómo probar
**Los tests no están en el repositorio.** El README cita `test-core.js`, `test-v80.js`…`test-v93.js`
y `test-flujo-domingo.js` (727 comprobaciones en v93), pero esos ficheros vivían fuera del repo y se
han perdido al menos una vez (v64). Hasta que se versionen, lo verificable aquí es:

```bash
# 1. Sintaxis del script inline
python3 -c "import re;s=open('index.html').read();open('/tmp/app.js','w').write(re.search(r'<script>(.*)</script>',s,re.S).group(1))" && node --check /tmp/app.js
```
```bash
# 2. Ninguna llamada a la API de Anthropic (debe dar 0)
grep -c "api.anthropic.com" index.html
```
```bash
# 3. Servir en local y abrir con Playwright (preinstalado)
python3 -m http.server 8000
```
- Comprobación visual con Playwright/Chromium: viewports 375×812 y 390×844, escala de letra
  100/130/145 %, las seis pestañas y el reproductor de sesión, sin errores de consola ni
  desbordamiento horizontal. Zona horaria `Europe/Madrid`.
- Los tests históricos usaban una «copia real» (backup JSON del usuario). Son datos personales:
  **no commitearlos nunca**; usar datos sintéticos.

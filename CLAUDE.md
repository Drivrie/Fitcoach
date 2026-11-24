# CLAUDE.md — FitCoach IA

PWA de entrenamiento personal para iPhone, en español. Un único usuario, sin servidor, sin API de pago.

**Lee primero `CONTEXTO-DESARROLLO.md`**: tiene las 46 reglas innegociables, el modelo de datos de `S`
y el método de trabajo. Este archivo es el resumen operativo; si contradice a aquel o al código,
gana el código y se corrigen los dos documentos.

## Stack
- **Sin build ni dependencias en tiempo de ejecución.** HTML + CSS + JS vanilla en un solo archivo.
  `package.json` existe solo para instalar `jsdom` y `fake-indexeddb` para el arnés de pruebas.
- `index.html` (~7.600 líneas, ~550 KB): toda la app. Un único `<script>` inline (empieza en ~l.777).
- `sw.js`: service worker. Documento en *network-first* (offline cae a caché); resto *cache-first*.
- `manifest.json`, `icon-192.png`, `icon-512.png`: PWA instalable.
- `README.md`: qué es la app, instalación, uso, datos y desarrollo. Corto; no lleva historial.
- `CHANGELOG.md` (~2.650 líneas): **historial por versión** (v6…v94), de la más reciente a la más
  antigua. Es la memoria del proyecto: antes de tocar una función, busca su versión
  (`grep -n "^## v" CHANGELOG.md`) para entender por qué está así.
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

## Flujo de trabajo (desde la v94)
Las versiones y revisiones se hacen aquí, en Claude Code; ya no en un chat de proyecto de claude.ai.
1. Acordar el alcance con el usuario antes de implementar (paso 1 de «Cómo se trabaja» en
   `CONTEXTO-DESARROLLO.md`).
2. Trabajar en una rama, nunca directamente en `main`.
3. Una versión = un cambio coherente: `index.html` + `CACHE` en `sw.js` + sección `## vNN` al principio de
   `CHANGELOG.md` + `test-vNN.js` (que sustituye al anterior) + script `test` de `package.json` y, si
   cambian reglas o datos, `CONTEXTO-DESARROLLO.md`.
4. `npm test` en verde en las cinco zonas, contraste contra la versión anterior y Playwright.
5. Pull request contra `main` solo cuando el usuario lo pida. **Fusionar en `main` publica la app**;
   la fusión la decide el usuario.

## Despliegue
- GitHub Pages, rama `main`, carpeta `/ (root)` (no hay workflow de Actions).
- Al publicar un cambio en `index.html`, **subir el número de caché en `sw.js`**
  (`const CACHE = 'fitcoach-vNN'`) y documentar la versión `## vNN` en `CHANGELOG.md`.
  El README solo se toca si cambia lo que describe (funciones, instalación, datos).
  El marcador `vNN` también aparece en comentarios y textos de `index.html`.
- El usuario verifica al final en su iPhone (Safari / app instalada); dejar en la entrada del CHANGELOG una sección
  «Pendiente en el iPhone» con lo que no se puede comprobar aquí.

## Cómo probar
Arnés: `test-vNN.js` (hoy `test-v94.js`), DOM real con jsdom y `fake-indexeddb` para el espejo. Cubre arranque limpio y con usuario
veterano, persistencia campo a campo y regresión de todas las versiones anteriores.

```bash
npm install
```
```bash
npm test
```
`npm test` lo ejecuta en las cinco zonas horarias (Europe/Madrid, UTC, America/Santiago,
Australia/Sydney, Pacific/Kiritimati). Resultado esperado en v94 sin copia real: **715 OK, 0 fallos**
en cada una (con la copia real se añaden sus 26 comprobaciones).

- Una sola zona: `TZ=Europe/Madrid node test-v94.js`.
- Con la copia real del usuario: `FITCOACH_BACKUP=/ruta/copia.json node test-v94.js`. La copia son
  datos personales: **nunca al repositorio** (está en `.gitignore`).
- Contraste: ejecutar el arnés nuevo contra la versión anterior (`node test-vNN.js ruta/index-anterior.html`);
  debe fallar exactamente donde se ha corregido algo.
- Al crear una versión nueva: copiar a `test-vNN+1.js`, añadir las secciones nuevas **antes** del
  resumen final (regla 14), actualizar el script `test` de `package.json` y borrar el arnés anterior
  (cada arnés incluye todas las regresiones previas).

Comprobaciones previas a entregar:
```bash
python3 -c "import re;s=open('index.html').read();open('/tmp/app.js','w').write(re.search(r'<script>(.*)</script>',s,re.S).group(1))" && node --check /tmp/app.js
```
```bash
grep -c "api.anthropic.com" index.html
```
(el segundo debe dar 0).

Regresión visual con Playwright/Chromium (preinstalado en el entorno cloud), sirviendo con
`python3 -m http.server 8000`: viewports 375×812 y 390×844, letra al 100/130/145 %, las seis pestañas,
la revisión previa y el reproductor, sin errores de JS ni desbordamiento horizontal. Lo que no se
puede comprobar así (teclado iOS, emoji, safe areas) va al CHANGELOG como «Pendiente en el iPhone».

## Qué va al repositorio
- Sí: `index.html`, `sw.js`, `manifest.json`, iconos, `README.md`, `CHANGELOG.md`, `CONTEXTO-DESARROLLO.md`,
  `CLAUDE.md`, el arnés vigente y `package.json`.
- No: copias de datos del usuario, `node_modules/`, zips de entrega, ni los `README-vNN.md` sueltos
  (se pegan en `CHANGELOG.md` y se descartan).
- El repo es público y GitHub Pages sirve todo lo que hay en la raíz: nada con datos personales ni
  secretos.

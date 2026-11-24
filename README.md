# FitCoach IA

Entrenador personal en forma de app web instalable (PWA) para iPhone, en español. Planifica la semana,
guía cada sesión serie a serie, registra lo que haces y ajusta la progresión con tus datos reales.
Funciona sin conexión, no tiene servidor y no usa ninguna API de pago: la parte de «IA» es un puente
de copiar y pegar con Claude.

> Información orientativa. No sustituye el consejo médico ni la supervisión de la técnica por un
> profesional cuando se trabaja con cargas altas.

## Qué hace
- **Planificar la semana** (Progreso → Planificar la semana): eliges la semana, marcas los días que
  serán distintos (menos tiempo, otro material, sin sesión), añades instrucciones y generas el plan con
  Claude o con el motor sin conexión. La semana tipo (días, minutos, material) se define en Perfil.
- **Sesión guiada**: reproductor con figura animada de cada ejercicio, técnica, errores comunes,
  descansos y cronómetros, incluidos bloques AMRAP, EMOM y circuitos.
- **Registro serie a serie**: carga (kg o banda), repeticiones y repeticiones en reserva (RIR), técnica
  y molestias. Se compara lo prescrito con lo realizado.
- **Progresión de carga** con una única regla: sube solo si el salto cabe en el rango y el margen está
  confirmado; si no, amplía el rango o sube de forma escalonada.
- **Revisión previa** («¿Cómo llegas hoy?»): ajustes acotados de la sesión según cansancio o molestias.
- **Progreso**: volumen semanal por grupo muscular, fuerza estimada (1RM), cumplimiento, marcadores de
  salud y peso.
- **Nutrición**: calorías como rango y proteína diaria según objetivo.
- **Apple Salud**: importa peso, altura, edad, marcadores (FC en reposo, HRV, VO₂máx, sueño…) y
  entrenamientos.

## Instalar en el iPhone
1. Abre la URL de la app **en Safari** (en iOS solo Safari instala PWAs):
   `https://<usuario>.github.io/<repositorio>/`
2. Pulsa **Compartir** → **Añadir a pantalla de inicio**.
3. Ábrela desde el icono: pantalla completa y funcionamiento sin conexión tras la primera carga.

Spotify y los enlaces a vídeos necesitan conexión.

## Uso

### Puente con Claude (sin API)
1. En **Progreso → Planificar la semana**, pulsa «Generar con Claude» y copia el mensaje.
2. Pégalo en [claude.ai](https://claude.ai) y envíalo.
3. Copia la respuesta (JSON) y pégala en la app. Revisa la vista previa y aplica.

La app valida y sanea lo que llega antes de aplicarlo y avisa de lo que no cumple sus reglas
(volumen, tiempo, material, saltos de carga). Sin el puente, el motor sin conexión genera la semana
igualmente.

### Importar datos de Apple Salud
**Ajustes → Importar datos de Salud.** Acepta:
- el `export.xml` nativo (Salud → foto de perfil → *Exportar todos los datos de salud*), que puede ser
  muy grande; o
- un JSON de los últimos 30 días (Health Auto Export, Health Export Kit o el formato simple que se
  describe en la propia pantalla).

Salud no guarda series, repeticiones ni kilos de fuerza: solo el resumen de cada entrenamiento.

### Registrar lo que hacías antes
- **Punto de partida** (Progreso): texto libre con tu entrenamiento previo; se envía al planificar.
- **Registro retroactivo**: en el calendario, ve a una semana pasada, toca el día y registra la sesión.

## Tus datos
- Viven **solo en el dispositivo**: `localStorage` del navegador más una copia interna en IndexedDB.
- **«Borrar historial y datos de sitios web» de Safari borra ambas.** La única copia que sobrevive a eso
  o a cambiar de móvil es la que exportes: **Ajustes → Mis datos → Exportar copia** (Archivos o iCloud
  Drive). La app avisa si han pasado más de 14 días desde la última.
- Opcional: copia automática en un **gist secreto** de GitHub con tu propio token (desactivada por
  defecto). El token no sale del dispositivo ni va en las copias exportadas.
- Ajustes → Mis datos muestra cuánto ocupan tus datos frente al límite estimado de Safari.
- La única conexión de red de la app es esa copia opcional a `api.github.com`. Nunca llama a la API de
  Anthropic.

## Base científica
Los parámetros siguen la evidencia actual, con el ACSM 2026 Position Stand como referencia principal
(volumen semanal por grupo, proximidad al fallo, frecuencia, proteína y progresión). La lista completa,
con DOI y fecha de comprobación, está en la app: **Ajustes → Base científica del plan**. Los umbrales
que no salen de un estudio se presentan como convenciones de práctica.

## Desarrollo

### Estructura
Todo va en la raíz, sin subcarpetas ni proceso de compilación:

| Archivo | Qué es |
|---|---|
| `index.html` | La app completa (HTML, CSS y JavaScript en un solo archivo) |
| `sw.js` | Service worker: caché para el modo sin conexión |
| `manifest.json`, `icon-192.png`, `icon-512.png` | Manifiesto e iconos de la PWA |
| `CHANGELOG.md` | Historial de cambios versión a versión |
| `CONTEXTO-DESARROLLO.md` | Reglas innegociables, modelo de datos y método de trabajo |
| `CLAUDE.md` | Guía operativa para desarrollar con Claude Code |
| `test-vNN.js`, `package.json` | Arnés de pruebas (solo desarrollo) |

### Pruebas
Requiere Node.js. Las dependencias (`jsdom`, `fake-indexeddb`) son solo para las pruebas.

```bash
npm install
```
```bash
npm test
```

Ejecuta el arnés en cinco zonas horarias. El detalle (copia real, contraste entre versiones, revisión
visual con Playwright) está en `CLAUDE.md`.

### Publicar una versión
1. Cambia `index.html` y sube el número de caché en `sw.js` (`fitcoach-vNN`) para que los iPhone ya
   instalados reciban la versión nueva.
2. Documenta la versión en `CHANGELOG.md`.
3. Fusiona en `main`: GitHub Pages publica la rama `main`, carpeta raíz.

Para publicar desde cero: en el repositorio, **Settings → Pages → Deploy from a branch → `main` /
(root)**. GitHub Pages da HTTPS, que la PWA necesita.

## Changelog
Ver [`CHANGELOG.md`](CHANGELOG.md). Versión actual: **v94**.

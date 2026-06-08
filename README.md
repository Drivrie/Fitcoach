# FitCoach IA — Despliegue en GitHub Pages

App PWA instalable en iPhone. Funciona offline. Sin coste de API.

## Qué hay en esta carpeta (TODO va plano en la raíz, sin subcarpetas)
- `index.html` — la app completa
- `manifest.json` — define la app instalable
- `sw.js` — service worker (offline)
- `icon-192.png` y `icon-512.png` — iconos de la app (en la raíz, NO en carpeta)
- `README.md`

---

## Despliegue paso a paso (desde cero)

### 1. Crear cuenta de GitHub (si no la tienes)
1. Entra en https://github.com y pulsa **Sign up**.
2. Sigue los pasos (correo, contraseña, usuario). Confirma el correo.

### 2. Crear el repositorio
1. Arriba a la derecha pulsa **+** -> **New repository**.
2. **Repository name:** `fitcoach` (o el nombre que quieras).
3. Marca **Public** (Pages gratuito requiere repo público).
4. NO marques "Add a README" (ya tienes uno).
5. Pulsa **Create repository**.

### 3. Subir los archivos
1. En el repo, pulsa **Add file** -> **Upload files**.
2. Selecciona los SEIS archivos a la vez (index.html, manifest.json, sw.js,
   README.md, icon-192.png, icon-512.png) y arrástralos. NO hay carpetas: todo va
   directo a la raíz. (Por eso ya no existe carpeta `icons`: evita el fallo del
   subidor web de GitHub al arrastrar carpetas.)
3. Pulsa el botón verde **Commit changes**.

### 4. Activar GitHub Pages
1. Pestaña **Settings** (arriba del repo).
2. Menú lateral -> **Pages**.
3. En **Source** elige **Deploy from a branch**.
4. En **Branch** selecciona `main` y carpeta `/ (root)`. Pulsa **Save**.
5. Espera 1-2 minutos. Recarga: aparece tu URL:
   `https://TU_USUARIO.github.io/fitcoach/`

### 5. Probar
- Abre esa URL en el ordenador para comprobar que carga.
- HTTPS es obligatorio para la PWA: GitHub Pages ya lo da por defecto.

---

## Instalar en iPhone
1. Abre la URL **en Safari** (en iOS solo Safari instala PWAs).
2. Pulsa **Compartir** (cuadrado con flecha hacia arriba).
3. Pulsa **Añadir a pantalla de inicio** y confirma.
4. Ábrela desde el icono: pantalla completa, sin barra del navegador.

Tras la primera carga funciona sin conexión (datos guardados en el dispositivo).
La música de Spotify y el enlace a vídeos necesitan internet.

---

## Importar datos de Apple Health
1. iPhone -> app **Salud** -> toca tu **foto de perfil** (arriba derecha).
2. Abajo del todo: **Exportar todos los datos de salud**.
3. Se genera un `.zip`. Descomprímelo y busca `exportar.xml` (o `export.xml`).
4. En FitCoach -> **Perfil** -> **Importar export.xml** -> selecciona ese archivo.
   Rellena peso, altura y edad automáticamente.

---

## Puente con Claude (gratis, sin API)
1. En **Progreso**: "Adaptar próxima semana con Claude" (o en Perfil "Generar con Claude").
2. Pulsa **Copiar mensaje para Claude**.
3. Abre **claude.ai** (tu plan Pro), pega y envía.
4. Copia la respuesta JSON de Claude.
5. Vuelve a FitCoach, pégala en el recuadro y pulsa **Aplicar plan**.

El motor offline funciona sin esto; el puente solo da planes más detallados
y la adaptación según tu historial.

---

## Ilustraciones animadas de ejercicios
Cada ejercicio se muestra con una figura animada de dos fases (inicio -> final) en
bucle, con el material dibujado (peso corporal, mancuernas, barra, kettlebell o
banda). Aunque no conozcas el nombre del ejercicio, la animación y las indicaciones
te enseñan el movimiento. Funciona sin conexión y respeta el ajuste de "reducir
movimiento" del sistema.

---

## Actualizar la app
Si editas `index.html`, súbelo de nuevo y **sube también `sw.js` cambiando el
número de versión** (`fitcoach-v3` -> `fitcoach-v4`) para refrescar la caché en los
dispositivos ya instalados.

---

## Base científica
Los parámetros del entrenamiento siguen evidencia actual:
- Fuerza: cargas >=80% 1RM, 2-3 series/ejercicio, descansos 2-3 min.
- Hipertrofia: ~10+ series por grupo muscular/semana, cerca del fallo (1-3 RIR), no al fallo absoluto.
- Cada grupo muscular >=2 veces/semana. Peso corporal y bandas son eficaces.
- Proteína 1,6-2,2 g/kg/día (extremo alto en déficit calórico).
- Progresión: doble progresión + descarga cada 4 semanas.

Cada ejercicio incluye una lista de errores comunes de técnica a evitar.

Fuentes: ACSM 2026 Position Stand (Medicine & Science in Sports & Exercise);
meta-análisis de Schoenfeld y Grgic (volumen y descansos); Morton et al. 2017 (proteína).
Información orientativa; no sustituye consejo médico ni la supervisión de técnica
con cargas altas por un profesional.

---

## Cómo registrar tu progreso PREVIO (antes de usar la app)
Tres vías, combinables:
1. **Importar de Apple Salud** (Perfil → Importar export.xml): además de peso/altura/edad,
   ahora importa tus entrenamientos de las últimas 8 semanas (tipo, fecha, duración,
   distancia). Nota: Salud NO guarda series/repeticiones/kilos de fuerza, solo el resumen
   de la sesión.
2. **Punto de partida** (Progreso → "Punto de partida"): describe en texto libre lo que
   ya hacías (p. ej. "circuito cuerpo completo con banda, 40 min, 40s/20s" o "press
   mancuerna 12kg 3×10, sentadilla goblet 16kg 3×12"). Se incluye al adaptar la semana
   con Claude para arrancar la progresión desde tu nivel real.
3. **Registro manual retroactivo**: con las flechas de semana ve a la semana pasada,
   toca un día y pulsa "Registrar" para anotar cada sesión con sus pesos y notas.

---

## Configuración flexible (v6)
- **Objetivo**: selección múltiple. Si combinas varios, el entrenamiento usa el esquema
  más estructural (fuerza > músculo > tonificar > resistencia > grasa) y la nutrición
  se ajusta al componente de composición: músculo+grasa = recomposición (déficit ligero,
  proteína alta); grasa = déficit; músculo/fuerza = superávit ligero.
- **Equipo**: selección múltiple, con mancuernas y bandas separadas. El peso corporal
  siempre está disponible; el equipo seleccionado añade ejercicios.
- **Minutos/sesión**: deslizador ajustable (15-120, paso de 5) más accesos rápidos
  (30/40/45/60/90), así puedes poner 40 o cualquier intermedio.
- **Días sin selección** = descanso; aun así puedes registrar o añadir un entrenamiento
  no previsto en cualquier día con "Registrar" / "Añadir".

---

## Marcadores de estado desde Apple Salud (v7)
La importación lee también, si están en tu export.xml: FC en reposo, variabilidad
cardíaca (HRV/SDNN), VO2max, % de grasa y la media de pasos y kcal activas de los
últimos 14 días. Se muestran en Perfil y se envían a Claude al generar/adaptar el plan,
para que valore tu recuperación y ajuste el volumen/intensidad (p. ej. HRV baja o pulso
en reposo elevado → semana más suave). Es contexto orientativo, no un diagnóstico médico.
El motor offline sigue usando peso/altura/edad/sexo para la nutrición; el ajuste por
estado lo realiza Claude a través del puente.

---

## Deduplicación de datos de Apple Salud (v9)
El export.xml contiene registros en bruto de varias fuentes (iPhone, Apple Watch, apps
externas) que solapan el mismo periodo. Para no inflar las cifras:
- Pasos y kcal activas: se calcula por día el total de cada fuente evitando intervalos
  solapados, y se toma el MÁXIMO entre fuentes (no la suma), como hace la propia app Salud.
  Así, si el iPhone y el Watch registran los mismos pasos, se cuentan una sola vez.
- Entrenamientos: la misma sesión registrada por dos fuentes (p. ej. Watch + app externa)
  se detecta por solapamiento temporal del mismo tipo y se conserva solo una (la más
  completa). Al reimportar, no se duplican los entrenamientos ya añadidos.

---

## Modificar sesiones y marcar no realizado (v11)
- En una sesión IA planificada, botón **⚙ Modificar**: ajusta el material y el tiempo
  disponibles solo para ese día y pulsa "Regenerar (offline)" o "Pedir a Claude" (copiar/
  pegar). No cambia tu perfil, solo esa sesión.
- Botón **⃠ No realizado**: marca una sesión planificada como no hecha (tachada, no cuenta
  en la progresión ni se envía a Claude). Luego puedes "Registrar" o "Añadir" lo que sí
  hiciste ese día (p. ej. saliste a correr en lugar de la fuerza prevista).
- **↩ Restaurar** deshace el "no realizado"; **↩ Deshacer** revierte una sesión marcada
  como hecha (y la quita del historial).

---

## Mejoras v15
1. Tamaño de texto ajustable (Normal/Grande/Muy grande/Máximo) en Perfil, para presbicia.
2. Señal acústica (pitidos) en los últimos 3 s de cada cuenta atrás de trabajo y descanso,
   además de la vibración, para no mirar la pantalla.
3. Durante el descanso que da paso a un ejercicio nuevo se muestra ya el siguiente
   ejercicio: figura, series/reps y descripción, para prepararlo sin esperar al final.
4. Spotify: en lugar de la previsualización de 30 s, ahora se abre la lista directamente
   en la app de Spotify (reproducción completa), con listas recientes y buscador. La música
   se controla desde Spotify / Centro de control de iOS.
5. Si la exportación de Apple Salud falla, se pueden introducir los marcadores a mano
   (FC reposo, HRV, VO2max, % grasa, pasos, kcal activas) en la tarjeta de Apple Health.
6. Alternativas más seguras por ejercicio (p. ej. press militar → press sentado con
   respaldo o elevaciones laterales) seleccionables en el resumen de la sesión. Si no se
   elige nada, se usa el ejercicio propuesto por defecto (marcado con ★).

---

## Importar datos de Salud en JSON (v16)
Además del export.xml nativo, ahora se acepta JSON (más ligero, ideal para 30 días):
- Formato de la app Health Auto Export (data.metrics + data.workouts).
- Formato simple propio: {markers:{restingHR,hrv,vo2max,bodyFat,weight,height,avgSteps,
  avgActiveKcal}, workouts:[{date,type,duration,distance}]}. Todos los campos opcionales.
Pasos y kcal se deduplican por fuente (máximo por día) y los entrenamientos por solapamiento,
igual que en el XML. Se eligió JSON frente a markdown por ser estructurado y parseable sin
ambigüedad.

## v17: soporte de Health Export Kit
Tercer formato JSON admitido: Health Export Kit (activity.daily, activity.workouts,
additional.heart.daily). Pasos/kcal se promedian sobre los días; FC reposo y VO2max toman
el valor más reciente; se importan los entrenamientos con dedup. Nota: ese exportador puede
no incluir HRV ni % de grasa.

## v18: marcadores manuales con tendencia mensual
Entrada manual de marcadores (medias mensuales) prellenada con los últimos valores; guarda
un histórico (S.healthLog) y muestra flechas de tendencia frente al mes anterior. Recordatorio
mensual (30 días) para actualizar. La tendencia mes a mes se incluye también en el prompt de
Claude. Guía integrada de dónde leer cada media en la app Salud (pestaña M → PROMEDIO).

## v19: marcador de sueño
Añadido el sueño (h/noche media) como octavo marcador, por su peso en la recuperación.
% grasa queda explícitamente opcional. El sueño entra en la tarjeta con tendencia, en el
prompt de Claude (con la regla: <7h → no subir volumen, priorizar descanso) y en los
formatos JSON (simple: markers.sleep; Health Export Kit: additional.sleep.daily).

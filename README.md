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

## v21: rediseño estilo Fitness + pantalla Hoy + rendimiento
- Paleta y estética inspiradas en la app Fitness de iPhone: fondo negro puro, tarjetas
  #1c1c1e con radios de 16-20px, acentos verde/azul/rosa de anillos de actividad y color
  ámbar dedicado a avisos.
- Nueva tarjeta "Hoy" como portada del calendario: anillo de progreso semanal (sesiones
  completadas/planificadas, animado) + la sesión de hoy con botón grande ▶ Empezar, o el
  estado del día (libre, completado, descanso).
- Rendimiento: memoización de las figuras SVG (se generan una vez y se reutilizan en
  resumen, reproductor y vistas previas).

## v22: gráficas, logros, wake lock y resumen post-sesión
- 📈 Evolución de marcadores: sparklines mes a mes (FC reposo, HRV, VO2max, sueño, pasos,
  % grasa) en Progreso, en verde si la tendencia mejora y ámbar si empeora.
- 🏆 Logros: racha de semanas (≥3 sesiones/semana), km acumulados y 9 trofeos
  desbloqueables (sesiones totales, rachas, km corridos).
- 🔆 Wake lock: la pantalla no se apaga durante la sesión guiada (se reactiva al volver
  a la app); se libera al cerrar el reproductor.
- 🎉 Resumen post-sesión: al completar, muestra duración real, series totales, racha y
  logros recién desbloqueados, con fanfarria sonora y vibración.

## v23: ritual de cierre de semana (domingos)
Los domingos, en la semana actual, la tarjeta "Hoy" muestra una guía con los pasos
pendientes del cierre: registrar/descartar lo pendiente, actualizar las medias mensuales
si ya pasó un mes, y adaptar la semana próxima con Claude (con botón directo). El banner
desaparece automáticamente cuando todo está hecho. Respeta los dos ritmos: adaptación
semanal con lo entrenado; marcadores solo cada mes.

## v24: registro estructurado ligero
- Campos opcionales kcal (Watch) y FC media (lpm) en el formulario de registro: dos números
  universales que viajan estructurados al prompt de adaptación.
- Tipos nuevos: "Carrera en cinta" y "Caminata / Paseo" (ya no hace falta indicarlo en notas).
- Botón "＋ Plantilla cargas" en notas: inserta los ejercicios de la sesión IA del día como
  esqueleto ("Sentadilla goblet: …") para apuntar kg × reps logradas sin teclear nombres.
- Las cargas por ejercicio se mantienen deliberadamente en notas (texto libre) para no crear
  un formulario por serie que añada fricción durante el entrenamiento.

## v25: precisión de registro y mejor programación
- Plantilla de cargas prellenada con series×reps (y peso si existe) propuestos: solo se
  corrige lo que difiera (✓ = según lo previsto).
- Duración del registro acepta min:seg ("45:30") además de minutos.
- Campo "peso" por ejercicio en los planes de Claude, con regla de claridad obligatoria
  ("16 kg por mancuerna (una en cada mano)" / "una sola mancuerna de 16 kg" / "solo peso
  corporal"); visible en resumen de sesión y reproductor.
- Ejercicios cronometrados por lado (plancha lateral, etc.): el contador repite el tiempo
  para el lado 2 con tono de cambio e indicador "lado 1/2 de 2".
- Reparto muscular: el motor offline incluye ahora 2 ejercicios de pierna por sesión
  completa, y el prompt exige ≥1/3 de ejercicios de tren inferior y ≥2 por sesión completa.
- El prompt permite proponer EMOM/AMRAP/HIIT/circuito como variación puntual (máx. 1
  sesión/semana) manteniendo la base de hipertrofia.
- "recomendacion_cardio" ahora exige prescripción concreta (actividad, duración, FC/zona)
  y se muestra en el Análisis del entrenador además de en los días libres.

## v26: corrección de "Añadir actividad" y aclaración de "Hoy"/semanas
- "Añadir actividad libre" ahora abre el formulario de registro COMPLETO (tipo, duración
  min:seg, distancia, kcal, FC, RPE, notas), con selector de día, y guarda la actividad
  como realizada EN EL HISTORIAL (antes creaba una sesión vacía que no contaba para la
  adaptación). Esto asegura que las sesiones añadidas sí se consideran al adaptar.
- Tarjeta "Hoy": el anillo aclara que es el % de la SEMANA y muestra "X de Y sesiones de
  la semana completadas" (Y = total planificado de la semana, no de hoy).
- Puente con Claude: muestra a qué semana (rango de fechas) se aplicará el plan y, si estás
  en la semana actual, ofrece un botón "› Ir a la semana próxima" para no volver a generar
  sobre la semana en curso. Soluciona que no se generaran las semanas siguientes.

## v27: seguimiento de mesociclo sin descarga forzada
- La app cuenta en qué SEMANA del programa estás desde tu primer registro (inferProgramStart
  = lunes de la fecha más antigua en historial/agenda; programWeekFor/mesoInfo).
- Nueva tarjeta "Mesociclo" en Perfil: enfoque del bloque (editable) y semanas por bloque;
  muestra "Semana N del programa · bloque B (semana W de L)".
- Eliminada la descarga (deload) forzada cada 4 semanas: el usuario entrena todas las
  semanas. La fatiga se gestiona con volumen/proximidad al fallo, no con descarga.
- El prompt de Claude incluye la fase del programa (semana, bloque, enfoque) con instrucción
  explícita de progresión ascendente dentro del bloque y de NO programar descargas.
- La semana del programa se muestra también en la tarjeta "Hoy".

## v28: Claude propone la fase del mesociclo (entrenador profesional)
- El enfoque del bloque ya NO lo elige el usuario: lo PROPONE Claude en cada adaptación,
  según el objetivo global y el progreso (campo "mesociclo" en el JSON: enfoque,
  semanas_bloque, justificacion). El prompt instruye actuar como entrenador profesional y
  decidir la fase (acumulación, intensificación, recomposición, etc.), avanzando de bloque
  cuando corresponde.
- La tarjeta Mesociclo de Perfil muestra el enfoque propuesto (solo lectura) y la semana del
  programa; las semanas por bloque quedan como ajuste avanzado opcional.
- El análisis del entrenador muestra "🗓️ Fase del mesociclo: … — justificación".

## v29: corrección del conteo semanal de la tarjeta "Hoy"
- El anillo solo miraba S.schedule y se saltaba los días libres "implícitos" (marcados como
  libres pero aún sin sesión materializada en la agenda), por lo que el denominador salía
  corto (p. ej. "5 de 8" en vez de los 9 reales).
- Nuevo conteo coherente con el calendario: por cada día suma las sesiones reales de la
  agenda (deduplicadas por firma para evitar duplicados accidentales) MÁS las previstas
  implícitas de los días marcados como IA/libres. Desglose visible "X de Y completadas ·
  a/b IA, c/d libres".

## v30: corrección de teclado en duración y distancia
- Duración: el campo usaba inputmode="numeric", que en iOS abre un teclado sin ":". Ahora es
  texto con teclado completo, admite "37" o "37:02" (y convierte coma/punto a ":").
- Distancia: era type="number", que en configuración española rechaza la coma. Ahora es texto
  con inputmode="decimal"; admite "7,34" o "7.34" y se normaliza a punto internamente.
- Validación clara con mensajes específicos si el formato no es válido.

## v31: compartir prompt como texto en iPhone
- Nuevo botón "Compartir con Claude" que usa la hoja de compartir nativa (navigator.share)
  para enviar el prompt como TEXTO, evitando que iOS lo adjunte como archivo .txt al pegarlo.
- Nota explicativa en el puente para iPhone.
- Las notas del historial viajan ÍNTEGRAS al prompt (sin recortes); el problema del adjunto .txt se resuelve solo con el botón Compartir.

## v32: ventana de historial ampliada a ~4 semanas (mesociclo)
- El prompt de adaptación incluye hasta 38 sesiones (antes 20) ≈ 4 semanas al ritmo
  del usuario, para que Claude valore la trayectoria del mesociclo (progreso/estancamiento/
  fatiga), no solo la última semana. Notas íntegras. Se instruye dar más peso a lo reciente
  para la carga inmediata y usar el conjunto para la trayectoria. Tamaño del prompt resultante
  ~13k caracteres (~3,3k tokens), holgadamente dentro de límites.

## v34: coherencia del prompt de adaptación
- El prompt indica las FECHAS REALES de la semana destino (no solo "semana N") y avisa a
  Claude de que debe planificar la semana posterior al historial (evita planificar una
  semana ya entrenada si el usuario no avanzó de semana).
- Enfoque de mesociclo vacío ahora se expresa como "aún sin definir (primera adaptación)".
- Aclaración de días de doble propósito: en martes/jueves (carrera + IA), la sesión IA debe
  ser fuerza breve complementaria (~15-20 min), no una sesión completa; las completas van en
  los días sin carrera.

## v35: días de fuerza completa vs. fuerza breve (M/J con carrera)
- Nuevo concepto S.briefDays: días IA de fuerza BREVE (15-20 min) para los días que también
  tienen carrera (p. ej. martes/jueves), frente a los días de fuerza COMPLETA (L/X/V).
- Chips de día en Perfil: tocar un día IA alterna completo → ·breve → quitar (color azul más
  oscuro para breve), con nota explicativa.
- El prompt distingue explícitamente días completos y breves, e instruye sesiones cortas
  enfocadas (tren superior/core) en los días con carrera para no solapar fatiga.
- El motor offline genera ~18 min y título "Fuerza breve · complemento de carrera" en esos días.

## v36: orden de días y línea final coherente
- Los días en el prompt (completos, breves, libres) se ordenan de lunes a domingo, no en el
  orden en que se marcaron.
- La línea final de instrucción de dia_codigo refleja completos y breves explícitamente.

## v37: pesos de mancuernas y bandas configurables (progresión sin techo falso)
- Al seleccionar "mancuernas" aparece un selector de rango (desde/hasta/salto, kg por
  mancuerna) con vista previa de los pesos; se guarda en S.dumbbells.
- Al seleccionar "bandas" aparecen las resistencias baja/media/alta como casillas
  (S.bands).
- El prompt incluye la lista COMPLETA de pesos disponibles y las bandas, con instrucción de
  no limitarse a 12/16 kg y de subir de escalón cuando los registros lo justifiquen. Resuelve
  que la progresión se topara con los pesos iniciales.

## v38: parser de JSON tolerante (comillas tipográficas iOS)
- applyBridge ahora normaliza antes de parsear: comillas tipográficas “ ” ‘ ’ → rectas,
  espacios duros, guiones largos y comas colgantes. Resuelve el "no se pudo leer el JSON"
  cuando el texto pegado desde la app de Claude en iPhone trae comillas curvas.
- Mensaje de error más útil (sugiere pedir "en texto plano, solo el JSON").

## v39: peso en la vista previa durante el descanso
- La tarjeta "A continuación" que se muestra durante el descanso entre ejercicios ahora
  incluye el peso propuesto (🏋), igual que el resumen de sesión y la pantalla de inicio de
  serie. Antes solo mostraba series/reps/RIR.

## v40: barra de dominadas opcional y pesos de kettlebell
- Nueva opción de equipo "Barra de dominadas" (independiente de "Gimnasio"). El prompt solo
  permite dominadas/colgarse si está seleccionada; si no, instruye explícitamente NO proponer
  dominadas y usar remos para la espalda. El ejercicio "Dominadas" del motor offline pasa a
  requerir 'dominadas' o 'gimnasio'.
- Al seleccionar "Kettlebell" aparece un campo para indicar los pesos disponibles (kg,
  separados por comas); el prompt los incluye e instruye usar solo esos pesos.

## v41: cabecera del calendario por semana del programa
- La cabecera deja de mostrar el contador relativo a hoy ("Semana 1/2", que confundía al
  navegar entre semanas) y muestra "Semana N del programa", coherente con programWeekFor y con
  la tarjeta "Hoy". Calcula N para la semana MOSTRADA (no la actual), así al avanzar/retroceder
  con ‹ › el número refleja la semana real del programa.
- Helper único weekHeaderLabel()/setWeekHeader() reemplaza los tres puntos que fijaban la
  cabecera (changeWeek, renderCal y arranque). Si aún no hay programStart (usuario sin datos),
  conserva el contador relativo como respaldo.
- Eliminado el sufijo "· descarga" cada 4ª semana relativa: contradecía el modelo de progresión
  continua sin descargas forzadas (la fase la decide Claude, no un módulo %4).

## v42: el historial muestra todas las sesiones (con scroll)
- La tarjeta "Historial" (pestaña Progreso) mostraba solo las 10 sesiones más recientes por un
  recorte de visualización (S.history.slice(0,10)); las más antiguas quedaban ocultas aunque en
  el calendario sí aparecían como "hecho". Los datos nunca se perdieron: S.history conserva todo.
- Se elimina ese recorte y se pintan TODAS las sesiones. El contenedor #history pasa a tener
  max-height:360px con overflow-y:auto (scroll con momentum en iOS), así con pocas sesiones se ve
  compacto y con muchas se desplaza sin alargar la tarjeta.
- Sin cambios en el almacenamiento ni en initState: solo afecta a cómo se visualiza el historial.

## v43: gráficos de ejercicio correctos (fin del "todo sale como sentadilla")
- Muchos ejercicios sin figura propia (p. ej. elevación de talones, extensión de tríceps sobre
  la cabeza, press de hombro, sentadilla sumo) caían a una figura comodín (la sentadilla), por lo
  que ejercicios muy distintos compartían el mismo dibujo.
- Nuevas figuras animadas: gemelo (elevación de talones), tríceps (extensión sobre la cabeza) y
  sumo (sentadilla sumo con mancuerna).
- figKey amplía el enrutado por nombre: sumo→sumo, talones/gemelo/pantorrilla→gemelo,
  tríceps/press francés/extensión sobre la cabeza→tríceps, "press de hombro"→press militar.
- Fallback inteligente: si no hay figura específica, se infiere el grupo muscular del NOMBRE
  (patFromName) y se usa una figura representativa de ese grupo (empuje→flexión, tirón→remo,
  core→plancha, cardio→jumping jack, pierna→sentadilla), en vez de la sentadilla por defecto.
  Se pasa además ex.p como pista. Robusto para ejercicios generados por Claude (sin ex.p).
- Solo afecta a la visualización (SVG); sin cambios en estado, almacenamiento ni initState.

## v44: formatos por bloque (AMRAP/EMOM/circuito) guiados + más figuras
- BUG corregido: al proponer un AMRAP (p. ej. "12 min"), el reproductor lo trataba como una
  pasada única de series×reps y terminaba en ~2 min, sin tope de tiempo ni rondas. Ahora la app
  reconoce bloques y los guía de verdad.
- Nuevo reproductor de bloques:
  · AMRAP: cronómetro de cuenta atrás (tope de tiempo) + botón "Ronda completada (+1)" para contar
    rondas; al agotarse el tiempo registra "N rondas en M min".
  · EMOM: temporizador por minutos con pitido al inicio de cada minuto y contador minuto a minuto.
  · Circuito: número fijo de rondas con contador de ronda.
  El resultado (rondas) se muestra al finalizar y se vuelca a las notas del registro.
- Esquema/prompt: Claude puede expresar estos formatos de forma estructurada con un ejercicio
  {"tipo":"amrap|emom|circuito","duracion_min"|"rondas","movimientos":[{nombre,reps}],...}. Los
  intervalos/HIIT/Tabata de un solo ejercicio siguen funcionando con series + reps en segundos
  ("40s") + descanso_seg. Tanto en el plan semanal como en la modificación de sesión.
- El detalle de sesión y la plantilla de notas muestran los bloques correctamente (antes habrían
  mostrado "undefined×undefined").
- Nota: el motor offline sigue generando fuerza clásica (series×reps); los formatos por bloque
  llegan vía el puente con Claude.
- FIGURAS: nuevas figuras animadas para movimientos comunes de HIIT/circuito en habitación:
  rodillas al pecho, sentadilla con salto, sentadilla isométrica (wall sit), patinador, giro ruso,
  saltar la cuerda y encogimientos. Más rutas por nombre (búlgara→zancada, Arnold→press militar,
  good morning→peso muerto rumano, elevación frontal→lateral, etc.).

## v45: generar sesión IA bajo demanda en cualquier día (sesión adicional)
- Nuevo botón "✨ Generar IA" en el detalle de CUALQUIER día (con sesión IA, libre o vacío). Abre
  un panel con selector completo: objetivo, nivel, tiempo y material (precargados desde el perfil,
  ajustables solo para esa sesión, sin tocar el perfil).
- La sesión se AÑADE como adicional (no sustituye lo que ya hubiera ese día; pueden convivir varias).
- Consciente del histórico: opción "Complementar mi entrenamiento reciente" (activada por defecto)
  que, en el modo offline, prioriza el grupo muscular menos entrenado en los últimos ~10 días y
  evita repetir ejercicios ya presentes ese mismo día. En el modo Claude, el mensaje incluye el
  resumen del entrenamiento reciente y la fase del mesociclo para que complemente sin interferir
  en el objetivo global.
- Base reutilizada: pickExercises/buildSessionOffline admiten ahora opciones (exclusiones y patrón
  de arranque) de forma aditiva; las sesiones offline guardan el patrón muscular (p) para análisis.
- Sin cambios en initState ni en el almacenamiento de datos del usuario.

## v46: "Generar IA" puede sustituir la planificada + "Modificar con Claude" usa histórico/mesociclo
- En el panel "✨ Generar IA", nuevo selector de modo: "Añadir como sesión nueva" o "Sustituir la
  planificada (será la principal)". Al sustituir, la sesión planificada se marca como NO realizada
  y la nueva pasa a ser la principal del día (offline o vía Claude). El modo "Sustituir" solo
  aparece si el día tiene una sesión IA planificada pendiente.
- Robustez con varias sesiones IA el mismo día: nuevo helper de "sesión IA principal" (la no
  saltada/no hecha). Empezar sesión, ver sesión, plantilla de notas, intercambio de ejercicios y
  el marcado de "hecho" al registrar ahora apuntan a la sesión correcta, no siempre a la primera.
- "Modificar sesión → Pedir a Claude" ahora incluye el entrenamiento reciente y la fase del
  mesociclo en el mensaje, para que la sesión regenerada complemente y respete el objetivo global
  (mismos criterios que la generación complementaria), no solo material y tiempo.
- Recordatorio de funcionamiento: la adaptación de la semana siguiente se alimenta de lo que
  REGISTRAS (historial), no de las etiquetas; sustituir o añadir es indistinto para la adaptación.
- Sin cambios en initState ni en el almacenamiento de datos del usuario.

## v47: un único botón "＋ Añadir actividad libre" (sin duplicidad)
- Se elimina el botón duplicado "＋ Añadir" del detalle del día. Queda un único botón
  "＋ Añadir actividad libre" (el de abajo del calendario), que ahora apunta de forma inteligente
  al DÍA SELECCIONADO si hay uno abierto; si no, a hoy; y si hoy no está en la semana mostrada, al
  primer día de esa semana. El formulario mantiene el desplegable de día para cambiarlo.
- Sin cambios de datos ni de almacenamiento.

## v48: entrada de decimales con coma (41,4) en marcadores, peso y mancuernas
- Problema: los campos de marcadores de salud y otros eran type="number", que en iOS bloquea la
  coma como separador decimal, y parseFloat("41,4") truncaba a 41.
- Campos afectados pasan a type="text" con inputmode="decimal" (teclado numérico con coma en iOS):
  FC reposo, HRV, VO₂max, % grasa, sueño, pasos, kcal activas, peso, y mancuernas (desde/hasta,
  admite 2,5 kg). La distancia de actividad ya lo permitía.
- Parseo tolerante: nuevo helper toNum() (coma→punto) usado en saveManualHealth, calcBio,
  saveProfile (normaliza a punto al guardar) y saveDumbbells. Los marcadores enteros (FC, HRV,
  pasos, kcal) se siguen redondeando; los decimales (VO₂max, % grasa, sueño, peso) conservan decimal.
- Altura, edad, kcal y FC del registro siguen como enteros (sin caso decimal).
- Sin cambios en initState ni en el almacenamiento; los datos existentes se conservan.

## v49: pegar la respuesta de Claude tolera comillas tipográficas (Generar IA y Modificar)
- Problema: al pedir la sesión a Claude y pegar el texto en "Generar IA" (o "Modificar"), fallaba
  con "No se pudo leer el JSON" porque el texto llegaba con comillas tipográficas (“ ”) en vez de
  rectas ("), que JSON.parse no acepta.
- El puente semanal ya toleraba esto; ahora se ha extraído esa lógica a un helper común looseJSON()
  que normaliza comillas dobles/simples curvas, guiones largos, espacios duros y comas colgantes, y
  recorta texto sobrante. Lo usan applyGen (Generar IA), applyModify (Modificar) y queda disponible.
- Verificado con el texto real que fallaba (3 ejercicios): ahora se pega y crea la sesión sin error.
- Sin cambios en initState ni en el almacenamiento.

## v50: "Modificar" y "Generar IA" respetan el material real (pesos, bandas y barra)
- Problema 1: al modificar/generar sesión, el mensaje para Claude solo enviaba etiquetas genéricas
  ("mancuernas, bandas") sin los pesos de mancuernas/kettlebell ni las resistencias de banda.
- Problema 2: ese mensaje NUNCA decía que no se dispone de barra ni de barra de dominadas, así que
  Claude proponía ejercicios con barra aunque no estuviera seleccionada. (El motor offline sí
  filtraba bien; el fallo era solo del prompt.)
- Solución: se extrae la lógica del prompt semanal a un helper común equipDetailFor(equipos), que
  inyecta los pesos/resistencias reales y añade prohibiciones EXPLÍCITAS cuando falta material:
  sin barra → no proponer ejercicios con barra; sin barra de dominadas → no proponer dominadas;
  sin gimnasio → no proponer máquinas. Lo usan los tres prompts (semanal, modificar y generar).
- Los selectores de material de Modificar/Generar incluyen ahora "B. dominadas", y muestran un
  resumen del material configurado (pesos de mancuernas, resistencias de banda, kettlebells) con
  enlace directo a Ajustes para editarlo.
- Sin cambios en initState ni en el almacenamiento.

## v51: motor y prompts a nivel "entrenador profesional" (bandas, variedad, explicaciones)
- CATÁLOGO offline ampliado de 30 a 64 ejercicios, cada uno con su propia descripción técnica
  (antes había solo 5 textos genéricos por patrón). Bandas pasan de 5 a 18 ejercicios, incluyendo
  trabajo PROPIO de banda que las mancuernas no cubren: face pull, pull-apart, press Pallof,
  leñador, paseo lateral, patada de glúteo, curl femoral tumbado, empuje de cadera, peso muerto
  rumano con banda, press de pecho y aperturas con banda… y por fin pierna con banda (antes 0).
  También más variedad de mancuernas/peso corporal (búlgara, zancada inversa, remo renegado,
  pájaros, curl martillo, flexiones diamante/declinadas, bicho muerto, superman, subida al cajón…).
- SESIONES OFFLINE más profesionales: cada ejercicio incluye ahora "peso" con guía concreta según
  TU material (rango real de tus mancuernas y cuándo subir; cómo ajustar la tensión de la banda),
  descripción técnica específica del ejercicio, reps 12-20 y vuelta lenta en ejercicios de banda
  (curva de tensión), y meta que explica la orientación de la sesión. Calentamiento y vuelta a la
  calma más útiles.
- ANTI-MONOTONÍA (offline): el generador evita (de forma blanda) repetir ejercicios usados en los
  últimos 14 días y también dentro de la misma semana; mantiene la cobertura por patrones. Probado:
  3 sesiones seguidas sin un solo ejercicio repetido.
- PROMPTS IA (semanal, modificar y generar) con principios de entrenador profesional:
  · Explicar en "descripcion" la técnica Y el porqué de cada ejercicio; "meta" con el propósito.
  · BANDAS: programar ejercicios propios de banda (no copias de mancuerna), reps 12-20, excéntrica
    lenta, especificar anclaje/pisada y cómo ajustar tensión.
  · VARIEDAD: se envía la lista de ejercicios usados en las últimas ~3 semanas con la instrucción
    de rotar accesorios (manteniendo 2-3 básicos estables para progresar).
- Corregido de paso: "Regenerar (offline)" en Modificar aún aplicaba la descarga %4 obsoleta.
- Sin cambios en initState ni en el almacenamiento; los nombres antiguos del catálogo se conservan.

## v52: registro por serie, citas verificables y puente con revisión previa
- REGISTRO POR SERIE (reproductor): en cada serie por repeticiones aparecen dos campos kg × reps
  PRELLENADOS con lo propuesto (y con lo que escribiste en la serie anterior del mismo ejercicio):
  si hiciste lo previsto no tocas nada; si difiere, lo corriges en 2 toques. Los ejercicios por
  tiempo ("40s") se registran solos. Al terminar, la pantalla de fin muestra "Cargas registradas",
  se guardan en la sesión del calendario (campo aditivo `sets`) y viajan al historial al registrar.
  El reproductor muestra además "Última vez (fecha): 16 kg × 12, 12, 10" para cada ejercicio con
  marca previa, y el historial de Progreso enseña las cargas de cada sesión.
- El prompt semanal incluye ahora las "CARGAS REALES serie a serie" de cada sesión registrada, con
  instrucción explícita de usarlas como dato principal para la doble progresión (subir de escalón
  de mancuerna al alcanzar el tope de reps en todas las series).
- CITAS VERIFICABLES: se elimina la referencia "ACSM 2026 Position Stand" (no verificable) de la
  tarjeta Fundamentos, del comentario del motor y de los prompts. Se sustituye por fuentes reales:
  ACSM 2009 "Progression Models in Resistance Training" (Med Sci Sports Exerc); Schoenfeld, Ogborn
  & Krieger 2016 (frecuencia, Sports Med) y 2017 (volumen, J Sports Sci); Grgic et al. 2022
  (proximidad al fallo, J Sport Health Sci); Grgic et al. 2018 (descansos, Sports Med); Morton et
  al. 2018 (proteína, Br J Sports Med). El prompt además prohíbe a Claude inventar referencias.
  De paso, la tarjeta Fundamentos ya no menciona "descarga cada 4 semanas" (contradecía el modelo
  de progresión continua de v41).
- PUENTE CON REVISIÓN PREVIA (semanal): "Aplicar plan" pasa a "Revisar y aplicar". Antes de tocar
  el calendario se muestra un resumen por día (título, ejercicios con series×reps y peso, si
  sustituye a una sesión existente), la nutrición y la fase del mesociclo, junto con problemas
  detectados: errores que bloquean (falta sesiones_ia, dia_codigo inválido, ejercicios sin
  nombre/series/reps) y avisos (ejercicio sin "peso", dominadas o barra sin ese material
  configurado). Con problemas, un botón copia una petición de corrección lista para pegar en Claude.
- PEGADO EN UN TOQUE: botón "📋 Pegar respuesta" (navigator.clipboard.readText con gesto del
  usuario, permiso nativo de iOS) en el puente semanal ("Pegar respuesta y revisar") y en los
  paneles Modificar y Generar IA ("Pegar respuesta y aplicar"). El pegado manual sigue disponible.
- Modificar/Generar validan ahora la sesión pegada con el mismo validador (errores y avisos con
  opción de copiar la corrección) en lugar del chequeo mínimo de "ejercicios".
- applyBridge se refactoriza: parseo unificado con looseJSON (se elimina el duplicado) y la
  aplicación real vive en applyBridgePlan(plan), llamada tras confirmar la revisión.
- initState sin cambios; los campos nuevos (sets en schedule/history) son aditivos y opcionales.

## v53: citas actualizadas al ACSM 2026 Position Stand (evidencia verificada)
- CONTEXTO: en v52 se sustituyó "ACSM 2026 Position Stand" (que entonces no se pudo verificar y
  se creyó inexistente) por el de 2009. Verificación posterior en fuente primaria (acsm.org y la
  ficha del artículo en Medicine & Science in Sports & Exercise) confirma que el ACSM SÍ publicó
  en abril de 2026 un nuevo Position Stand —el primero desde 2009—, "Resistance Training
  Prescription for Muscle Function, Hypertrophy, and Physical Performance in Healthy Adults",
  síntesis de 137 revisiones sistemáticas (>30.000 participantes). v53 lo incorpora como
  referencia principal en las tres ubicaciones (tarjeta Fundamentos, comentario del motor y los
  prompts), con su título real y publicación.
- Fuentes de respaldo actualizadas y verificadas (2024-2026), todas alineadas con el diseño de la
  app: Robinson et al. 2024 (Sports Med; meta-regresión de proximidad al fallo: la hipertrofia
  mejora entrenando más cerca del fallo, la fuerza es similar lejos o cerca → respalda RIR 1-3 en
  hipertrofia); Pelland et al. 2025 (Sports Med; dosis-respuesta de volumen y frecuencia); Morton
  et al. 2018 (proteína, sin cambios: 1,6-2,2 g/kg/día sigue siendo el consenso). Se retiran de la
  redacción las citas de 2009 y las de Schoenfeld/Grgic que quedaban subsumidas por las anteriores.
- Se incorpora a Fundamentos y a los prompts el mensaje central del ACSM 2026: la constancia y el
  esfuerzo pesan más que un plan "perfecto"; bandas, peso corporal y rutinas en casa son plenamente
  eficaces; y llegar al fallo, el tipo de material y la periodización compleja no son
  imprescindibles en el adulto sano. Refuerza el enfoque ya vigente (RIR en vez de fallo, sin
  descargas forzadas, material sin barra).
- Se mantiene la instrucción a Claude de no inventar ni "actualizar" referencias.
- Cambio SOLO de contenido de referencias/explicaciones: no toca el motor, el reproductor, el
  puente ni initState. La persistencia de datos del usuario y el resto de validaciones siguen igual.

## v54: seguridad, robustez de arranque y copias de seguridad de datos
- SEGURIDAD (XSS): se añade `esc()`, función centralizada de escapado de HTML, y se aplica en
  todos los puntos donde se interpola vía `innerHTML` contenido que puede venir de fuera de la
  app: el JSON pegado desde Claude (nombres/títulos/notas de ejercicio, nutrición, mesociclo,
  mensajes de validación en la vista previa del puente) y el historial de sesiones. Antes, un
  campo `nombre` malicioso en el JSON pegado podía ejecutarse como HTML/JS en la vista de sesión
  o en la vista previa del puente; ahora se muestra siempre como texto. Probado con un plan de
  prueba que incluye `<img onerror=...>` y `<script>` en `titulo`/`nombre`.
- MIS DATOS (Ajustes): nueva tarjeta con "Exportar mis datos" (descarga un JSON con todo `S`),
  "Restaurar copia de seguridad" (sube ese JSON, valida que tenga forma de copia de FitCoach IA
  antes de aplicar, pide confirmación porque sustituye todo) y "Eliminar todos mis datos" (doble
  confirmación, borra `localStorage['fitcoach']`). Hasta ahora no había ninguna vía de salida de
  los datos: si se perdía el icono o se corrompía el almacenamiento, no había forma de recuperar
  nada, lo cual contradecía la convención de no perder datos del usuario.
- ARRANQUE MÁS ROBUSTO ante datos corruptos (antes fallaban en silencio o bloqueaban la app):
  - `load()` distingue ahora "no hay datos" de "los datos no se pudieron leer" (JSON corrupto) y
    en el segundo caso avisa con un aviso visible en vez de arrancar en silencio como si fuera un
    usuario nuevo.
  - `save()` avisa si `localStorage.setItem` falla (cuota llena, modo privado) en vez de perder el
    cambio sin más.
  - `inferProgramStart()` y `weekKeyOf()`/`computeStats()` ignoran ahora claves de fecha con
    formato inválido en vez de lanzar una excepción no capturada que bloqueaba el resto del
    arranque (`renderNutri`, `renderHealth`, etc. dejaban de ejecutarse). Encontrado con un test
    de arranque con historial corrupto; no se había observado en uso real pero es exactamente el
    escenario que "Mis datos → Restaurar" puede introducir si se sube un archivo editado a mano.
  - El registro del service worker ya no falla en silencio: si falla, se avisa en Ajustes ("el
    modo sin conexión no se ha podido activar") en vez de un `catch(()=>{})` mudo.
- PUENTE CON CLAUDE: `applyBridgePlan` pide confirmación explícita antes de sustituir una sesión
  del día que el usuario ya había marcado como completada (antes se sobrescribía sin avisar).
  De paso se corrige un bug real: el bloque que guarda la fase del mesociclo en `S.insight` estaba
  duplicado, y en medio `analisis_progreso` sobrescribía `S.insight` entero en lugar de añadirse,
  así que un plan con mesociclo + análisis podía perder contenido o dejarlo duplicado. Se sustituye
  por `appendInsight()`, que además limita el tamaño total (~4000 caracteres) para que no crezca
  sin límite en localStorage con meses de uso.
- Validado: 0 `api.anthropic.com`, etiquetas balanceadas (div/script/svg), test de arranque con
  DOM stub en Node con un usuario veterano completo (perfil, agenda, historial, baseline, healthLog,
  nutrición, mesociclo, config de material) confirma que se conserva todo tras el version bump, y
  tests específicos de exportar/restaurar/borrar datos y de los dos escenarios de arranque corrupto.
- Pendiente para próximas versiones (no incluido en v54): rangos de calorías con revisión semanal,
  registro de dolor/fatiga por sesión, onboarding de lesiones/limitaciones, Web Worker para XML
  grandes de Salud, y mover los estilos inline a clases CSS reutilizables.

## v55: limitaciones/lesiones, fatiga acumulada y calorías como rango
- LIMITACIONES Y LESIONES (nueva tarjeta en Ajustes): chips de zona (rodilla, hombro, lumbar,
  muñeca/codo, otra) + nota libre opcional. Se guardan en `S.profile.limitaciones` (aditivo).
  El motor offline (`pickExercises`) excluye automáticamente los ejercicios de mayor carga/impacto
  para esa zona (lista curada por zona, `RISK_EXCLUDE`) en los tres flujos que generan sesión
  offline (semana completa, regenerar día, generar sesión puntual) sin haber tenido que tocar los
  tres sitios por separado: la exclusión vive centralizada dentro de `pickExercises`. Lo mismo se
  comunica a Claude en el prompt semanal como instrucción explícita ("evita o adapta con cuidado
  los ejercicios de... propón alternativas de menor riesgo, no las omitas sin más").
- DOLOR POR SESIÓN: el formulario de registro añade chips de zona con dolor/molestias durante esa
  sesión (independiente de las limitaciones fijas). Los últimos 14 días de dolor reportado se
  suman a las limitaciones fijas del perfil para la misma exclusión de riesgo (`activeRiskAreas`),
  así que una molestia puntual también protege las próximas sesiones sin tener que ir a Ajustes.
  También viaja al prompt de Claude junto al esfuerzo (RPE) que ya se enviaba.
- FATIGA ACUMULADA: el formulario de registro añade "¿Cómo llegabas antes de empezar?"
  (fresco/normal/cansado/agotado). Si 2 de las últimas 3 sesiones registradas fueron
  cansado/agotado, el motor offline aplica una descarga suave automática (1 serie menos por
  ejercicio, RIR más alejado del fallo) y lo indica en el resumen de la sesión — sin renombrarla
  "descarga" (eso sigue reservado a la periodización real del mesociclo) y sin bloquear nada: es
  una sugerencia del motor, no una restricción.
- CALORÍAS COMO RANGO: `nutriPlan`/`buildNutriOffline` devuelven `calorias_min`/`calorias_max`
  (±7% del centro) en vez de una única cifra. El esquema JSON que se le pide a Claude incluye los
  mismos campos opcionales, con instrucción explícita de presentarlo como estimación con margen,
  no como objetivo exacto. `renderNutri` muestra el rango cuando existe y sigue mostrando el valor
  único si el plan (propio o de una copia antigua) no lo trae, para no romper datos existentes.
- REVISIÓN SEMANAL: nueva tarjeta en Nutrición con la adherencia de la semana (reutiliza el mismo
  cálculo que Progreso, ahora en `weekAdherencePct()`) y la tendencia de peso de las últimas ~2
  semanas (`weightTrend()`, comparando la media de los últimos 7 registros con los 7 anteriores).
  El peso se registra automáticamente en `S.weightLog` cada vez que se guarda el perfil (máx. 1
  entrada/día); no es una tabla nueva que rellenar aparte. La nota de tendencia es siempre
  informativa y de baja presión ("si quieres, prueba...", nunca una cifra exacta a cumplir), y con
  menos de 4 registros no se muestra ninguna conclusión en vez de forzar una con pocos datos.
- Validado: 0 `api.anthropic.com`, etiquetas balanceadas, sintaxis JS verificada, y una batería de
  18 pruebas nuevas (exclusión de riesgo con limitación fija y con dolor reciente, ausencia de
  exclusión sin ninguna de las dos, fatiga acumulada activando/no activando el ajuste, rango de
  calorías coherente, tendencia de peso al alza y sin datos suficientes, presencia de las
  limitaciones en el prompt, registro de peso una vez al día) más las 19 del test de persistencia
  (incluye ahora limitaciones, nota, weightLog y dolor/fatiga del historial) y las 5 de gestión de
  datos de v54: 43 comprobaciones, 0 fallos.
- Pendiente para próximas versiones: gráfica de progresión de carga por ejercicio, modo
  entrenamiento simplificado, búsqueda/sustitución de ejercicios con filtro de impacto/dolor
  explícito en la sesión (hoy la exclusión es automática, sin una vista de "cámbiame esto"), Web
  Worker para XML grandes de Salud, y mover los estilos inline a clases CSS reutilizables.

## v56: progresión de carga, sustitución libre de ejercicios y primeras clases CSS
- PROGRESIÓN DE CARGA (nueva tarjeta en Progreso): usa los `sets` (kg×reps serie a serie) que ya
  se guardan desde el reproductor guiado, sin ningún registro nuevo que rellenar. Un selector lista
  los ejercicios con carga numérica registrada en ≥2 sesiones distintas y dibuja la carga máxima
  por sesión a lo largo del tiempo (reutiliza `sparkline()`, la misma que ya se usaba para los
  marcadores de salud). Si no hay datos suficientes, la tarjeta se mantiene oculta en vez de
  mostrar un hueco vacío.
- BÚSQUEDA Y SUSTITUCIÓN LIBRE DE EJERCICIOS: hasta ahora "Alternativas" solo mostraba 1-2 opciones
  curadas para ~11 familias de ejercicios (`ALT`). Se añade "🔍 Buscar otro ejercicio" en cada
  ejercicio de la sesión, con un desplegable de TODOS los ejercicios compatibles (mismo patrón de
  movimiento y equipo disponible) de la base de 64. Los que caen en una zona marcada como
  limitación o con dolor reciente (v55) se marcan con ⚠, pero siguen siendo elegibles — es aviso,
  no bloqueo; la decisión es del usuario. La sustitución conserva series/reps/descanso originales
  y guarda el ejercicio propuesto en `_orig` la primera vez, igual que ya hacía "Alternativas".
- MODO ENTRENAMIENTO SIMPLIFICADO: revisado el reproductor guiado existente (`renderPlayer`) y ya
  cubre exactamente lo pedido — un ejercicio a la vez, ilustración, serie, carga, descanso y botón
  grande de acción. No se ha duplicado como función nueva porque ya existe; construir una segunda
  versión habría sido redundante.
- ESTILOS INLINE → CLASES CSS: medido antes de tocar nada. De 284 atributos `style=""` en el
  archivo, 91 comparten etiqueta con un `class=""` ya existente — sustituir esos a ciegas con
  buscar/reemplazar duplicaría el atributo `class` (HTML inválido; el navegador se queda con uno
  de los dos y la clase original —`card`, `chip`, `note`...— desaparece en silencio, rompiendo el
  layout sin que ningún test lo detecte, porque son pruebas de lógica/datos, no visuales). Se
  añaden las clases de utilidad (`.mt-6`, `.mt-8`, `.mt-9`, `.mt-10`, `.mt-12`, `.mt-16`, `.w100`,
  `.flex1`, `.hide`) y se aplican solo a las 9 ocurrencias verificadas como seguras (sin `class`
  previo en la misma etiqueta, confirmado por script antes y después con diff línea a línea). El
  resto de la limpieza de estilos inline queda pendiente y requiere revisión caso a caso con
  verificación visual real (abrir la app y comprobar cada pantalla), no un barrido automático.
- WEB WORKER PARA XML DE SALUD: se mantiene fuera, igual que en v54/v55. Sigue sin haber
  confirmación de que el `export.xml` de Apple Health llegue a congelar Safari en uso real; añadir
  un Worker sin ese problema confirmado es complejidad especulativa.
- Validado: sintaxis JS, 0 `api.anthropic.com`, etiquetas balanceadas (div/script/svg/select/
  details), diff exacto del refactor de CSS confirmando que solo cambiaron las 9 líneas esperadas,
  y 17 pruebas nuevas (ejercicios con carga suficiente/insuficiente aparecen o no en la lista,
  orden cronológico de la progresión, sets sin kg numérico no cuentan, render con y sin datos,
  compatibilidad por patrón/equipo, sustitución conserva la prescripción y marca `_orig`, aviso ⚠
  visible con limitación activa) sobre las 43 previas de v54/v55: 60 comprobaciones, 0 fallos.

## v57: corrección real de desbordamiento de marcadores + mejoras de alineación
- BUG REPORTADO POR EL USUARIO: en iPhone 12 mini, algunos marcadores se salían del recuadro.
  Confirmado con Playwright (Chromium real, viewport 375×812, DPR3, fuente al "Máximo"): la
  tarjeta de Marcadores de Salud desbordaba hasta **139px** en VO₂max y "kcal activas/día", los
  dos que llevan flecha de tendencia (▲/▼). Causa raíz: `.stat` es una celda de grid/flex sin
  `min-width:0`, así que en vez de encogerse al ancho de columna disponible, empuja la fila entera
  fuera de la pantalla; lo agrava que la flecha de tendencia fuerza `white-space:nowrap`.
- FIX: `min-width:0` en `.stat` (deja que la celda se encoja) + `overflow-wrap:break-word` en
  `.stat-v`/`.stat-l` (el texto que no cabe se rompe en vez de salirse). Afecta a la vez a los
  marcadores de Salud, Progreso, Nutrición y Logros porque todos comparten la misma clase — un
  solo arreglo centralizado, no cuatro parches. Añadido además un ajuste de tamaño base para
  pantallas ≤380px (iPhone SE/12 mini), colocado con cuidado DESPUÉS de la regla `!important` de
  escalado de fuente existente para que realmente gane la cascada (una primera versión del ajuste
  se colocó antes por error y quedaba anulada en silencio; se detectó y corrigió antes de
  entregar).
- VERIFICADO CON NAVEGADOR REAL, no solo razonamiento: se instaló Playwright+Chromium y se
  reprodujo el bug exacto (139px de overflow) revirtiendo el fix temporalmente, confirmando que
  el test lo detecta; luego se restauró el fix y se confirmó 0px de overflow en las 5 pantallas
  principales más 5 estados adicionales (sesión colapsada/expandida, buscador de sustitución
  abierto, hoja de registro con los chips de fatiga/dolor de v55, tarjeta de limitaciones), con
  datos de prueba deliberadamente exigentes (fuente al máximo, marcadores con tendencia, rango de
  calorías, limitaciones activas).
- MEJORA ADICIONAL encontrada durante la revisión visual (no era overflow, pero sí un defecto real
  de diseño): en la vista de sesión, cuando la frase de carga (`peso`) es larga —el motor offline
  ya proponía frases completas tipo "elige de tus mancuernas (8–24 kg) la que te deje RIR 1-3;
  cuando completes todas las series..."—, se concatenaba en la misma línea compacta que
  series×reps·descanso·RIR·tempo, sobrecargándola, y el círculo numerado del ejercicio quedaba
  centrado verticalmente respecto a un bloque de texto que ahora podía ocupar 5-6 líneas, en vez
  de alineado arriba junto al título. Se separó la carga a su propia línea destacada (mismo
  patrón 🏋 que ya usa el reproductor guiado) y se cambió `.ex-h` a `align-items:flex-start`.
- Validado: sintaxis JS, 0 `api.anthropic.com`, etiquetas balanceadas, y las 60 comprobaciones
  automáticas previas (persistencia, gestión de datos, v55, v56) siguen en verde tras estos
  cambios de CSS/maquetación — no se tocó ninguna lógica de datos.

## v58: adaptación por cambio de material que conserva la sesión (no la rehace)
- CAMBIO DE COMPORTAMIENTO SOLICITADO: hasta ahora, "Modificar sesión" por cambio de material
  —tanto offline como con Claude— construía una sesión NUEVA desde cero, descartando los
  ejercicios que ya había. Si tenías press y sentadilla y solo cambiabas de gimnasio a mancuernas,
  podías perder ejercicios que tenían variante perfecta con el nuevo material, rompiendo la
  coherencia de la semana propuesta. Ahora se ADAPTA la sesión conservando su estructura.
- MOTOR OFFLINE (`adaptExerciseToEquip`/`adaptSessionToEquip`, reescritura de
  `regenerateDayOffline`): para cada ejercicio de la sesión prevista decide entre tres casos:
  (a) sigue siendo viable con el material de hoy → se MANTIENE igual (solo se actualiza la pista de
  carga al nuevo material); (b) no es viable pero existe una variante EQUIVALENTE de la misma
  familia (mismo patrón de movimiento + mismo grupo muscular principal) que sí usa el material
  disponible → se sustituye por esa variante conservando series/reps/descanso/RIR/tempo y su
  explicación (p. ej. Press de banca→Press con mancuernas, Sentadilla con barra→Sentadilla goblet,
  Remo con barra→Remo con mancuerna); (c) no hay equivalente → solo entonces se rellena ese hueco
  con un ejercicio fresco del generador, evitando duplicar lo que ya se conserva. Al terminar
  muestra un resumen de qué se mantuvo, qué se adaptó y qué se sustituyó.
- VÍA CON CLAUDE (`modifyWithClaude`): el mensaje ahora incluye la lista de ejercicios que YA
  estaban previstos para hoy y una instrucción explícita de "adapta, no rehagas": conservar cada
  ejercicio viable, sustituir solo los inviables por su variante equivalente más parecida con el
  material disponible manteniendo la prescripción, y NO cambiar los que ya son viables solo por
  variar. Se le pide además explicar en la descripción de cada ejercicio adaptado que es la
  variante del original para ese material. Así ambas vías (offline e IA) dan el mismo tipo de
  resultado coherente.
- Los bloques AMRAP/EMOM/circuito se conservan tal cual (no se intenta trocearlos por material).
- VERIFICADO: 25 pruebas unitarias y e2e nuevas (mantener viable, convertir barra→mancuerna en
  empuje/pierna/tirón conservando prescripción, caída a variante corporal o replace cuando solo
  hay peso corporal, no duplicar cuando dos ejercicios colapsarían al mismo, resumen al usuario, y
  presencia de la sesión actual + instrucción de adaptar en el prompt de Claude). Verificación
  visual real con Playwright/Chromium en iPhone 12 mini: se cargó una sesión de 3 ejercicios de
  barra, se pidió adaptar a solo mancuernas, y se confirmó que los tres se convirtieron a su
  equivalente con mancuerna (0px de overflow, estructura y descripciones correctas). Durante esa
  verificación se detectó y corrigió un fallo del propio script de prueba (asignar `window.MOD` en
  vez de la variable `MOD` del módulo) — no era un bug de la app, pero confirma el valor de probar
  el flujo real y no solo las funciones aisladas.
- Las 60 comprobaciones automáticas previas (v54-v57) siguen en verde: 85 en total, 0 fallos.

## v59: la plantilla de registro vuelca las cargas REALES, no lo previsto
- BUG REPORTADO: al finalizar la sesión guiada, el reproductor muestra y guarda las cargas reales
  (peso×reps por serie). Pero al abrir el registro y pulsar "Plantilla cargas", se volcaba lo
  PREVISTO (series×reps·peso de la sesión), ignorando lo que se acababa de registrar. Resultado:
  las notas contradecían lo que la app decía haber guardado, generando dudas sobre qué quedaba
  realmente registrado.
- CAUSA: `insertLoadTemplate` leía `ex.series`/`ex.reps`/`ex.peso` (lo propuesto) y no tocaba
  `sess.sets`, que es donde el reproductor ya guardaba las cargas reales (desde v52) con la
  estructura `[{nombre, series:[{kg,reps}...]}]`.
- FIX: `insertLoadTemplate` ahora, para cada ejercicio, vuelca las cargas REALES si el reproductor
  las registró (usando el mismo `fmtSets()` que la pantalla de fin de sesión, así el texto coincide
  exactamente con lo que se vio al terminar), y solo cae a lo previsto —marcándolo como "(previsto
  — sin registrar)"— para los ejercicios sin registro real. La cabecera de la plantilla indica de
  qué se trata ("Cargas reales registradas en la sesión guiada" vs. el "✓ según lo previsto" de
  antes). Si no hay ningún registro real (p. ej. sesión no hecha con el reproductor), el
  comportamiento anterior con ✓ se mantiene intacto.
- MEJORA AÑADIDA: al abrir el registro justo tras finalizar la sesión guiada, si hay cargas reales
  y las notas están vacías, la plantilla real se AUTOCARGA (no hay que pulsar el botón). Así, en el
  momento exacto de la confusión reportada —acabas de ver tus cargas y abres el registro— ves ya
  reflejado lo que hiciste. El botón, además, se llama "＋ Cargas reales" cuando hay registro real
  y "＋ Plantilla cargas" cuando no.
- VERIFICADO: 10 pruebas nuevas (vuelca real y no previsto; cae a previsto sin registro; registro
  parcial mezcla real + "sin registrar"; autocarga en openLog; autocarga solo con notas vacías) +
  verificación visual real con Playwright/Chromium en iPhone 12 mini confirmando que tras finalizar
  se ve "Press con mancuernas: 18×10, 18×9, 18×8, 16×8 / Sentadilla goblet: 24 kg × 10, 10, 9, 8"
  (lo real) y no lo previsto (16/20 kg), sin overflow. Las 85 comprobaciones previas (v54-v58)
  siguen en verde: 95 en total, 0 fallos.

## v60: el Análisis del entrenador muestra un único análisis vigente (no acumula semanas)
- BUG REPORTADO: al adaptar la semana y pegar la respuesta de Claude, el "Análisis del entrenador"
  (pestaña Progreso) conservaba el texto de la semana anterior y añadía el nuevo debajo, dejando
  dos análisis a la vista y generando dudas sobre cuál era el vigente.
- CAUSA: `applyBridgePlan` usaba `appendInsight()` para las tres piezas del análisis
  (`analisis_progreso`, fase del mesociclo y cardio), y esa función ACUMULA entradas (solo limitaba
  el tamaño total a 4000 caracteres). Diseño heredado de cuando se quería un histórico de análisis;
  en la práctica confunde.
- FIX: al aplicar un plan, el análisis se RECONSTRUYE desde cero con solo las piezas de la
  adaptación actual (análisis + fase + cardio de ESE plan), reemplazando el anterior. Un único
  análisis vigente. No se pierde nada del historial de lo realizado: eso vive aparte en `S.history`
  y se le sigue enviando a Claude en cada adaptación, así que su análisis ya tiene en cuenta la
  progresión previa — que es justo lo que se pedía ("un solo análisis, pero teniendo en cuenta el
  historial"). Si un plan no trae análisis nuevo, se conserva el anterior en vez de vaciar el panel.
- `appendInsight()` queda sin uso en el flujo de aplicar plan (se mantiene definida; los tests de
  su límite de tamaño siguen pasando).
- VERIFICADO: 12 pruebas nuevas (un plan reemplaza el análisis anterior; dos adaptaciones seguidas
  dejan solo la última; no se acumulan líneas de "Fase del mesociclo"; el historial de lo realizado
  queda intacto; un plan sin análisis no vacía el panel; renderProg pinta el vigente) + verificación
  visual real con Playwright/Chromium en iPhone 12 mini partiendo de un estado con análisis previo,
  confirmando que tras adaptar solo se ve el análisis nuevo (con su fase y cardio) y no el anterior,
  sin overflow. Las 95 comprobaciones previas (v54-v59) siguen en verde: 107 en total, 0 fallos.

## v61: la progresión de carga lista TODOS los ejercicios registrados (no solo los de 2+ sesiones)
- SÍNTOMA REPORTADO: en "Progresión de carga" (pestaña Progreso) solo se veían dos ejercicios en
  el selector, sin poder elegir otros; no quedaba claro si faltaban datos o si fallaba la app.
- CAUSA (no era de visualización): `exercisesWithLoggedSets()` filtraba con `n>=2`, así que un
  ejercicio solo aparecía en el selector si tenía carga registrada en 2 o más sesiones distintas.
  Los registrados una sola vez quedaban invisibles. Reproducido: con 6 ejercicios registrados (2
  con 2 sesiones, 4 con 1), el selector mostraba solo los 2 — exactamente el síntoma descrito.
- FIX: el selector ahora lista TODOS los ejercicios con al menos una sesión con carga registrada
  (umbral `n>=1`), ordenados por nº de sesiones (los que ya tienen gráfica primero) y luego
  alfabéticamente. Cada opción muestra su nº de sesiones, p. ej. "Press con mancuernas (2
  sesiones)", "Curl de bíceps (1 sesión)".
- Al elegir un ejercicio con una sola sesión, en vez de esconderlo o dar un mensaje seco, se
  muestra su carga registrada ("Carga registrada hasta ahora: 10 kg") y un aviso claro de que la
  gráfica de evolución aparece a partir de la 2ª sesión. Con 2+ sesiones se dibuja la gráfica como
  antes. La nota de la tarjeta se actualizó en consecuencia.
- Se añade `loggedSessionCount()` (nº de sesiones con carga por ejercicio) para etiquetar el
  selector.
- VERIFICADO: 19 pruebas nuevas (los 6 ejercicios aparecen y no solo 2; orden por nº de sesiones;
  conteo correcto; selector poblado y etiquetado; ejercicio de 1 sesión muestra carga + aviso sin
  ocultarse; ejercicio de 2 dibuja gráfica; historial vacío mantiene la tarjeta oculta) +
  verificación visual real con Playwright/Chromium en iPhone 12 mini confirmando los 6 ejercicios
  en el selector, el mensaje del de 1 sesión y la gráfica del de 2, sin overflow. Se actualizó la
  prueba de v56 que codificaba el umbral antiguo (n>=2) al nuevo comportamiento. Las 107
  comprobaciones previas siguen en verde: 126 en total, 0 fallos.

## v62: registro por tipo de banda y ejercicios de banda sin anclaje
Dos problemas reportados sobre el entrenamiento con bandas elásticas.

### 1. El registro no tenía en cuenta QUÉ banda se usaba
- SÍNTOMA: al hacer un ejercicio con banda, el reproductor mostraba un campo "kg" que quedaba
  vacío (una banda no tiene peso en kg) y solo se registraban las repeticiones. La resistencia
  usada (baja/media/alta) se perdía, así que ni el registro, ni la plantilla de notas, ni el
  historial que se envía a Claude sabían con qué banda se había entrenado — imposible progresar.
- FIX: en ejercicios de banda, el campo "kg" se sustituye por un SELECTOR de resistencia
  (baja/media/alta, limitado a las que el usuario tiene en su perfil), preseleccionado con la banda
  que proponía la sesión. La serie se guarda como `{reps, banda}` y `fmtSets()` la formatea como
  "banda media × 18, 16, 14". Como todo el resto de la app ya usaba `fmtSets`, la banda se propaga
  automáticamente a: pantalla de fin de sesión, plantilla de cargas del registro (v59), historial y
  el bloque "CARGAS REALES serie a serie" del prompt de Claude.
- `isBandExercise()` solo trata un ejercicio como "de banda" si es exclusivo de banda con el
  material del usuario: si tiene mancuernas y el ejercicio admite ambas (p. ej. curl de bíceps), se
  sigue registrando en kg. El registro en kg no cambia en nada.

### 2. Se proponían ejercicios que exigen anclar la banda
- SÍNTOMA: con bandas seleccionadas se proponían ejercicios que requieren anclarla a una puerta,
  barra o poste, sin que el usuario tenga dónde hacerlo.
- FIX: se marcan en la base los 6 ejercicios que dependen de un anclaje externo (`anc:1`): jalón,
  face pull, press Pallof, aperturas, leñador y curl femoral con banda. Los otros 12 de banda se
  pueden hacer pisándola o sujetándola con el cuerpo y no se tocan.
- Nueva pregunta en Perfil → Bandas elásticas: "¿Puedes anclar la banda a un punto fijo?" con dos
  opciones ("No, solo pisarla o sujetarla" / "Sí, puerta, barra…"). **Por defecto: NO**, que es lo
  más restrictivo y evita proponer algo que no se pueda hacer.
- Sin anclaje, esos 6 ejercicios se excluyen del generador offline (centralizado en
  `pickExercises`, así que cubre los tres flujos de generación) y de la adaptación por material de
  v58. En el buscador manual de sustitución se marcan con ⚓ pero NO se bloquean, siguiendo el
  mismo criterio que las limitaciones de v56: ahí el usuario elige deliberadamente y puede tener
  un anclaje puntual.
- El prompt a Claude refleja la restricción: sin anclaje se le indica explícitamente que no
  disponemos de ningún punto donde anclar, se listan los ejercicios a evitar y se le pide explicar
  cómo pisar o sujetar la banda; con anclaje, se le indica que sí puede proponerlos. También se le
  pide siempre indicar la banda (baja/media/alta), no un peso en kg.
- VERIFICADO: 35 pruebas nuevas (formato de banda uniforme y variable, registro en kg intacto,
  detección de ejercicio de banda con y sin mancuernas, banda sugerida según carga propuesta y
  resistencias disponibles, los 6 ejercicios marcados y los otros no, 40 generaciones sin ningún
  ejercicio anclado con el ajuste en "No", sí aparecen con "Sí", adaptación por material coherente,
  y ambas variantes del prompt) + verificación visual real con Playwright/Chromium en iPhone 12
  mini: el reproductor muestra el selector "banda baja/media/alta" y ningún campo kg, al completar
  la serie guarda `{reps:"15", banda:"alta"}`, y la plantilla del registro muestra "Remo con banda:
  banda media × 18, 16, 14". Las 126 comprobaciones previas siguen en verde: 161 en total, 0 fallos.

## v63: refactor de estilos inline a clases CSS (con verificación pixel a pixel)
Pendiente desde v56, cuando se aplazó por no poder verificar el resultado visualmente. Con
Playwright disponible desde v57, ya era abordable con garantías.

- POR QUÉ ERA DELICADO: 93 de los 282 atributos `style=""` estaban en etiquetas que YA tenían
  `class=""`. Un buscar/reemplazar ingenuo crea un SEGUNDO atributo `class`, el navegador se queda
  con uno de los dos y la clase original (`card`, `chip`, `note`…) desaparece en silencio, rompiendo
  el layout sin que ningún test de lógica lo detecte.
- SOLUCIÓN: el script de refactor FUSIONA la utilidad dentro del `class` existente
  (`class="card" style="margin-top:8px"` → `class="card mt-8"`), nunca crea un atributo nuevo, y
  aborta si detecta cualquier `class` duplicado. Las utilidades se declaran al FINAL de la hoja de
  estilos para conservar la precedencia que tenía el inline frente a reglas anteriores.
- RED DE SEGURIDAD (lo que hacía viable el refactor): baseline de 22 capturas a pantalla completa
  (11 pantallas/estados × 2 tamaños de letra: normal y "Máximo"), comparadas pixel a pixel tras cada
  lote. Incluye calendario, sesión (cerrada/abierta/con buscador), progreso, nutrición, perfil, hoja
  de registro, reproductor guiado, modal de modificar y puente con Claude. Se validó el comparador
  en ambos sentidos: da "idénticas" sin cambios, y detecta un cambio deliberado de 1px en el margen
  de `.card` (20 de 22 capturas marcadas). Para que fuera determinista hubo que congelar animaciones
  y transiciones durante la captura (las figuras de ejercicio y el fade de pestaña se captaban en
  fotogramas distintos).
- REGRESIÓN REAL DETECTADA Y CORREGIDA EN EL PROCESO: el primer lote convirtió
  `style="display:none"` en `class="hide"` y el comparador detectó que la pantalla de Progreso se
  acortaba 710px. Causa: la app muestra esas tarjetas con `el.style.display=''`, que limpia el
  estilo inline pero NO puede desactivar una clase, así que la tarjeta de progresión de carga
  quedaba oculta para siempre. `display:none` se excluyó del refactor y queda documentado.
- RESULTADO: 282 → 207 estilos inline (−27%); los casos delicados `class`+`style` bajan de 93 a 37
  (−60%); 75 conversiones en 3 lotes (espaciado/layout, contenedores, color/tipografía), cada uno
  verificado por separado. Nuevas utilidades: `.mt-4/6/8/9/10/12/16`, `.mb-8/9/10/11/12`, `.my-8`,
  `.w100`, `.flex1`, `.flexrow`, `.gap8`, `.pad-exsec`, `.box-sub`, `.nodec`, `.ul-tight`,
  `.c-free`, `.c-stand`, `.fw6`, `.c-text`.
- 9 pruebas nuevas de integridad estructural y de regresión: sin `class` duplicados, todas las
  utilidades usadas están definidas, los elementos que el JS muestra/oculta no llevan el display en
  una clase, y las tarjetas de progresión y de salud siguen mostrándose y ocultándose según haya
  datos. Verificado que este test DETECTA la regresión si se reintroduce.
- Herramientas añadidas al flujo de trabajo (no se despliegan): `visual-baseline.js`,
  `visual-diff.js` y `refactor-css.js`, reutilizables para futuros cambios de maquetación.
- Las 161 comprobaciones previas siguen en verde: 170 en total, 0 fallos, y las 22 capturas son
  pixel-idénticas al estado anterior al refactor.

## v64: instrucciones de texto libre en todos los flujos de generación y adaptación
- QUÉ RESUELVE: había cosas que ningún ajuste predefinido podía expresar ("el jueves solo tengo
  25 minutos", "añade un día de carrera suave", "hoy me molesta el hombro, cambia los press",
  "esta semana sin saltos"). Ahora hay un campo de texto libre en los tres puntos donde se pide
  un plan, y alimenta tanto la vía offline como la de Claude.
- DÓNDE: tres campos que cubren los seis flujos (cada uno sirve a su versión offline y a la de IA):
  · Perfil → "💬 Instrucciones adicionales": generar/adaptar SEMANA (offline y con Claude).
  · Modal "Modificar sesión": adaptar UNA sesión (offline y con Claude).
  · Modal "Generar sesión IA": crear una sesión suelta (offline y con Claude).
- CON CLAUDE: el texto se inyecta literal en el mensaje, en un bloque marcado como INSTRUCCIONES
  ADICIONALES DEL USUARIO, indicando que tienen PRIORIDAD sobre las preferencias generales y que,
  si algo contradice al resto del mensaje, mande la instrucción libre y lo explique en "meta".
- OFFLINE, CON HONESTIDAD: el generador offline NO interpreta lenguaje natural — hacerlo con
  coincidencia de palabras sería adivinar y fallaría con frases como "no quiero reducir el tiempo".
  En vez de fingirlo, la nota se guarda adjunta a la sesión y se muestra al entrenar (en la vista
  de sesión y en el reproductor guiado), y un aviso bajo el campo lo dice claramente: "el generador
  offline no interpreta texto libre: para que se aplique de verdad, usa el botón de Claude". El
  aviso aparece en vivo mientras se escribe, antes de pulsar nada.
- La nota queda adjunta a la sesión también cuando se aplica la respuesta de Claude, para que quede
  constancia de lo que se pidió, y sobrevive a una adaptación posterior por material si no se
  escribe una nueva.
- Límite de 600 caracteres (cuota de localStorage) y escapado de HTML al mostrarla.
- VERIFICADO: 24 pruebas nuevas (los 3 campos y sus avisos existen; la nota llega al prompt en los
  3 flujos de IA y no se añade la sección si está vacía; se adjunta a la sesión en los 3 flujos
  offline; el aviso menciona que offline no la interpreta y dirige a Claude; se muestra al entrenar;
  se escapa el HTML; se recorta a 600; una nota en blanco se ignora) + comprobación visual real con
  Playwright/Chromium en iPhone 12 mini a tamaño de letra normal y máximo: sin desbordamiento en
  perfil, sesión, modificar, generar y calendario.
- NOTA SOBRE LA VERIFICACIÓN: el entorno de trabajo se reinició durante esta sesión y se perdieron
  los ficheros de test acumulados de v54-v63 (los archivos entregados no se vieron afectados). Se
  reconstruyó `test-core.js`, que cubre los invariantes no negociables: persistencia aditiva con un
  usuario veterano completo (21 campos, incluidos limitaciones, bandas/anclaje, cargas reales,
  dolor/fatiga, rangos de nutrición, weightLog y notas de sesión), arranque de usuario nuevo,
  escapado HTML, la regla de v63 sobre `display:none` y la ausencia de `class` duplicados. Total
  actual: 52 comprobaciones, 0 fallos. Las suites específicas de v55-v63 habrá que rehacerlas si se
  quiere volver a esa cobertura.

## v65: la resistencia de banda se detecta en TODOS los ejercicios, no solo en algunos
- SÍNTOMA REPORTADO: en varios ejercicios propuestos con banda, el reproductor seguía mostrando el
  campo de "kg" (que quedaba vacío) en vez del selector de resistencia, y al registrar la sesión no
  se reflejaba qué banda se había usado. Solo funcionaba en algunos ejercicios.
- CAUSA: `isBandExercise()` (v62) deducía si un ejercicio era de banda SOLO consultando la base de
  ejercicios por nombre exacto. Eso dejaba fuera tres casos, todos frecuentes:
  1. **Ejercicios propuestos por Claude** cuyo nombre no coincide exactamente con ninguna entrada de
     EXDB (p. ej. "Remo sentado con banda elástica"): no se encontraba, el equipo quedaba vacío y no
     se detectaba. Este es el caso más habitual al adaptar la semana con Claude.
  2. **Ejercicios que admiten banda Y otro material** ("Curl de bíceps", "Elevaciones laterales",
     "Elevación frontal"): si el usuario tiene mancuernas además de bandas, se descartaban como
     ejercicio de banda aunque la sesión pidiera explícitamente "banda media".
  3. **Nunca se leía la carga propuesta**, que es la señal más fiable de cómo se va a hacer HOY ese
     ejercicio.
- FIX: `isBandExercise()` ahora prioriza lo que dice LA SESIÓN sobre lo deducido de la base:
  (1) si la carga propuesta menciona banda/goma/elástica → es de banda; (2) si lo dice el nombre →
  es de banda; (3) si no, se mantiene la deducción anterior por EXDB (banda como único material
  compatible disponible). Comparación insensible a tildes y con sinónimos.
- `suggestedBand()` también se amplía: busca la resistencia en la carga, el nombre Y la descripción
  (Claude la escribe donde le encaja) y entiende sinónimos habituales (suave/ligera = baja,
  fuerte/dura = alta), respetando siempre las resistencias que el usuario tiene configuradas.
- NO se rompe lo que ya iba bien: un "Curl de bíceps" propuesto con "12 kg por mancuerna" sigue
  registrándose en kg; los ejercicios de mancuerna nunca se confunden con banda.
- VERIFICADO: 25 pruebas nuevas cubriendo los tres casos que fallaban, los casos de kg que deben
  seguir igual, los ejercicios de banda de la base, la banda sugerida desde carga/nombre/descripción
  y con sinónimos, y la integración completa (reproductor y plantilla de registro). **Control
  positivo: con la lógica anterior fallan 9 de esas pruebas; con el arreglo, 0** — el bug reportado
  queda reproducido y corregido. Verificación en navegador real (Playwright/Chromium, iPhone 12
  mini): "Curl de bíceps · banda media" y "Remo sentado con banda elástica · banda alta" muestran
  ambos el selector de resistencia y ningún campo de kg, y el registro guarda `banda:"media"`.
- Total: 77 comprobaciones (test-core 28, v64 24, v65 25), 0 fallos, sin desbordamiento.

## v66: CORRECCIÓN CRÍTICA — la agenda se desplazaba un día si se usaba la app de madrugada
- SÍNTOMA REPORTADO: todos los registros aparecían movidos un día a la derecha (lo hecho el lunes
  se mostraba en el martes, y así con todos los días).
- CAUSA (bug antiguo, latente desde el principio, no introducido por v64/v65): `fmt()` —la función
  que convierte una fecha en la clave de día que usa toda la app— usaba `toISOString()`, que
  convierte a UTC. Pero `weekDates()` construye fechas LOCALES conservando la hora actual. En
  España (UTC+1 en invierno, UTC+2 en verano), al abrir la app entre las 00:00 y las 01:00/02:00,
  la fecha en UTC es todavía la del día anterior, así que TODAS las claves de la semana retrocedían
  un día y la agenda guardada aparecía una columna a la derecha. Fuera de esa franja horaria
  funcionaba bien, por eso no se había detectado antes.
- REPRODUCIDO Y VERIFICADO EN NAVEGADOR REAL (Playwright/Chromium con `timezoneId:'Europe/Madrid'`
  y el reloj congelado a las 00:30): con el código anterior, una sesión guardada el lunes 2026-07-27
  aparecía bajo la columna "Martes" y "hoy" se calculaba como el día anterior; con el arreglo,
  aparece bajo "Lunes" y "hoy" es correcto.
- FIX: nuevo formateador `ymd(d)` que compone la fecha a partir de los componentes LOCALES
  (`getFullYear`/`getMonth`/`getDate`), más `todayKey()`. `fmt()` pasa a usarlo, y se han convertido
  las 13 apariciones del patrón `toISOString().split('T')[0]` que quedaban en el archivo:
  `inferProgramStart`, `weekKeyOf`, `computeStats`, el parseo de Salud (JSON y XML), los entrenos
  del XML, la fecha de los marcadores manuales, la marca de última importación y el nombre del
  archivo de copia de seguridad. Ya no queda ninguna clave de día generada en UTC, y hay una prueba
  que lo verifica para que no vuelva a colarse.
- TUS DATOS ESTÁN INTACTOS: el fallo era de PRESENTACIÓN, no de guardado. Las sesiones se guardaron
  siempre con la clave del día correcto; lo que fallaba era la fecha con la que se dibujaban las
  columnas del calendario al abrir la app de madrugada. Al actualizar, todo vuelve a verse en su
  día. (Único matiz: una sesión REGISTRADA entre las 00:00 y las 02:00 sí pudo guardarse en el día
  anterior; si ves alguna descolocada, es de esas. No se toca ningún dato automáticamente.)
- VERIFICADO: 20 pruebas nuevas de regresión con reloj y zona horaria simulados (el lunes es el
  lunes a las 09:00, 18:00, 23:50, 00:30 y 01:45; `todayKey` correcto de madrugada; la sesión del
  lunes cae en la columna del lunes a cualquier hora; `weekKeyOf` no retrocede; y ninguna clave se
  genera ya con `toISOString`). **Control positivo: con el código anterior fallan 5 de ellas, con el
  arreglo 0.** El test lleva un guardarraíl que pide ejecutarlo con `TZ=Europe/Madrid`.
- De paso se corrigió el MISMO error en mis propios ficheros de prueba, que calculaban las fechas
  esperadas con `toISOString()` y daban un falso fallo al ejecutarse en horario español de madrugada.
- Total: 97 comprobaciones (core 28, v64 24, v65 25, v66 20), 0 fallos.

## v67: la distribución de días deja de aplicarse retroactivamente a semanas pasadas
- SÍNTOMA REPORTADO: al cambiar la distribución de entrenamientos para la semana siguiente, las
  semanas ANTERIORES se repintaban con esa nueva distribución, como si hubiera sido lo previsto
  entonces. El calendario mostraba días "planificados" que nunca lo estuvieron y lo realizado no
  cuadraba con la previsión real de aquella semana.
- CAUSA: `S.aiDays`/`S.freeDays` son una preferencia ACTUAL, pero se usaban como si fueran
  histórico. En los días sin sesión guardada, el calendario rellenaba el hueco con la distribución
  del perfil, fuese cual fuese la semana que se estuviera mirando. Afectaba a cinco sitios: el
  calendario, el detalle del día, el anillo de cumplimiento, su desglose IA/libres y el cálculo de
  adherencia de Progreso y Nutrición.
- FIX: se guarda una FOTO de la distribución en el momento de generar cada semana
  (`S.weekPlans`, con el lunes como clave), tanto en la vía offline como al aplicar el plan de
  Claude. Al pintar se usa `planForWeek(off)`: la foto de esa semana si existe; si no, solo para la
  semana actual y futuras se usa la del perfil. Para semanas PASADAS sin foto se devuelve `null` y
  no se proyecta nada — es preferible no mostrar previsión a inventar una retroactiva. Ese día se
  muestra como "Sin registro", explicando que la semana es anterior a la planificación actual.
- MIGRACIÓN DE DATOS EXISTENTES: las semanas generadas antes de v67 no tienen foto, así que se
  reconstruye a partir de la propia agenda (los días con sesión guardada SON la previsión real de
  aquella semana). Se ejecuta una sola vez, nunca sobrescribe una foto existente y no borra nada.
- VERIFICADO EN NAVEGADOR REAL (Playwright/Chromium, iPhone 12 mini, TZ Europe/Madrid) con el
  escenario reportado —se entrenó lunes y miércoles, y después se cambió la distribución a M-J-S—:
  · ANTES: martes, jueves y sábado aparecían como "IA planificada" en la semana pasada, el viernes
    (que sí estaba previsto) como descanso, y la adherencia salía 2/5 = 40%.
  · AHORA: solo el viernes figura como previsto no realizado, y la adherencia es 2/3 = 67%.
- VERIFICADO ADEMÁS: 18 pruebas nuevas (la previsión pasada no se contamina, la actual sí usa la
  del perfil, el detalle del día no muestra sesiones fantasma, lo realizado se conserva, adherencia
  correcta por semana, semanas sin datos no generan previsión, y la migración reconstruye desde la
  agenda sin pisar fotos existentes). **Control positivo: con la lógica anterior fallan 11 de esas
  pruebas; con el arreglo, 0.**
- FLUJO DE USO REAL VERIFICADO (test-flujo-domingo.js, 24 comprobaciones): se simula el
  procedimiento habitual —domingo por la tarde, con el entreno del día ya registrado: cambiar la
  vista a la semana siguiente, modificar la distribución, ajustar material y aplicar el plan de
  Claude— confirmando que la SEMANA EN CURSO no se ve afectada: conserva su distribución, sus
  sesiones completadas y su adherencia, no aparecen días "planificados" fantasma con la nueva
  distribución, y las sesiones nuevas se crean todas en la semana siguiente. El mensaje para Claude
  se construye para la semana siguiente.
  IMPORTANTE: el orden importa. La foto se toma de la semana que se está VIENDO, así que hay que
  cambiar la vista a la semana siguiente ANTES de modificar la distribución y generar (que es como
  se hace habitualmente). Generar sin cambiar antes de vista regeneraría la semana en curso con la
  distribución nueva — es lo correcto si eso es lo que se quiere, y la app avisa antes de sustituir
  una sesión ya marcada como completada.
- Total: 139 comprobaciones (core 28, v64 24, v65 25, v66 20, v67 18, flujo domingo 24), 0 fallos.

## v68: el teclado del móvil ya no tapa los campos de registro
- SÍNTOMA REPORTADO: al registrar una serie, intentar corregir las repeticiones reales, el material
  o el peso a veces era imposible porque el teclado del teléfono tapaba esa parte de la pantalla.
- CAUSA: en iOS, al abrir el teclado NO se encoge el viewport de diseño, solo el visible. El
  reproductor y las hojas modales usan `position:fixed` con `inset:0`, así que mantenían el alto de
  la pantalla completa y los campos quedaban por debajo del teclado, fuera de alcance.
- MEDIDO ANTES DEL ARREGLO (Chromium, iPhone 12 mini, teclado de 336px → solo 476px visibles):
  el reproductor seguía midiendo 812px de alto; el campo de repeticiones caía en 455-491px, el de
  peso igual, el botón "Serie completada" en 530-570px y las notas del registro en 642-714px.
  Todos por debajo del límite de 476px, es decir, tapados. Reproducido exactamente.
- FIX 1 — alto real: se publica la altura de la ventana VISIBLE en la variable CSS `--vvh`,
  actualizada con la API `visualViewport` (más `orientationchange` y `resize` como respaldo).
  `.player`, `.sheet-bg` y `.sheet` la usan, así que el contenido siempre cabe por encima del
  teclado. La hoja conserva su aspecto de siempre cuando no hay teclado (`min(88vh, …)`).
- FIX 2 — desplazamiento al foco: al enfocar un campo se comprueba si queda fuera de la zona
  visible y, si es así, se centra automáticamente (con un retardo que espera a que el teclado
  termine de abrirse).
- FIX 3 — zoom automático de iOS (encontrado en la auditoría): iOS amplía la página al enfocar
  cualquier campo con letra menor de 16px, lo que descolocaba la pantalla y agravaba el problema.
  Los campos estaban a 15px; ahora el mínimo efectivo es 16px, respetando la escala de fuente si
  el usuario la tiene mayor (`max(16px, …)`).
- FIX 4 — contenido centrado inalcanzable: `.pl-mid` usaba `justify-content:center`, que al
  encoger el alto desborda por arriba y deja contenido sin poder alcanzarse ni haciendo scroll.
  Cambiado a `safe center` con `min-height:0`, para que sea el contenedor el que haga scroll.
- FIX 5 — cerrar el teclado: los campos de peso/banda y repeticiones del reproductor llevan ahora
  `enterkeyhint="done"` y se cierra el teclado al pulsar Intro, sin tener que tocar fuera.
- VERIFICADO CON TECLADO SIMULADO (mismas condiciones que la medición inicial):
  · alto del reproductor 812px → 476px (se ajusta a lo visible)
  · repeticiones 455-491 → 211-247 · peso 455-491 → 192-228
  · botón "Serie completada" 530-570 → 267-307 · notas del registro 642-714 → 306-378
  · borde inferior de la hoja de registro: 812px → 476px
  · tamaño de campo: 15px → 16px (sin zoom automático)
  Todos los elementos quedan dentro de la zona visible. Comprobado además que sin teclado no hay
  desbordamiento horizontal en calendario, perfil, sesión, registro y reproductor, a tamaño de
  letra normal y máximo.
- Las 139 comprobaciones funcionales previas siguen en verde, 0 fallos.

## v69: la app se quedaba anclada a una versión antigua (y el modo offline nunca funcionó)
- SÍNTOMA REPORTADO: tras subir la v68 a GitHub y reabrir la app, seguía mostrando la v67.
- LOS DATOS NUNCA ESTUVIERON EN RIESGO: viven en `localStorage`, que es independiente de la caché
  de la aplicación. Verificado en la simulación: tras actualizar, perfil, historial y punto de
  partida siguen intactos.
- CAUSA 1 — caché-primero para el HTML: el service worker respondía `caches.match()` antes que la
  red también para `index.html`, así que una vez cacheada una versión podía servirse
  indefinidamente aunque se publicara otra. Reproducido en un servidor local: con el SW antiguo
  activo y la v69 ya publicada, al reabrir seguía mostrando la v68.
- CAUSA 2 (más grave, encontrada al investigar) — NOMBRES DE ICONO QUE NO COINCIDÍAN: el
  repositorio tiene `icon192.png`/`icon512.png` pero `sw.js` y `manifest.json` pedían
  `icon-192.png`/`icon-512.png`. Como `cache.addAll()` rechaza si falla UN solo archivo, la
  instalación del service worker fallaba siempre: **el modo sin conexión nunca llegó a
  funcionar**, y la versión antigua venía de la caché HTTP del navegador y del CDN de GitHub Pages.
  Corregidos los nombres en ambos archivos.
- FIX 1: `sw.js` reescrito. El DOCUMENTO va a la red primero (con respaldo a caché si no hay
  conexión, así que offline sigue igual); el resto de recursos siguen con caché primero. El
  precacheo ahora guarda cada archivo por separado y tolera fallos, de modo que un recurso ausente
  no vuelve a impedir la instalación. Se añade un mensaje `skipWaiting` para activar al momento.
- FIX 2: la app detecta versiones nuevas (`updatefound`, y `reg.update()` al abrir y al volver a
  primer plano, porque iOS suspende la app en vez de cerrarla) y recarga una sola vez cuando el
  service worker nuevo toma el control.
- FIX 3: botón "🔄 Buscar actualización" en Ajustes, junto al número de versión, que comprueba y
  aplica la actualización en el momento e informa de si ya se tiene la última.
- REGRESIÓN PROPIA DETECTADA Y CORREGIDA ANTES DE ENTREGAR: la primera versión del bloque de
  actualización llamaba a `navigator.serviceWorker.addEventListener` sin protección; si eso fallaba
  se interrumpía el arranque de la app (el bloque está antes de `loadProfile()`/`renderCal()`). Lo
  detectaron dos comprobaciones de las suites existentes. Todo el bloque va ahora en `try/catch`:
  un problema con las actualizaciones nunca puede impedir que la app arranque.
- VERIFICADO en un servidor local con el ciclo completo (instalar versión antigua → guardar datos →
  publicar versión nueva → reabrir):
  · Desde v68 (service worker antiguo, caché-primero): 1ª reapertura aún v68, 2ª reapertura v69.
  · Desde v69 en adelante (red-primero): la versión nueva aparece ya en la PRIMERA reapertura.
  · En ambos casos los datos guardados se conservan íntegros.
- 139 comprobaciones funcionales en verde y accesibilidad con el teclado (v68) sin cambios.

## v70: cuatro fallos que rompían funciones visibles (cronómetro ⏱, enlace a Ajustes, icono de iOS)
- ORIGEN: auditoría completa del código. Ninguno de los cuatro afectaba a los datos guardados;
  los tres primeros dejaban muerta una función de la interfaz sin dar ningún aviso al usuario.
- FIX 1 — el botón ⏱ de "Ver sesión" no funcionaba en NINGÚN ejercicio. El atributo se generaba con
  `startTimer(${ex.descanso_seg},${JSON.stringify(ex.nombre)})` dentro de un `onclick="…"`
  delimitado por comillas dobles: las comillas que añade `JSON.stringify` cerraban el atributo
  antes de tiempo y el navegador se quedaba con `startTimer(90,` → error de sintaxis y handler
  nulo. Ahora el nombre se escapa con `esc()` y, si el ejercicio no trae `descanso_seg` (posible
  en un JSON de Claude), el cronómetro cae a 60 s en vez de mostrar `NaN`.
- FIX 2 — el enlace "editar en Ajustes" de las hojas Modificar/Generar lanzaba una excepción.
  Llamaba a `tab('set')`, pero esa pantalla no existe (son `cal`, `sess`, `prog`, `nutri`, `prof`):
  `getElementById('s-set')` devolvía null. Ni navegaba ni cerraba la hoja. Ahora usa `tab('prof')`.
- FIX 3 — código muerto con un botón roto: la hoja `add-bg` ("Añadir actividad libre") quedó
  huérfana al pasar ese flujo a `openLog(key,'add')`, y su botón invocaba `saveAdd()`, una función
  que no existe en todo el archivo. Eliminada la hoja y la llamada a `closeSheet('add-bg')` que
  quedaba en `saveLog()`. Además, `openSheet`/`closeSheet` ya no fallan si el id no existe: un
  panel ausente nunca debe interrumpir un guardado.
- FIX 4 — nombres de icono, otra vez: CORRECCIÓN DE LA v69. En la v69 se dio por hecho que el
  repositorio contenía `icon192.png`/`icon512.png` y se cambiaron `sw.js` y `manifest.json` a esos
  nombres. Es al revés: los archivos del repositorio son `icon-192.png` e `icon-512.png`, con guion
  (comprobado por el usuario en GitHub). Consecuencia: desde la v69 el manifiesto y el precacheo
  apuntaban a dos archivos inexistentes. No rompió el modo sin conexión porque la propia v69 hizo
  el precacheo tolerante a fallos (guarda archivo a archivo), pero sí dejó sin icono la pantalla de
  inicio de iOS y sin iconos el manifiesto. `index.html` era el único de los tres que conservaba el
  nombre correcto. Ahora los TRES archivos usan `icon-192.png`/`icon-512.png`.
- LECCIÓN: el nombre real de los archivos del repositorio es la única fuente de verdad; no debe
  deducirse del contenido de un paquete de entrega. Antes de tocar rutas de recursos, comprobarlas
  en GitHub (o abriendo la URL publicada del archivo).
- VALIDACIÓN: arnés con DOM real (jsdom) sobre el `index.html` entregado — 55 comprobaciones en
  verde, 0 fallos. Incluye:
  · Arranque limpio y arranque con datos de usuario veterano, sin errores de consola.
  · Persistencia: perfil, objetivos, limitaciones, distribución de días, `weekPlans`, agenda,
    cargas serie a serie, historial, nutrición, insight, punto de partida, marcadores y healthLog,
    weightLog, mesociclo, material (mancuernas/bandas/kettlebell/anclaje), fontScale y recientes
    de Spotify — todo idéntico antes y después de subir de versión.
  · Regresión de los fixes de interfaz, incluido un ejercicio con comillas dobles y `<b>` en el
    nombre (JSON hostil de Claude): el ⏱ funciona y el nombre se escapa en el HTML.
  · Coherencia de nombres de icono entre `index.html`, `manifest.json` y `sw.js`.
  · Flujo dominical (avanzar semana + generar offline) sin tocar semanas pasadas, y apertura del
    reproductor guiado.
- CONTRASTE CON v69: el mismo arnés sobre la v69 da 14 fallos, con los dos errores reproducidos en
  consola (`SyntaxError: Unexpected token '}'` al pulsar ⏱ y `TypeError … reading 'classList'` al
  pulsar "editar en Ajustes").
- PENDIENTE (detectado en la auditoría, no incluido aquí): desfase del número de semana del
  programa con el cambio de hora, persistencia incremental de las cargas del reproductor,
  cronómetros por marca de tiempo, orden del historial, escapado del JSON de Claude al aplicarlo.

## v71: cambio de hora, cargas del reproductor a salvo y cronómetros que no se quedan clavados
- ORIGEN: los cinco puntos de integridad que quedaron señalados en la auditoría de la v70. Ninguno
  daba error visible: fallaban en silencio, que es peor.
- FIX 1 — el número de semana del programa se descuadraba con el cambio de hora. `programWeekFor()`
  restaba dos fechas y dividía entre `7*86400000`. La semana del adelanto de marzo dura 167 h
  (167/168 = 0,994 → se contaba una semana DE MENOS, y el desfase se arrastraba hasta octubre) y la
  del retraso dura 169 h (se SALTABA una semana). Reproducido en `TZ=Europe/Madrid` con inicio el
  2026-03-02: los lunes daban 1, 2, 3, 4, **4**, 5, 6. Afectaba a la cabecera, al bloque y semana
  del mesociclo, y al texto "FASE DEL PROGRAMA" que se envía a Claude, que planificaba creyendo que
  se repetía una semana. Ahora hay `daysBetween()`, que normaliza a UTC solo año/mes/día, y una
  diferencia de días de calendario es exacta siempre. Se usa también en los avisos de "hace N días
  que no actualizas los marcadores", que tenían el mismo error de ±1 día en la frontera.
- FIX 2 — cerrar el reproductor a media sesión perdía todas las cargas anotadas. `P.setLog` vivía
  solo en memoria hasta `finishSession()`: si iOS purgaba la app durante un descanso largo, o se
  pulsaba ✕, se iban los kg×reps de toda la sesión sin ningún aviso. Ahora `persistSetLog()` vuelca
  lo registrado en la agenda EN CUANTO se anota cada serie, al terminar un bloque, al cerrar el
  reproductor y al pasar la app a segundo plano. Los resultados de los bloques AMRAP/EMOM/circuito
  se guardan igual.
- FIX 3 — los cronómetros se quedaban clavados al salir de la app. Contaban restando 1 por tick de
  `setInterval`; iOS estrangula los timers en segundo plano y los detiene con la pantalla bloqueada,
  así que un descanso de 2 min podía mostrar 1:40 después de tres minutos reales. Descanso, trabajo
  por tiempo, bloques y el cronómetro suelto del botón ⏱ se anclan ahora al reloj del sistema
  (instante de fin + recálculo en cada tick, cada 250 ms): volver a la app corrige el tiempo al
  momento. Los pitidos solo suenan en los segundos por los que se pasa de verdad, así que una
  suspensión larga no encadena avisos atrasados. La pausa de los bloques congela el tiempo restante
  y al reanudar recalcula el fin.
- FIX 4 — descanso infinito con un JSON incompleto. Si Claude omitía `descanso_seg`, `P.sec` quedaba
  en `undefined`: el cronómetro mostraba `NaN:NaN` y, como `NaN` nunca es `<=0`, el descanso no
  terminaba nunca (solo se salía con "Saltar descanso"). Ahora el reproductor cae a 60 s, `fmtSec()`
  protege valores inválidos y el validador del puente lo señala como AVISO (no bloquea: el plan es
  aplicable, solo se advierte del valor que se usará).
- FIX 5 — el historial dejaba de estar ordenado. `saveLog()` insertaba con `unshift`, así que
  registrar un día pasado lo colocaba el primero. El prompt de Claude asume "más reciente primero" y
  recorta a 38 entradas: un registro atrasado podía desplazar fuera sesiones recientes de verdad.
  Ahora se reordena por fecha tras cada registro (orden estable: varias sesiones del mismo día
  conservan el orden en que se anotaron).
- FIX 6 — los datos ilegibles ya no se destruyen. Si `localStorage` no se podía leer, `load()`
  devolvía `{}` y el primer `save()` lo sobrescribía: siendo la única copia que existe, un simple
  truncamiento se volvía irrecuperable. Ahora el contenido crudo se aparta bajo
  `fitcoach-danado-AAAA-MM-DD`, el aviso al usuario dice dónde ha quedado, y un guardado posterior
  nunca lo pisa. También se trata como dañado un JSON válido que no sea un objeto.
- VALIDACIÓN: arnés con DOM real (jsdom) — 91 comprobaciones en verde, 0 fallos. Sobre las 58 de la
  v70 (arranque, persistencia campo a campo del usuario veterano y regresiones de interfaz) se
  añaden: semanas del programa y bloques del mesociclo en las dos semanas de cambio de hora,
  `daysBetween` con entradas inválidas y negativas, serie anotada que llega a `localStorage` sin
  terminar la sesión, cierre del reproductor a media sesión, plantilla de registro con la carga
  real, instante de fin del descanso, recuperación tras simular una suspensión de iOS, caída a 60 s
  sin `descanso_seg`, pausa/reanudación del cronómetro suelto, aviso del validador, orden del
  historial tras registrar un día pasado y copia del almacenamiento dañado.
- EJECUTADO ADEMÁS en UTC, America/New_York, America/Santiago (hemisferio sur), Australia/Sydney y
  Atlantic/Canary: 91/91 en todas.
- CONTRASTE CON v70: el mismo arnés sobre la v70 da 25 fallos, incluida la secuencia de semanas
  1, 2, 3, 4, **4**, 5, 6 y el descanso que no se recupera tras la suspensión.
- PENDIENTE (auditoría, para más adelante): sanear el JSON de Claude al aplicarlo (v72), rendimiento
  del historial y del import XML, división de Perfil/Ajustes y accesibilidad de los elementos
  pulsables (v73).

## v72: el JSON pegado desde Claude deja de poder deformar la app
- ORIGEN: la auditoría de la v70 detectó que el contenido del puente (títulos, nombres de ejercicio,
  descripciones, enfoque del mesociclo, menú) se guardaba tal cual y luego se inyectaba con
  `innerHTML` SIN escapar en el calendario, la ficha del día, el reproductor, la vista de bloques,
  el resumen final y el enfoque del mesociclo. `showSess`, la vista previa del puente y nutrición sí
  escapaban; el resto no. Comprobado sobre la v71 con un JSON hostil: el `<img src=x onerror=…>`
  llegaba al DOM como elemento real y creaba atributos de evento.
- DECISIÓN, distinta a la que quedó apuntada en la v71: NO se retira el escapado de las vistas que
  ya lo hacían. Escapar al pintar es la capa correcta —es donde el texto se convierte en HTML— y es
  la única que protege también lo ya guardado de versiones anteriores. Guardar el texto ya escapado
  habría sido peor: los mismos campos alimentan el prompt de Claude, las plantillas de notas y las
  copias exportadas, y ahí aparecerían `&amp;` y `&lt;` en vez de texto legible.
- CAPA 1, al pintar: `esc()` en TODOS los puntos que faltaban (ficha del día, las tres vistas del
  reproductor, lista de movimientos de bloque, resumen final, enfoque del mesociclo, opción del
  buscador de ejercicios). Los datos dentro de atributos `onclick` (listas de Spotify) pasan al
  patrón seguro estrenado en la v70: `esc(JSON.stringify(...))`, que sobrevive a comillas simples y
  dobles en el texto.
- CAPA 2, al entrar: todo lo que llega por el puente pasa por `cleanStr`/`cleanMulti`/`cleanInt`
  antes de guardarse. Quita caracteres de control, colapsa espacios, acota longitudes (título 90,
  nombre 120, descripción 600, análisis 2000), convierte a número lo que debe serlo y acota rangos
  imposibles (`duracion_min` a 90, `rondas` a 30, `series` a 20, hasta 25 ejercicios y 20
  movimientos por bloque). `descanso_seg` queda en 60 cuando no viene, que es el valor del que ya
  avisa el validador antes de aplicar: explícito en el dato en vez de implícito en el reproductor.
  Los bloques AMRAP/EMOM/circuito quedan exentos de `series` y `descanso_seg`, que no les aplican.
- LO QUE NO HACE EL SANEADO, a propósito: no toca el contenido legítimo. No elimina `<` ni `>` del
  texto, así que un nombre con símbolos raros se guarda tal cual y se ve tal cual; lo que cambia es
  que al pintarse ya no puede ser HTML. Un ejercicio llamado `Press " onmouseover="x` se guarda
  íntegro, se muestra íntegro y llega íntegro al prompt.
- VALIDACIÓN: 118 comprobaciones en verde, 0 fallos, con un JSON deliberadamente hostil (marcador
  `<img src=x onerror=…>` en título, meta, nombre, descripción, plato, enfoque y análisis; nombre
  con comillas dobles pensado para romper un atributo; 30 movimientos; duración 999; ejercicio sin
  series ni descanso; título y nombre de 400 caracteres). Se comprueba que el texto se guarda tal
  cual, que ninguna vista crea elementos ni atributos de evento a partir de él, que sí aparece
  escapado (`&lt;img`), que no se ejecuta nada, y que la plantilla de notas y el prompt lo reciben
  como texto plano sin entidades HTML. Ejecutado en Madrid, UTC, Nueva York, Santiago, Sídney y
  Auckland: 118/118 en todas.
- CONTRASTE CON v71: el mismo arnés sobre la v71 da 16 fallos, entre ellos "el reproductor inyecta
  el HTML pegado" y "la ficha del día crea atributos de evento a partir del texto pegado".
- PENDIENTE (auditoría): rendimiento del historial y del import XML de Salud, división de
  Perfil/Ajustes, accesibilidad de los elementos pulsables y controles de retroceso en el
  reproductor (v73).

## v73: los datos dejan de depender solo de Safari, y rendimiento y accesibilidad
- ORIGEN: petición explícita (evitar perder datos si se reinicia el móvil o se borra el historial de
  Safari) más los puntos de rendimiento y accesibilidad que quedaban de la auditoría de la v70.

### Durabilidad: tres capas, y decir la verdad sobre cada una
- CAPA 1 · Espejo en IndexedDB. Cada guardado replica el estado completo en IndexedDB con 1,5 s de
  retardo (guardar una serie no debe costar dos escrituras). Sobrevive a reiniciar el móvil, a
  cerrar la app y a que Safari descarte localStorage por falta de espacio. Al arrancar, si el
  almacenamiento está vacío o ilegible, la app busca el espejo y OFRECE restaurarlo indicando fecha,
  número de sesiones y de días planificados; no restaura por su cuenta, porque escribir encima de
  datos buenos sería peor que no hacer nada.
  LÍMITE HONESTO: «Borrar historial y datos de sitios web» de Safari borra localStorage E IndexedDB.
  Esta capa no protege de eso, y la interfaz lo dice con esas palabras.
- CAPA 2 · Copia a archivo por la hoja de compartir. `exportData()` usa ahora `navigator.share` con
  el archivo adjunto: en iOS aparece «Guardar en Archivos» → iCloud Drive, en vez de una descarga
  que acaba escondida en Descargas de Safari. Si el navegador no admite compartir archivos, se cae a
  la descarga de siempre. Es la única capa que sobrevive a formatear o cambiar de móvil.
  Se registra la fecha de la última copia y la tarjeta «Mis datos» avisa: nunca / hace N días /
  aviso en ámbar a partir de 14 días.
- CAPA 3 · Gist SECRETO de GitHub, opcional y apagada por defecto. Sube `fitcoach-backup.json` a un
  gist de la cuenta del usuario; permite recuperar todo en un móvil nuevo sin manejar archivos.
  POR QUÉ UN GIST Y NO EL REPOSITORIO DE LA APP: el repositorio de GitHub Pages es público, así que
  subir ahí el historial dejaría peso, marcadores de salud y lesiones a la vista de cualquiera. Se
  descartó por eso, no por dificultad.
  Advertencias que se muestran en la propia pantalla: secreto no es privado (quien tenga la URL lee
  el gist); el token vive solo en este dispositivo y debe crearse con el permiso «gist» y nada más;
  si no se activa, la app no hace NINGUNA conexión a internet con los datos.
  Detalles: el gist se crea con `public:false` (comprobado en las pruebas); si el gist se borró en
  GitHub (404) se crea otro automáticamente; restaurar desde la nube conserva la conexión y pasa lo
  descargado por `initState()`; la subida automática opcional se dispara al registrar una sesión con
  un freno de una subida cada 10 minutos como mucho; cualquier fallo de red deja los datos locales
  intactos y lo dice.

### Rendimiento
- El historial se pintaba ENTERO en cada `renderProg()`, y renderProg se llama al registrar, al
  marcar como no realizada, al deshacer… Ahora se pintan las 50 últimas con un botón para ampliar
  de 50 en 50.
- Pintar la pestaña Progreso escribía en localStorage cada vez (los logros se guardaban en cada
  render). Ahora solo escribe si la lista de logros ha cambiado de verdad.
- Import de Salud: si el XML pesa más de 25 MB se avisa antes de intentarlo, porque Safari lo lee
  entero en memoria y lo más probable es que la app se cierre; se recomienda el JSON. Además el
  lector de archivos ya informa si falla en vez de quedarse callado.

### Accesibilidad
- Se recupera el zoom con dos dedos: fuera `maximum-scale=1, user-scalable=no`. Los campos ya usan
  16 px como mínimo, así que iOS no hará zoom automático al enfocarlos.
- Los elementos pulsables que no son botones (chips, días del calendario, botones de esfuerzo,
  fatiga y dolor) reciben `role="button"` y `tabindex`, y se activan con Enter o Espacio. Como se
  generan en decenas de plantillas, se marcan al vuelo con un MutationObserver; incluye los que
  reciben el manejador por propiedad (`el.onclick=…`) y no como atributo, que era el caso de los
  días del calendario.

- VALIDACIÓN: 159 comprobaciones en verde, 0 fallos. Sobre las 118 de la v72 se añaden: escritura y
  lectura del espejo (con IndexedDB real de pruebas), rescate completo tras perder localStorage,
  exportación por hoja de compartir con nombre de archivo y registro de fecha, los tres estados del
  aviso de copia, ausencia total de tráfico de red con la nube desactivada, creación del gist como
  secreto y con el token correcto, reutilización del mismo gist en subidas sucesivas, token
  inválido, caída de red, restauración desde la nube conservando la conexión, tope de 50 sesiones
  del historial y su ampliación, ausencia de escrituras al pintar Progreso, viewport sin bloqueo de
  zoom y activación por teclado de un elemento pulsable. Ejecutado en Madrid, UTC, Nueva York y
  Sídney.
- FALLO DETECTADO POR EL ARNÉS DURANTE EL DESARROLLO: la comprobación de arranque vacío leía
  `S.history.length` ANTES de `initState()`, lo que rompía la app en una instalación nueva. Estaba
  en el código entregado hasta que el arnés lo cazó.
- PENDIENTE: división de Perfil en dos pestañas, controles de retroceso/salto de ejercicio en el
  reproductor y revisión de los 214 estilos en línea.

## v74: se cierra la auditoría — Perfil/Ajustes, navegación en la sesión guiada y restos
- ORIGEN: los puntos que quedaban abiertos de la auditoría de la v70.
- DIVISIÓN PERFIL / AJUSTES. Perfil era un scroll de 15 tarjetas que mezclaba lo que se toca cada
  semana (datos, objetivos, limitaciones, estructura, material, instrucciones, generar, mesociclo)
  con lo que se toca una vez al año (base científica, importar Salud, tipografía, sonido, copias,
  versión). Se parte en dos pantallas: **Perfil** describe al usuario y su plan; **Ajustes**
  configura la app. Los identificadores de los campos NO cambian, así que todo el JavaScript que
  los usa sigue funcionando; se comprueba en el arnés. La barra pasa a seis pestañas, con las
  etiquetas a 9,5 px y sin partirse en dos líneas. `tab('set')` existe por fin (era el destino roto
  que se corrigió en la v70) y al entrar refresca el aviso de copia de seguridad. Corregidos dos
  textos que ahora mentían: el enlace del material y el aviso de limitaciones decían «en Ajustes» y
  ambas cosas viven en Perfil.
- NAVEGACIÓN EN LA SESIÓN GUIADA. La sesión solo iba hacia delante: si te equivocabas de ejercicio o
  querías saltarte uno (una molestia, el material ocupado), la única salida era cerrar el
  reproductor. Ahora hay «◀ Anterior» y «Saltar ▶» en la pantalla de preparado y durante el
  descanso. Retroceder es seguro: las series anotadas se conservan y se siguen guardando en la
  agenda. Saltar pide confirmación —avisando si no se ha anotado ninguna serie— y saltar el último
  ejercicio termina la sesión. Cualquier cuenta atrás en curso se detiene al navegar.
- CERRAR A MEDIA SESIÓN. Desde la v71 no se pierde nada al salir, pero el usuario no lo sabía: ahora
  se avisa de cuántas series quedan guardadas antes de salir. La pantalla de fin no pregunta nada.
- CARGAS QUE SE PERDÍAN AL REGENERAR UN DÍA. Aplicar un plan nuevo sobre un día que ya tenía cargas
  anotadas construía la entrada desde cero y esas cargas desaparecían sin avisar. Ahora se arrastran
  (`conservarRegistro`) en los cuatro sitios que sustituyen una sesión: puente, generador offline,
  modificar y generar día. Son un dato del usuario, no del plan.
- UNA SOLA DEFINICIÓN DE ADHERENCIA. El anillo de la portada contaba SESIONES y la pestaña Progreso
  contaba DÍAS: para la misma semana podían verse dos porcentajes distintos sin que nada estuviera
  roto. Se unifica en `weekStats()` con el criterio por sesiones, que es el más fino. AVISO: el
  porcentaje de Progreso puede cambiar respecto a la v73; el nuevo es el coherente con el anillo.
  También se unifica la regla para deduplicar las sesiones de un día (`sesionesDelDia`), que estaba
  escrita literalmente dos veces.
- CÓDIGO MUERTO Y RESTOS: eliminadas `appendInsight()` (huérfana desde la v67) y `patternOf()`
  (sustituida por `patFromName()` en la v58); fuera el `DAYS.indexOf(DAYS[x])` que solo se devolvía
  a sí mismo; anotados los `catch` vacíos que quedaban explicando por qué se ignora el error;
  unificada la cabecera «Utilidades de refactor», que estaba repetida tres veces en el CSS.
- ESTILOS EN LÍNEA: las cinco declaraciones que se repetían 3 o más veces pasan a clase, con el
  texto de la declaración idéntico y verificado en el arnés. **El resto NO se toca, y es una
  decisión, no un olvido:** son estilos irrepetibles (posiciones, anchos y colores de un solo uso) y
  convertirlos en masa exige regresión visual con Playwright, que la convención del proyecto pide y
  que no puede ejecutarse en este entorno. Cambiar riesgo por estética sería mal negocio.
- CONTEXTO-DESARROLLO.md REGENERADO: decía «versión actual: v54», citaba `icon-192.png` como error
  cuando es el nombre correcto y remitía a un changelog «v17 → v40». Ahora está al día e incluye las
  reglas nuevas (fechas con `daysBetween`, escapado al pintar, la excepción de red de la v73) y dos
  trampas del proceso.
- VALIDACIÓN: 201 comprobaciones en verde, 0 fallos, en Madrid, UTC, Santiago y Sídney. Sobre las
  159 de la v73 se añaden: existencia y contenido de las dos pantallas sin tarjetas duplicadas,
  navegación entre pestañas y refresco del aviso de copia, que ningún render pierde su hueco tras
  mover las tarjetas, «Anterior» desactivado en el primer ejercicio, salto que conserva lo anotado y
  detiene la cuenta atrás, retroceso, fin de sesión al saltar el último, conservación de cargas al
  aplicar un plan nuevo sobre un día con registro, coincidencia entre el anillo y Progreso,
  deduplicación de sesiones, ausencia de las funciones muertas y equivalencia exacta de las cinco
  clases nuevas con el estilo en línea que sustituyen.
- FALLOS PROPIOS DETECTADOS POR EL ARNÉS ANTES DE ENTREGAR: (1) al unificar el cálculo de adherencia
  quedaron referencias a variables que ya no existían dentro de `renderTodayHero`, que rompía el
  calendario entero; (2) dos scripts de parcheo abortaron a mitad y dejaron llamadas a funciones que
  no llegaron a escribirse (`navEjercicios`, `conservarRegistro`). Ambos casos se cazaron en la
  validación, no en el móvil.

## v75: de generador de ejercicios a entrenador — comparar, contar, estimar y recordar
- ORIGEN: auditoría de CONTENIDO (no de código). Diagnóstico: la app MEDÍA bien y PRESCRIBÍA bien,
  pero no COMPARABA. Faltaba el eslabón central del oficio: prescribir → medir → contrastar →
  ajustar → explicar.

### 1 · Prescrito frente a realizado (el eslabón que faltaba)
Se guardaba lo pautado en `schedule[dia].exercises` y lo hecho en `.sets`, y no se cruzaban nunca:
Claude recibía «16 kg × 10» sin saber si el encargo eran 3×8-12 a 16 kg o 4×6 a 20, así que su
propia regla estrella («si alcanzó el tope del rango, sube un escalón») era inaplicable. Ahora el
prompt lleva, ejercicio a ejercicio y de las últimas 3 semanas, lo pautado, lo realizado y un
veredicto: *tope del rango en todas las series → subir*, *series incompletas*, *por debajo del
rango → mantener o bajar*, *sin registrar*.

### 2 · Volumen semanal por grupo muscular
La magnitud que gobierna la hipertrofia no se contaba en ningún sitio: el prompt afirmaba «~10+
series por grupo» sin que nadie contase una serie. Nuevo cálculo (`weeklyVolumeByGroup`) que usa las
series REALIZADAS cuando existen y las pautadas cuando no, con tarjeta propia en Progreso —los
grupos por debajo de 10 salen en ámbar— y dos semanas de volumen en el prompt. Los grupos se
deducen de la ficha de EXDB y, para lo que devuelve Claude, del campo `musculos`; si no hay nada
reconocible se cae al patrón. **Es una estimación con recuento total** (cada serie cuenta para todos
los grupos implicados) y así se declara en la propia tarjeta.

### 3 · Fuerza estimada (1RM de Epley)
El prompt hablaba de «≥80% 1RM» sin que existiera ningún 1RM: decorativo. Ahora se estima con Epley
sobre las series reales (solo hasta 12 repeticiones, porque por encima el error crece), con gráfica
propia bajo la de carga y resumen en el prompt. Es la métrica que de verdad refleja progreso: 20 kg
× 10 es más fuerza que 22 kg × 4, y el «kg máximo» no lo distingue.

### 4 · Progresión de carga REAL en el motor offline
`pesoHintFor()` devolvía siempre «elige la mancuerna que te deje RIR 1-3», ignorando el historial:
una semana generada offline en el mes 6 era, en carga, idéntica a la del mes 1. Ahora aplica doble
progresión sobre lo último registrado y propone kilos concretos: «18 kg por mancuerna — subes desde
16: la última vez completaste el tope del rango en todas las series», o mantiene y explica por qué.
Avisa además cuando ya se ha llegado a la mancuerna más pesada disponible.

### 5 · Cardio de verdad (adelantado desde la v77)
- **Zonas de pulso** por reserva de frecuencia cardiaca (Karvonen) con FCmáx estimada por la fórmula
  de Tanaka (208 − 0,7 × edad, más precisa en adultos que 220 − edad). Tarjeta en Progreso y cifras
  concretas en el prompt, para que «Z2» deje de ser una etiqueta y sea un rango de pulsaciones.
  Se declara como ESTIMACIÓN: sin prueba de esfuerzo la FCmáx real puede desviarse ±10 lpm.
- **Volumen semanal**: km, minutos y ritmo medio, comparados con la semana anterior, con aviso
  cuando la subida supera el 10% semanal. El ritmo se calcula solo con las sesiones que tienen
  distancia, para que un paseo sin km no falsee el min/km de la semana.

### 6 · Memoria y matices del entrenador (adelantado desde la v76)
- **Memoria**: cada plan aplicado guarda enfoque, justificación y análisis (`coachLog`, últimas 10,
  una por semana). Las cuatro últimas van en el prompt para que haya continuidad de criterio y para
  que Claude tenga que justificarse si se desvía de lo que él mismo decidió.
- **Fatiga**: `recentFatigueTrend()` miraba las 3 últimas sesiones SIN ventana temporal —podían ser
  de hace un mes— y devolvía sí/no. Sustituida por `fatigueLevel()`: ventana de 14 días, puntuación
  proporcional al número de sesiones y tres niveles con respuestas distintas (normal / moderada:
  mantener volumen sin apretar / alta: una serie menos y más margen al fallo).
- **Agujetas frente a molestia articular**: el registro ahora pregunta el tipo. Las agujetas se
  anotan como contexto y NO retiran ejercicios; solo lo articular o punzante activa la protección de
  14 días. Los registros anteriores a la v75, que no traen tipo, se tratan como articulares (lado
  prudente). El prompt distingue ambos casos.
- **Días de fuerza breve**: el prompt pedía a Claude priorizar tren superior el día que hay carrera,
  y el motor offline hacía justo lo contrario, porque su orden de patrones empieza por «pierna» en
  todas las sesiones. Corregido usando el parámetro `lead`, que estaba implementado desde la v50 y
  no usaba nadie, más exclusión de la pierna pesada esos días.
- **Volumen que progresa dentro del bloque**: `mesoInfo()` sabía en qué semana del mesociclo estás y
  el motor offline no lo miraba. En la última semana del bloque añade una serie.

### 7 · Citas verificadas una a una contra su DOI
Se comprobaron las tres que quedaban pendientes. **Las cuatro existen y los datos son correctos**;
se añaden volumen, páginas y DOI tanto al prompt como a la ficha de Ajustes:
- ACSM 2026 Position Stand — Med Sci Sports Exerc 58(4):851-872, DOI 10.1249/MSS.0000000000003897.
- Robinson et al. 2024 — Sports Med 54(9):2209-2231, DOI 10.1007/s40279-024-02069-2.
- Pelland et al. — Sports Med 56(2):481-505, en línea 4-12-2025, DOI 10.1007/s40279-025-02344-w.
- Morton et al. 2018 — Br J Sports Med 52(6):376-384, DOI 10.1136/bjsports-2017-097608.

Tres afirmaciones se corrigen a la luz de lo que dicen de verdad esas fuentes:
- Robinson: la hipertrofia mejora cuanto más cerca del fallo, pero **la fuerza apenas se ve afectada
  por la proximidad al fallo**. El prompt lo aprovecha: en trabajo de fuerza se puede dejar más
  margen (RIR 3-4) sin perder resultado y ahorrando fatiga.
- Pelland: **manda el volumen**; la frecuencia importa sobre todo como forma de repartirlo. Se retira
  el «cada grupo ≥2 veces por semana» como regla rígida.
- Morton: el punto donde deja de aumentar la masa magra es **~1,62 g/kg/día** (IC 1,03-2,20); el
  1,6-2,2 se explica como lo que es, un rango con margen, no como una horquilla arbitraria.
- Y «≥80% 1RM» pasa a presentarse como referencia orientativa, no como umbral, que es lo que
  sostiene el propio ACSM 2026.

- VALIDACIÓN: 265 comprobaciones en verde, 0 fallos, en Madrid, UTC, Santiago y Sídney. Las 64
  nuevas cubren: reconocimiento de grupos musculares (ficha, texto libre de Claude y caída al
  patrón), volumen con series reales frente a pautadas, Epley y sus límites, detección de tope de
  rango / series incompletas / por debajo de rango / sin dato, km-minutos-ritmo, Karvonen y Tanaka
  con y sin FC en reposo, los tres niveles de fatiga y su ventana de 14 días, registro y sustitución
  de la memoria del entrenador, presencia de todas las secciones y de los cuatro DOI en el prompt,
  progresión offline en sus cuatro casos, días breves sin pierna pesada, agujetas frente a molestia
  articular (incluidos registros antiguos) y pintado de las dos tarjetas nuevas.
- FALLOS PROPIOS QUE CAZÓ EL ARNÉS: el press no sumaba volumen al tríceps porque la ficha solo
  nombra el músculo principal; el ritmo medio salía a 15:00/km porque incluía los minutos de un
  paseo sin distancia; y el umbral de fatiga era absoluto, de modo que dos sesiones duras de dos no
  puntuaban igual que dos de seis.
- TAMAÑO DEL PROMPT: ~13-15.000 caracteres con datos reales (unos 3.500-3.800 tokens). Sigue siendo
  cómodo de pegar.
- PENDIENTE: nutrición (factor de actividad derivado de datos reales en vez de 1,55 fijo, alergias e
  intolerancias, revisión de 2-3 semanas con ajuste concreto de calorías) y redistribución de la
  semana cuando se pierden sesiones.

## v76: corregir repeticiones sin pelearse con el teclado, y bloques metabólicos con reloj
- ORIGEN: dos fallos detectados usando la app de verdad en el iPhone.

### 1 · Registrar repeticiones era un suplicio
SÍNTOMA: al tocar el campo de repeticiones para corregirlo, lo que saltaba a primer plano era la
explicación general del ejercicio y el bloque de registro se iba de la pantalla; había que buscar a
ciegas dónde escribir.
CAUSA: dos cosas a la vez. (a) El bloque de registro estaba colocado DETRÁS de la nota de la
sesión, la descripción técnica y los avisos, así que en cuanto el teclado recortaba la altura
visible quedaba fuera de la vista. (b) La rutina que desplaza el campo enfocado hasta ponerlo a la
vista se ejecutaba UNA sola vez, a los 320 ms; en iOS el teclado tarda más en asentarse y, sobre
todo, cada cambio de `--vvh` vuelve a maquetar el reproductor y deshace ese desplazamiento.
ARREGLO:
- **Botones − / + en kilos y repeticiones**, que es el arreglo de fondo: entre serie y serie, con
  las manos ocupadas, se corrige de un toque y sin abrir el teclado. El escalón de los kilos es el
  de tu mancuernería real (2 kg, 2,5 kg…), no un incremento inventado. No bajan de cero.
- El bloque de registro **sube justo debajo del objetivo de la serie**; la técnica, la nota y los
  avisos pasan debajo del botón, que es donde corresponde a un texto de consulta.
- La comprobación de visibilidad se reintenta a 120, 320, 600 y 900 ms **y en cada recolocación del
  viewport** mientras el campo siga enfocado.

### 2 · Los circuitos metabólicos no tenían reloj ni descanso
SÍNTOMA: un circuito no mostraba tiempo, y al dar por terminado el bloque no aparecía el descanso
previsto ni cuenta atrás alguna.
CAUSA: el reloj solo se pintaba y solo se ponía en marcha para AMRAP y EMOM. Y `endBlock()` iba a
una pantalla de «Continuar» sin más: el descanso solo empezaba DESPUÉS de pulsarla, y ni siquiera
eso si el ejercicio siguiente era otro bloque.
ARREGLO:
- **Cronómetro para el circuito**, contando hacia ARRIBA: AMRAP y EMOM van contra un tiempo fijo, el
  circuito va contra un número de rondas, así que lo que importa es el tiempo empleado. Anclado al
  reloj del sistema como el resto desde la v71, de modo que salir de la app no lo congela. Ese
  tiempo pasa al resumen del bloque («3 de 3 rondas en 08:42»), que ya se guarda con la sesión.
- **Pausa también en circuito** (antes solo AMRAP/EMOM), congelando el tiempo transcurrido.
- Al cerrar el bloque, **el descanso pautado se muestra y corre solo**, con su cuenta atrás; al
  agotarse encadena con el ejercicio siguiente. Si la sesión no traía `descanso_seg`, usa 60 s y lo
  dice explícitamente en vez de fingir que estaba prescrito. El botón pasa a ser «Saltar descanso».
- `advanceAfter()` recibe si el descanso ya se ha consumido, para no encadenar dos seguidos.

- VALIDACIÓN: 300 comprobaciones en verde, 0 fallos, en Madrid, UTC y Sídney. Las 35 nuevas cubren:
  orden del bloque de registro frente a la explicación y al botón, los cuatro botones ±, subida y
  bajada de repeticiones y de kilos con el escalón real, tope en cero, que lo ajustado con ± es
  exactamente lo que se registra, cronómetro ascendente del circuito y su anclaje al reloj, pausa
  que congela de verdad, cierre del bloque con descanso pautado visible y corriendo, encadenado
  automático sin descanso doble, y caída a 60 s avisada cuando el JSON no trae descanso.
- CONTRASTE CON v75: el mismo arnés sobre la v75 falla en cuanto busca los botones ± (no existen) y
  se detiene ahí.

## v77: el fondo deja de moverse detrás de los paneles, y una sola puerta para generar la semana
- ORIGEN: uso real en el iPhone (el fondo que se desplaza detrás del panel de registro) y una
  pregunta del usuario que destapó un problema de diseño: nadie podía saber en qué se diferenciaban
  los dos botones de generar semana.

### 1 · El fondo se movía detrás del panel
SÍNTOMA: al abrir «Añadir actividad» y tocar un campo, el panel se encoge para dejar sitio al
teclado y hay que desplazarse dentro de él; pero la pantalla de debajo TAMBIÉN se movía, el panel
parecía flotar y se perdía la referencia de qué se estaba tocando.
CAUSA: no había bloqueo del fondo. En iOS, cuando el desplazamiento dentro de un panel llega a su
tope, el gesto «se escapa» al documento de debajo y lo arrastra.
ARREGLO: mientras haya un panel o el reproductor abiertos, `<body>` se fija en su posición actual
(`body.modal-abierto`) y se restituye el desplazamiento exacto al cerrar —fijarlo sin guardar la
posición habría devuelto al usuario al principio de la página—. El bloqueo se levanta solo cuando
se cierra el ÚLTIMO panel, no el primero. Además: `touch-action` acotado (el fondo no acepta
gestos, el panel solo vertical), `overscroll-behavior:contain` también en el fondo, y el velo pasa
de 55% a 72% con desenfoque, para que se vea de un vistazo qué capa está activa.

### 2 · Dos botones que hacían casi lo mismo
DIAGNÓSTICO: «Adaptar próxima semana» (Progreso) enviaba historial, cumplimiento, cargas reales y
reglas de progresión. «Generar con Claude» (Perfil) enviaba el MISMO prompt sin nada de eso: era el
plan inicial para quien todavía no ha registrado nada. Elegir el segundo por error significaba
pedirle a Claude que planificara a ciegas teniendo los datos delante, y nada en la interfaz lo
advertía.
ARREGLO: una sola acción, `openWeekBridge()`, en los tres sitios (Progreso, Perfil y el acceso
directo de la portada). Decide sola: si hay historial o punto de partida, adapta; si no hay
absolutamente nada, genera el plan inicial. Y antes de abrir el puente, si estás sobre la semana en
curso, ofrece saltar a la próxima, que es lo que se quiere casi siempre. El generador sin conexión
sigue donde estaba, ahora etiquetado como lo que es: el recambio para cuando no puedas usar Claude.

### 3 · Marcadores de Salud: trayectoria en vez de foto fija
Se enviaba el último valor y la diferencia contra el mes anterior. Un salto aislado dice poco. Ahora
va la serie completa guardada (hasta 6 medias mensuales) de FC en reposo, HRV, VO2max, % de grasa,
pasos y sueño —datos que ya estaban en `healthLog` sin usarse—, más la serie de peso corporal con su
variación total y el intervalo de días. La interpretación se reescribe para encuadrarlos contra la
línea de base propia y no contra valores absolutos, y **se advierte explícitamente de su límite**:
son medias mensuales, una señal lenta y de trazo grueso para decidir una semana concreta, que debe
leerse junto a la fatiga y el esfuerzo registrados, que son información mucho más fresca.

- VALIDACIÓN: 327 comprobaciones en verde, 0 fallos, en Madrid, UTC y Sídney. Las 27 nuevas cubren:
  congelado y descongelado del fondo con una hoja, con dos encadenadas, con el reproductor y al
  cerrar tocando fuera; restitución exacta de la posición; presencia de un único botón en Progreso y
  en Perfil y ausencia de los dos antiguos; elección automática de modo con y sin historial; salto a
  la semana próxima desde la semana en curso; bloqueo si faltan los datos básicos del perfil; y
  envío de la trayectoria de marcadores, de la serie de peso con su variación, de la advertencia
  sobre las medias mensuales, y que una sola medición no fabrique una trayectoria inexistente.
- CONTRASTE CON v76: el mismo arnés sobre la v76 falla en el congelado del fondo, en el botón único
  y en la trayectoria de marcadores.

## v78: con el teclado abierto solo existe una capa
- ORIGEN: seguía sin ser fino. Con el panel de actividad nueva abierto y el teclado desplegado
  asomaba una franja de la pantalla anterior justo encima del teclado, y al tocar ahí se desplazaba
  ESA pantalla en vez del panel. Además el desplazamiento dentro del panel daba tirones al escribir.
- CAUSA 1 (la franja): los overlays se anclaban en `top:0` de la ventana de DISEÑO. En iOS el
  teclado no encoge esa ventana: encoge y **desplaza hacia abajo** la ventana VISIBLE. El overlay
  se quedaba pegado arriba, más corto que la pantalla, y por debajo de su borde inferior quedaba a
  la vista —y al alcance del dedo— la pantalla anterior. El bloqueo de fondo de la v77 impedía que
  el documento se desplazara, pero no que esa franja existiera ni que capturase los toques.
  ARREGLO: se publica también el desplazamiento de la ventana visible (`--vvt`, de
  `visualViewport.offsetTop`) y tanto los paneles como el reproductor se anclan a él. Y `--kb`, el
  hueco real del teclado, pasa a descontarlo: antes se calculaba solo con la altura y se quedaba
  corto.
- CAUSA 2 (dos capas compitiendo): un panel inferior semitransparente tiene sentido para elegir algo
  de un vistazo, no para escribir. ARREGLO: mientras hay teclado, el panel ocupa **toda** la ventana
  visible con fondo opaco y sin esquinas redondeadas (`body.teclado-abierto`). Mientras se escribe
  no hay dos capas visibles: solo la de arriba. Al cerrarse el teclado vuelve a ser una hoja normal.
  La cabecera del panel se queda además fija arriba al desplazarse, para no perder de vista dónde
  estás ni cómo cerrar.
- CAUSA 3 (los tirones): el recolocado del campo enfocado usaba desplazamiento SUAVE y se repetía
  cuatro veces más una vez por cada cambio de la ventana visible; como el teclado dispara varios
  seguidos, se encadenaban animaciones que se pisaban entre sí. ARREGLO: reajuste instantáneo,
  agrupado (una sola vez por ráfaga), con margen de tolerancia —si el campo ya se ve entero no se
  toca nada— y desplazando el CONTENEDOR del panel en vez de la página, dejando el campo a un tercio
  de la altura útil.
- VALIDACIÓN: 348 comprobaciones en verde, 0 fallos, en Madrid, UTC y Sídney. Las 21 nuevas usan una
  ventana visible SIMULADA (altura y desplazamiento, como hace iOS con el teclado) y comprueban:
  publicación de `--vvh`, `--vvt` y `--kb` con y sin teclado, activación y desactivación del modo
  teclado, que el hueco del teclado descuente el desplazamiento, que las reglas de anclaje, fondo
  opaco, alto completo, cabecera fija y acotación de gestos están donde deben, que el reajuste ya no
  es suave ni se encadena, y que enfocar un campo con el teclado abierto no da error y deja el fondo
  congelado.
- CONTRASTE CON v77: el mismo arnés sobre la v77 falla en todo lo anterior, incluido el cálculo del
  hueco del teclado (408 px en vez del real).
- LÍMITE HONESTO: esto es geometría de iOS y aquí no hay navegador. El arnés comprueba la lógica y
  las reglas, no el tacto. Queda por confirmar en el iPhone.

## v79: los dos descansos que faltaban en los circuitos
- ORIGEN: uso real. El circuito mostraba el tiempo total, pero la cuenta atrás de descanso solo
  aparecía al terminar TODAS las rondas, no al cerrar cada una. Y el descanso del ejercicio anterior
  al bloque no se veía: se pasaba directo a la portada del circuito, aunque los pitidos del final
  sonaban igual.

### 1 · Descanso ENTRE rondas (no existía)
`blockRound()` sumaba la vuelta y volvía a pintar la misma pantalla: el único descanso del circuito
era el de después del bloque. En un circuito metabólico el descanso entre vueltas es parte de la
prescripción, no un extra. Ahora al cerrar una ronda aparece **DESCANSO ENTRE RONDAS** con su cuenta
atrás, cuántas vueltas quedan y la lista de movimientos para repasar, y al agotarse vuelve solo a la
ronda siguiente. Se puede saltar. La última ronda no abre descanso: cierra el bloque, como antes.
- Duración: campo nuevo `descanso_rondas_seg`, documentado en el prompt para que Claude lo prescriba
  (45-90 s según intensidad) y saneado como el resto. Si no viene, 60 s **diciéndolo**, con el mismo
  criterio que ya se aplica en el resto de la app.
- El cronómetro de tiempo total del bloque **sigue corriendo durante el descanso**, a propósito: mide
  la duración real del circuito, descansos incluidos, que es lo comparable de una semana a otra.
- No se pueden sumar rondas mientras se descansa, para no falsear el conteo con un toque accidental.

### 2 · El descanso ANTERIOR a un bloque era invisible
CAUSA: `renderPlayer()` comprobaba `isBlock()` ANTES que la fase. Al terminar el último ejercicio
normal, `beginRest()` avanzaba el índice, ponía la fase en «descanso» y pintaba… la portada del
bloque, porque el ejercicio ya apuntado era el bloque. La cuenta atrás corría por debajo, invisible:
de ahí que se oyeran los pitidos del final sin haber visto nunca el reloj. ARREGLO: la fase manda
sobre el tipo de ejercicio. Además la vista previa del descanso ahora sabe describir un bloque —un
bloque no tiene series ni repeticiones— y anuncia «Prepárate para el bloque» con su formato, rondas
y lista de movimientos.

- VALIDACIÓN: 383 comprobaciones en verde, 0 fallos, en Madrid, UTC y Sídney. Las 35 nuevas cubren:
  aparición del descanso al cerrar cada ronda con el valor declarado, conteo correcto de vueltas
  restantes, cronómetro total que no se detiene, bloqueo de rondas durante el descanso, fin
  automático y vuelta a la ronda siguiente, salto manual, que la última ronda cierre el bloque y
  conserve el descanso posterior de 120 s, caída a 60 s avisada cuando no viene declarado, que un
  AMRAP no abra descansos entre rondas por ir contra reloj, y el descanso previo al bloque con su
  reloj visible, su valor pautado, el anuncio del bloque y su vista previa sin series inventadas.
- CONTRASTE CON v78: el mismo arnés sobre la v78 se detiene en cuanto busca el salto del descanso
  entre rondas, porque esa función no existe allí.

## v80: auditoría del contenido — el entrenador recupera el criterio profesional

Esta versión no arregla un fallo aislado: es el resultado de auditar QUÉ le pide la app a Claude y
qué comprueba de lo que Claude devuelve. El diagnóstico fue que el mensaje ya mandaba muchos datos
—cargas reales serie a serie, volumen por grupo, fatiga, marcadores, memoria de decisiones— pero
subordinaba el criterio del entrenador a las preferencias del usuario en tres puntos, y que la
validación del JSON era sintáctica: miraba que los campos existieran, no que el plan fuese bueno.

### 1 · La descarga estaba prohibida por contrato (y era incoherente)
El mensaje decía dos veces «NO programes semanas de descarga», en absoluto. El problema es que
confundía **descarga** con **no entrenar**: una descarga es una semana de entrenamiento con los
mismos días y la misma carga, pero menos series. Peor: en la misma frase se le pedía el mecanismo
—«reduce volumen o aleja del fallo»— mientras se le prohibía el nombre. Instrucciones contradictorias.
- Ahora: **nunca** una semana de descanso (se entrena todas las semanas, sin excepción), pero sí
  puede —y debe, si está indicado— una **semana de VOLUMEN REDUCIDO**: mismos días y patrones, carga
  igual o algo menor, 40-50% menos series, RIR 3-4.
- Con indicaciones concretas, no a ojo: fatiga alta sostenida 2+ semanas, 1RM estimado plano o a la
  baja 3+ semanas en varios ejercicios, molestia ARTICULAR repetida en la misma zona, o FC en reposo
  al alza / sueño por debajo de ~7 h de forma mantenida.
- Honestidad sobre la evidencia: no hay ensayos sólidos que demuestren que las descargas
  planificadas mejoren resultados a largo plazo, y el ACSM 2026 dice que la periodización compleja
  no es imprescindible en el adulto sano. Quitar la descarga fija cada 4 semanas (v27) fue correcto;
  prohibirla en absoluto era el error simétrico. Lo que se recupera es la HERRAMIENTA, no un
  calendario.
- Nuevo bloque **AUTORIDAD DE ENTRENADOR**: se le ordena expresamente contradecir al usuario, con
  argumentos, cuando una preferencia vaya contra el progreso o contra la prevención de lesiones, y
  explicar en `mesociclo.justificacion` qué se gana y cuándo se vuelve a subir.

### 2 · La nota libre del usuario pisaba las lesiones
`noteForPrompt()` decía que las instrucciones adicionales «tienen prioridad sobre las preferencias
generales; si algo contradice al resto del mensaje, haz caso a esto». «El resto del mensaje» incluía
el bloque de LIMITACIONES/LESIONES, la fatiga y los marcadores. Una nota del tipo «esta semana
quiero sentadillas pesadas todos los días» tenía, formalmente, prioridad sobre una lesión declarada.
Era el fallo de gobernanza más serio del prompt.
- Ahora la prioridad está ACOTADA: manda sobre preferencias (estilo, material, reparto de días,
  elección de ejercicios) y NO sobre limitaciones, dolor registrado, fatiga, marcadores ni seguridad.
  Si choca, debe sustituir por la alternativa segura más cercana y decir en `meta` qué se pidió, por
  qué no le parece buena idea y qué ha puesto en su lugar.

### 3 · «Cuerpo entero» estaba fijado en el código
El mensaje decía literalmente `Días de fuerza COMPLETA (~45 min, cuerpo entero)`. Con 2-3 días es lo
mejor; con 5-6 obliga a tocar todos los grupos cinco veces por semana y cierra la puerta a
superior/inferior o empuje-tirón. Además solo se mandaban los CÓDIGOS de día, así que Claude no
podía ver que L-M-X eran tres días seguidos.
- La estructura la decide ahora Claude y la justifica. Con ≤3 días completos, cuerpo entero.
- Los días van con FECHA (`L (Lunes 17/8)`), con instrucción de dejar ~48 h entre estímulos fuertes
  del mismo grupo cuando haya días consecutivos.

### 4 · Nadie comprobaba que la sesión cupiera en el tiempo
El mensaje decía «~45 min» y ahí acababa. Seis ejercicios × 4 series × 90 s de descanso son 65-70
minutos reales. `validatePlan()` no miraba la duración.
- Nueva `estimateSessionMin()`: calentamiento (6 min) + Σ(series × (duración de la serie +
  descanso)), a ~3,5 s por repetición; los ejercicios por tiempo («40s») usan sus segundos y los
  bloques AMRAP/EMOM/circuito su duración o sus rondas.
- La MISMA aritmética se le pide a Claude en el mensaje, para que el aviso y la instrucción hablen
  del mismo número.
- La vista previa muestra `~N min` por día, en rojo si se pasa, y se genera un aviso por encima del
  110% del tiempo declarado (20 min en los días breves). Los avisos NO bloquean: siguen alimentando
  el botón de «copiar petición de corrección» que ya existía.

### 5 · «Llegó al tope del rango» era ambiguo (esfuerzo real por serie)
`complianceFor()` decidía subir carga con kg×reps. Pero 12 repeticiones a RIR 3 y 12 repeticiones
arrastrándose al fallo piden decisiones OPUESTAS, y el entrenador no podía distinguirlas.
- En el reproductor, junto a kg y repeticiones, tres botones anchos: **😌 Fácil / 💪 Justo /
  🔥 Al límite**. En el idioma del que entrena, no en RIR (que hay que traducir a mitad de serie).
  Se prellena con lo marcado en la serie anterior del mismo ejercicio y se puede deseleccionar.
- Se guarda en cada serie (`esf`) y viaja al mensaje, tanto en CUMPLIMIENTO REAL como en las cargas
  reales del historial.
- Cambia la conclusión: «tope del rango pero series al límite → consolidar esta carga, no subir
  todavía»; «dentro del rango y con margen de sobra → puedes subir». Y una regla explícita en las
  reglas de adaptación.
- Es OPCIONAL: sin esfuerzo marcado, el comportamiento es idéntico al de la v79 (probado).

### 6 · Comprobaciones de ENTRENADOR, no de sintaxis (`coachingChecks`)
La validación anterior comprobaba `nombre`, `series`, `reps` y `dia_codigo`, y dos casos de material
por expresión regular. No comprobaba NADA de lo que el propio mensaje exige. Añadido, todo como
avisos:
- Tren inferior por debajo del 28% de los ejercicios de la semana (el mensaje pide un tercio).
- Desequilibrio empuje/tirón, con el campo nuevo `patron`. No se infiere del nombre: adivinarlo daría
  avisos falsos, que es peor que no avisar. Si ningún ejercicio trae `patron`, se dice que no se ha
  podido comprobar.
- Carga ambigua: `"20 kg"` sin aclarar si es por mancuerna, en cada mano o en total — justo lo que el
  mensaje pide evitar y antes solo se avisaba si el campo faltaba del todo.
- Material inexistente: kettlebells y máquinas/poleas, además de dominadas y barra.
- Duración estimada (punto 4), también en las sesiones sueltas (`validateSession`).

### 7 · Variables que un entrenador considera y no llegaban
- **Patrones de movimiento**: cubrir empuje/tirón horizontal y vertical, dominante de rodilla y de
  cadera, core anti-extensión y anti-rotación y transporte cargado. El tirón nunca por debajo de la
  mitad del empuje. Campo `patron` nuevo en el esquema JSON (saneado en `cleanEx`).
- **Series de aproximación**: el calentamiento era una cadena libre y la sesión guiada arrancaba en
  frío con la carga de trabajo. Ahora se piden aproximaciones concretas del primer básico pesado.
- **Orden dentro de la sesión**: básicos y lo técnico primero; unilateral tras bilateral; nunca al
  final el ejercicio en el que se espera progresar. El motor offline ya lo hacía; el mensaje no lo
  pedía.
- **Concurrencia**: en los días de fuerza breve, si la fuerza va antes o después de la carrera y con
  cuánta separación (por defecto, 6 h o más).
- **Edad ≥55**: trabajo de potencia, equilibrio monopodal e impacto suave. La edad solo se usaba para
  la FCmáx de Tanaka.
- **Sexo**: se enviaba y ninguna regla lo usaba. Se le dice explícitamente que NO programe por fases
  del ciclo menstrual —la evidencia es demasiado débil e inconsistente para prescribir así— y que
  autorregule por síntomas, sin rebajar la exigencia por el sexo.
- **Mínimo aeróbico de salud**: sumar los minutos aeróbicos de la semana y compararlos con 150-300
  min moderados (o 75-150 vigorosos), diciéndolo aunque no se le pregunte.

### 8 · Nutrición: se cierra el bucle, sin fingir precisión
El menú se generaba sin saber nada de lo que el usuario come, y las calorías no se ataban nunca al
peso observado (la serie de peso se mandaba, pero ninguna regla la usaba para ajustar).
- Tarjeta nueva en Perfil: **🍽️ Alimentación**, con alergias, intolerancias y preferencias
  (`profile.dietaNota`). Si está vacía se dice explícitamente en vez de suponer.
- Regla de ajuste con ritmos de referencia: pérdida 0,25-0,5% del peso corporal por semana, ganancia
  0,2-0,3%, mantenimiento estable. Si el ritmo real se aparta 2-3 semanas, mover el rango ~10% y
  DECIRLO. Si no hay pesos suficientes, decirlo en vez de tocar calorías a ciegas.
- Honestidad: la app NO registra la ingesta, así que el menú es una propuesta orientativa y se pide
  presentarlo con esas palabras. **No se ha añadido registro de comidas**: era mucha superficie nueva
  para un dato que el usuario no va a introducir a diario, y prometerlo sin cumplirlo es peor.

### 9 · La nota semanal no se guardaba (pérdida silenciosa de datos)
`userNoteFrom('week-note')` leía el `<textarea>` y el valor NO se escribía en `S` en ningún sitio. Si
iOS descartaba la PWA en segundo plano o entraba una versión nueva del service worker, la
instrucción desaparecía sin avisar y el mensaje salía sin ella.
- Ahora se persiste (`S.weekNote`) mientras se escribe, con 800 ms de retardo para no machacar
  localStorage en cada tecla, y también al salir del campo; se repinta al cargar el perfil y
  `userNoteFrom()` recurre al estado si el campo aún está vacío.

### 10 · Coherencia entre los dos entrenadores
`GOALS.fuerza.rir` era `2-3` mientras el bloque de evidencia dice que en fuerza se puede dejar más
margen (RIR 3-4). El motor offline y Claude daban consejos distintos sobre lo mismo: alineado a 3-4.
También se ha reescrito el texto de la tarjeta de Mesociclo, que decía «Sin descarga programada».

### Validación
- **126 comprobaciones en verde, 0 fallos**, en Europe/Madrid, UTC, America/Santiago,
  Australia/Sydney y Pacific/Kiritimati (`test-v80.js`, jsdom con DOM real).
- Persistencia campo a campo con estado de usuario veterano: intacta. `weekPlans` y `earnedBadges` se
  comprueban como datos DERIVADOS (la app añade la foto de la semana en curso y recalcula insignias
  desde el historial): lo que se verifica es que no borran lo anterior.
- Aplicar un plan sigue conservando las cargas anotadas (regresión v74), el historial y el peso.
- **Contraste con la v79**: el mismo arnés da 44 fallos sobre la versión anterior, exactamente en lo
  corregido.
- Regresiones cubiertas: bloques AMRAP/circuito y su `descanso_rondas_seg` (v79), `looseJSON` con
  comillas tipográficas (v72), fechas locales y `daysBetween` en el cambio de hora, ausencia de
  llamadas a `api.anthropic.com`, motor offline vivo.
- `node --check` sobre el script y etiquetas balanceadas.
- **NO validado en navegador**: los botones de esfuerzo son maquetación nueva dentro del reproductor.
  jsdom confirma que se pintan, que el estado alterna y que la serie se guarda con su esfuerzo; NO
  confirma cómo se ven en un iPhone con el teclado abierto. Requiere Playwright o prueba en el
  dispositivo antes de darlo por bueno.

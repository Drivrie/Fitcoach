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

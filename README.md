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

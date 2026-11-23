# FitCoach IA · contexto de desarrollo

**Versión actual: v93** · Última revisión: noviembre 2026

Este archivo se lee ANTES de tocar nada. Si algo aquí contradice al código, gana el código: avísalo
y actualiza este archivo en la misma versión.

---

## Qué es

PWA de entrenamiento personal en **un solo archivo HTML**, desplegada en GitHub Pages, que funciona
sin conexión y no tiene servidor. Claude actúa de entrenador a través de un "puente" de copiar y
pegar: la app genera un prompt, el usuario lo pega en Claude, y pega de vuelta el JSON del plan.

## Archivos del repositorio (estructura PLANA, sin subcarpetas)

| Archivo | Papel |
|---|---|
| `index.html` | Toda la app: HTML + CSS + JS en un único archivo |
| `sw.js` | Service worker. La constante `CACHE` sube con cada versión |
| `manifest.json` | Manifiesto de la PWA |
| `icon-192.png`, `icon-512.png` | Iconos. **Con guion.** Los tres archivos que los referencian (`index.html`, `manifest.json`, `sw.js`) deben coincidir |
| `README.md` | Changelog detallado, versión a versión. Es la memoria del proyecto |
| `CONTEXTO-DESARROLLO.md` | Este archivo |
| `CLAUDE.md` | Resumen operativo para Claude Code (stack, despliegue, pruebas) |
| `test-vNN.js` | Arnés vigente (solo el de la última versión: incluye todas las regresiones) |
| `package.json`, `.gitignore` | Solo para instalar `jsdom` y ejecutar `npm test`; no los usa la app |

## Reglas innegociables

1. **Estructura plana.** Nada de subcarpetas ni de partir `index.html`.
2. **`initState()` es ADITIVO.** Solo rellena lo que falta (`if(!S.x)S.x=…`). Nunca sobrescribe ni
   borra datos del usuario. Cada versión nueva se prueba con un estado de "usuario veterano".
3. **Cero llamadas a `api.anthropic.com`.** La integración con Claude es siempre copiar y pegar.
   Desde la v73 hay UNA conexión de red opcional y apagada por defecto: `api.github.com`, para la
   copia de seguridad en un gist secreto. Si el usuario no la activa, la app no habla con nadie.
4. **Verificar la persistencia antes de entregar.** El arnés comprueba campo a campo que el estado
   de un usuario veterano sobrevive intacto a la subida de versión.
5. **Versión coherente** en `index.html` (texto de pie), `sw.js` (`CACHE`) y `README.md`.
6. **Fechas: nunca `toISOString()`** para claves de día; se usa `ymd()`/`fmt()` en horario local.
   Para diferencias de días, `daysBetween()`, que normaliza a UTC solo año/mes/día (restar
   milisegundos falla en las semanas del cambio de hora).
7. **Escapar al pintar.** Todo lo que llegue del JSON de Claude se guarda tal cual y se escapa con
   `esc()` en cada punto donde se convierte en HTML. Para datos dentro de un atributo `onclick`,
   `esc(JSON.stringify(...))`.
8. **Etiquetas HTML balanceadas** y `node --check` sobre el script antes de entregar.
9. **El entrenador manda sobre las preferencias (v80).** El mensaje a Claude puede y debe
   contradecir al usuario cuando una preferencia vaya contra el progreso o la prevención de
   lesiones, explicando por qué. Las instrucciones libres del usuario tienen prioridad sobre
   PREFERENCIAS (estilo, material, reparto), nunca sobre limitaciones, dolor, fatiga o seguridad.
   Si se toca `noteForPrompt()`, este acotamiento no se relaja.
10. **Nada de semanas de descanso; sí de volumen reducido (v80).** Se entrena todas las semanas. La
   fatiga se gestiona bajando series (40-50%) con la misma frecuencia y carga similar. No volver a
   prohibir la descarga en absoluto: se probó en la v27-v79 y producía instrucciones contradictorias
   (se pedía el mecanismo y se prohibía el nombre).
11. **Toda propuesta de ejercicio se filtra por material (v81).** `ALT` y `EXDB` declaran `eq` (y
   `anc` para las bandas con anclaje). Nada que se ofrezca al usuario —alternativas, buscador,
   motor offline— puede requerir material que no esté en `equipSet()`. Si al filtrar no queda
   nada, no se pinta el bloque.
12. **Sustituir un ejercicio es cambiar el ejercicio ENTERO (v81).** Al cambiar hay que actualizar
   nombre, descripción, músculos, errores, vídeo, `p` (patrón) y `peso`. Arrastrar el patrón o la
   carga del anterior produce figuras equivocadas y prescripciones absurdas (40 kg en unas
   flexiones). `_orig` guarda `peso` y `p` para que deshacer sea de verdad reversible.
13. **El patrón NO es el grupo muscular (v81).** `p` (empuje/tiron/pierna/core/cardio) es demasiado
   grueso para proponer alternativas: dentro de `pierna` hay cuádriceps, isquios, glúteos y
   gemelos. Para eso está `muscleGroup()`. Lo de otro grupo se ETIQUETA, no se oculta.
14. **El resumen del arnés va al FINAL del archivo (v81).** En la v80 quedó por delante de dos
   bloques y sus comprobaciones no se contaban. Si se añaden bloques, van antes del resumen.
15. **Todo lo que el plan trae, se muestra (v82).** Si el plan incluye 3 errores, se pintan los 3.
   Nada de `errs[0]`. `musculos` y `nota_progresion` también se muestran en el reproductor. Y si
   hay contenido fuera de pantalla, tiene que haber una señal visible de que lo hay.
16. **El cuerpo del reproductor se pinta SOLO con `plPaint()` (v82).** Devuelve el scroll arriba y
   recalcula el indicador de contenido pendiente. No escribir en `#player-body` directamente.
17. **Si se le pide al entrenador que recomiende algo, tiene que haber dónde registrar lo hecho
   (v83).** Una recomendación que no se puede contrastar no cierra ningún bucle. Antes de añadir
   una regla nueva al prompt, comprobar que la app puede capturar el resultado.
18. **Una sola fuente de verdad para las cargas (v83).** Manda `sess.sets` (lo anotado serie a
   serie), que es lo que lee `complianceFor()`. Las notas son texto libre de contexto y no se
   parsean. Donde se muestren las dos, hay que decir cuál prevalece.
19. **Si se le pide más texto al entrenador, hay que subir el límite de guardado (v84).**
   `cleanStr`/`cleanMulti` recortan con «…» AL ESCRIBIR en localStorage: lo que sobra no queda
   oculto, se pierde. Cada vez que el prompt pida más contenido en un campo (`meta`,
   `recomendacion_cardio`, `mesociclo.justificacion`, `descripcion`…), revisar su límite. Un texto
   cortado en pantalla casi nunca es CSS en esta app: es el saneador.
20. **Todo lo que entra del JSON se sanea (v84).** `errores` y `nota_progresion` se colaban sin
   pasar por `cleanStr`/`cleanMulti`. Si se añade un campo al esquema, se añade a `cleanEx` o a
   `cleanSession`.
21. **Un «…» en la interfaz tiene que poder abrirse (v84).** Si se recorta al pintar, se usa
   `recorteExpandible()`. Recortar sin salida deja datos guardados e inalcanzables.
22. **Lo que se guarda con detalle, se envía con detalle (v85).** El esfuerzo se registra serie a
   serie: al mensaje va serie a serie (`esfDetalle`), no agregado. Agregar antes de enviar borra
   justo la información que distingue una progresión sana de una carga pasada. `esfResumen` es
   solo para la interfaz.
23. **Los números registrados no tienen unidad; la referencia viaja con ellos (v85).** `kg` y
   `reps` son números pelados. Su significado («por mancuerna», «por pierna») está en `pesoRef` y
   `repsRef`, que se guardan al registrar y acompañan a las cargas en el historial. Nunca enviar
   cargas sin su referencia.
24. **Arreglar el dato no es arreglar la pantalla (v86).** La v85 corrigió lo que viaja al
   entrenador y dejó las tres pantallas donde se mira (resumen al registrar, plantilla de notas,
   lista del historial) exactamente igual. Si un cambio afecta a lo que el usuario cree estar
   viendo, hay que tocar también la interfaz y decirlo al entregar.
25. **Los ajustes del día están acotados y son trazables (v87).** ±1 escalón de carga, ±1 serie,
   RIR +1; nunca subir carga el día que se llega cansado. Todo ajuste guarda el original
   (`_preAjuste`), queda en `ajusteDia` con lo aplicado Y lo rechazado, y llega al mensaje semanal.
   Un ajuste diario que no llega al entrenador semanal crea dos entrenadores contradiciéndose.
26. **Lo que devuelve Claude pasa por los mismos límites que las reglas (v87).** Ni la respuesta
   diaria ni la semanal se aplican sin validar: ejercicios inexistentes se ignoran, las series se
   recortan al margen permitido y los pesos fuera de la lista se avisan.
27. **Lo que el mensaje exige, la app lo comprueba (v80).** Toda regla nueva que se le pida a Claude
   (tiempo, reparto, patrones, claridad de la carga) debería tener su aviso correspondiente en
   `coachingChecks()`. Los avisos NO bloquean: alimentan el botón de «copiar petición de corrección».

28. **Una sola regla de progresión (v88).** `decisionProgresion()` es la única que decide si se sube,
   se mantiene o se amplía el rango. La usan `complianceFor()` (mensaje semanal), `ajustesDelDia()`
   (revisión del día) y, desde la v92, `_checkSubida()` (validador del plan). No añadir una segunda
   regla en el texto del prompt ni en otra función: en la v87 había tres y se contradecían. La carga
   sube solo si el salto cabe en el rango (Epley + los escalones reales); si no, se amplía el rango.
   Las series por tiempo quedan fuera.
29. **Un dato que no se ha medido no se guarda como medido (v88).** El formulario manual de
   marcadores se prellena, pero solo se guarda el campo que el usuario edita (`dataset.tocado`). Lo
   mismo vale para cualquier botón: nada que alimente una decisión viene premarcado. Una serie
   idéntica en 4+ registros se marca como «dato arrastrado» en pantalla y en el mensaje.
30. **Lo que se suma tiene que ser de la misma clase (v88).** Carrera y caminata van separadas
   (`tipoCardio`). Antes de agregar algo nuevo, comprobar que no mezcla categorías.
31. **El historial se enlaza por identidad de ejercicio, no por texto (v88).** `mismoEjercicio()`:
   mismas palabras de movimiento y, si los dos nombres dicen el material, el mismo material. Para
   buscar marcas anteriores, 1RM o progresión, usar esa función y no `===` sobre el nombre. (Dentro
   de una misma sesión, plan y registro sí se casan por nombre exacto.)
32. **Los secretos no salen del dispositivo (v88).** Todo lo que se exporta o se sube pasa por
   `copiaSinSecretos()`. Si se añade otra credencial a `S`, se añade ahí.
33. **Lo que no sale de un estudio se dice (v88).** Los umbrales de la app son convenciones de
   práctica. En el prompt, en la tarjeta «Base científica» y en el README se distinguen de lo citado.
   Una referencia nueva se comprueba contra su fuente antes de añadirla; si el DOI no se ha podido
   comprobar, se escribe «DOI sin comprobar». Si solo se ha visto en fuentes secundarias, se dice.
34. **Cada dato, una vez (v88).** Las series viajan en CUMPLIMIENTO REAL; el historial remite allí
   (`cargasHist`) y las notas pierden la copia automática (`notasLibres`). Antes de añadir un bloque
   al mensaje, comprobar que no repite otro: el mensaje real ya ronda los 91.000 caracteres.

35. **Lo de un día concreto va por fecha y no toca la semana tipo (v89).** `dayOverrides` se indexa
   por `YYYY-MM-DD`. Para saber los minutos o el material de un día se usa `minutosDia()` /
   `equiposDia()` / `sinSesionDia()`, nunca `S.profile.minutos` o `S.profile.equipos` directamente: si
   se añade otro sitio que dependa del tiempo o del material (validador, generador, prompt, pantalla
   de un día, vista previa), tiene que pasar por esas funciones.

36. **Antes de tocar CSS por un texto «que no se ve», comprobar si se cortó al guardar (v91).** En la
   v84 y en la v91 el problema era el saneador, no la pantalla. Se busca en la copia real qué cadenas
   terminan en «…» y con qué longitud. Lo cortado de versiones anteriores se avisa con
   `avisoCortado()`, no se disimula.
37. **Cada figura tiene que ser el ejercicio (v91).** `figKey()` va de lo específico a lo general: los
   casos que una regla genérica capturaría mal («silla», «goblet», «banda», «femoral») van ARRIBA. Al
   añadir ejercicios frecuentes, cruzar los nombres de la copia real con `figKey()` y mirar las dos
   posiciones dibujadas (herramientas de trabajo, no van al repositorio).
38. **La semana del programa es semana de calendario (v91).** `programWeekFor()` cuenta de lunes a
   domingo desde la semana del primer registro, como `weekKeyOf()`.

39. **Ninguna casilla que mide viene escrita (v92).** Las repeticiones del reproductor no se
   prellenan nunca: con el tope escrito, el 85% de las series acababa en el tope y la app medía la
   casilla. Se enseña el objetivo (`objetivoReps()`) como placeholder y con el botón «= N». La carga
   sí se prellena: es la prescripción, no la medida. Si se añade otro campo de medida, misma regla.
40. **No se sube carga sin confirmar (v92).** Margen ≥2 sobre el tope (medido en la serie abierta o
   a fallo, o declarado en todas) → sube; margen de 1 → solo si la sesión anterior con esa carga
   también cerró el rango. Técnica «dudosa» bloquea; en las dos primeras sesiones de un ejercicio
   hace falta técnica «limpia». Es convención de práctica apoyada en ACSM 2009 y la «2 por 2».
41. **El rango tiene tope; después, escalonada (v92).** `topeRepsRango()`: 15 en multiarticulares,
   20 en monoarticulares (`esMonoarticular()`). Al llegar al tope, `escalon:{kg,series}` y la carga
   por serie se lee con `kgSerie()`, nunca con `parseKg(ex.peso)` a secas en el reproductor.
42. **Al subir carga, mismo rango (v92).** Cambiar rango y carga a la vez impide saber qué funcionó;
   el validador lo avisa (`_checkSubida`).
43. **El material es dato, no nota (v92).** Si una restricción de material afecta a lo que proponen
   las reglas locales (mancuernas de las que solo hay una: `dbSueltas()`, `necesitaPar()`), va en un
   campo, no en la nota libre: las reglas locales no leen texto libre.

44. **El volumen se juzga por grupo, con el mismo recuento en todas partes (v93).** El validador del
   plan (`volumenPlan()`, `_checkVolumenSemana()`) y la tarjeta de Progreso usan las mismas reglas:
   menos de 10 series en bruto en un grupo principal → aviso; más de 20 fraccionadas → «por encima de
   lo eficiente» (ACSM 2026). Si se cambia el criterio, se cambia en los dos sitios.
45. **Antes de pedirle algo nuevo al entrenador porque lo diga un estudio, comprobar que la app puede
   guiarlo (v93).** Las superseries tienen buena evidencia, pero el reproductor no las alterna: se
   dejaron fuera hasta poder guiarlas. Es la regla 17 aplicada a la evidencia.

## Estado de los datos

Todo cuelga de `S`, persistido en `localStorage` bajo la clave `'fitcoach'`.

Claves principales: `profile`, `aiDays`/`briefDays`/`freeDays`, `weekPlans` (foto de la previsión de
cada semana), `schedule` (agenda por día, con `sets` = cargas serie a serie), `history`, `nutri`,
`insight`, `baseline`, `health`/`healthLog`, `weightLog`, `programStart`/`mesoLen`/`mesoFocus`,
`dumbbells`/`bands`/`bandAnchor`/`kettlebells`, `fontScale`, `earnedBadges`, `cloud`, `lastBackup`,
`weekNote` (v80), `coachLog`, `waistLog` (v88: `[{date,cm}]`), `blockStart`/`blockNum` (v88: inicio y
número del bloque que fija el entrenador; vacío = cálculo por calendario), `dayOverrides` (v89:
`{'YYYY-MM-DD':{min,equipos,sinSesion,nota}}`, cambios de un día concreto; las sesiones creadas con
cambios guardan una copia en `cond`), `mesoNota` (v91: lo que dijo el entrenador sobre el bloque en su
último plan, para mostrarlo en Perfil), `v92Desde` (v92: primer día con repeticiones sin prellenar;
el mensaje lo usa para avisar de cómo leer los registros anteriores), `dbSueltas` (v92: texto
«28, 32» con los pesos de los que solo hay una mancuerna).

Dentro de `schedule[fecha][i].sets[].series[]` cada serie lleva `kg` o `banda`, `reps` y, desde la
v80, `esf` (`facil`|`justo`|`limite`): el esfuerzo que marcó el usuario al cerrarla. Es opcional; sin
él la lógica de progresión supone 1 repetición de margen. Desde la v88 la serie lleva `rir` (0-3,
donde 3 = «3 o más») además de `esf` (derivado, por compatibilidad), o `fallo:true` si fue la serie a
fallo técnico; en ese caso no lleva `rir`. Desde la v92, `abierta:true` en la última serie con tope
abierto (puede pasar del tope), y el ejercicio (`sets[i]`) lleva `tec` (`ok`|`dudosa`) si se marcó la
técnica. Los ejercicios del plan pueden traer `fallo_tecnico` (`true`/`false`; sin él decide
`esFalloTecnico()` con una lista conservadora) y `escalon` (`{kg,series}`, subida escalonada).

`weekPlans` y `earnedBadges` son datos DERIVADOS: la app añade la foto de la semana en curso y
recalcula las insignias desde el historial. En las pruebas de persistencia NO se comparan por
igualdad estricta; se comprueba que no borran lo anterior.

**Durabilidad (v73).** Tres capas: espejo en IndexedDB (sobrevive a reinicios y a que Safari
descarte localStorage), copia a archivo por la hoja de compartir de iOS (la única que sobrevive a
formatear el móvil), y gist secreto de GitHub opcional. Ninguna de las dos primeras sobrevive a
«Borrar historial y datos de sitios web»; la app lo dice con esas palabras. **Tamaño (medido en la
copia de noviembre de 2026): ~1 MB de JSON, creciendo 170-240 KB al mes.** El grueso son los textos de
los planes ya pasados (`descripcion`, `nota_progresion`, `errores`). Vigilarlo: localStorage tiene
cuota.

## Interfaz

Seis pantallas: Calendario, Sesión, Progreso, Nutrición, **Perfil** (lo que describe al usuario y su
semana TIPO: lo estable) y **Ajustes** (lo que configura la app). Los identificadores de los campos no
cambian aunque una tarjeta cambie de pantalla.

**Planificar la semana tiene UNA sola puerta (v90):** la tarjeta `#plan-card` de Progreso (semana →
cambios por día → nota → generar con Claude o sin conexión). Lo que es de una semana concreta vive
ahí, no en Perfil. Cualquier otro acceso (atajo del Calendario, enlace de Perfil) lleva a esa tarjeta
con `irAPlanificar()`; no se vuelve a poner un botón que abra el mensaje directamente.

## Flujo del domingo (probado en el arnés)

Progreso → Planificar la semana: elegir la semana (próxima por defecto) → cambios en días concretos →
instrucciones → «Generar con Claude» → copiar el mensaje → pegar el JSON → revisar la vista previa →
aplicar. La semana tipo (reparto de días, minutos, material) se ajusta en Perfil solo cuando cambia
de forma estable.

## Cómo se trabaja

1. Proponer y acordar el alcance.
2. Implementar.
3. **Validar con el arnés** (`test-vNN.js`, DOM real con jsdom): arranque limpio y con datos
   veteranos, persistencia campo a campo, regresión de todo lo corregido en versiones anteriores, y
   pruebas nuevas de lo que se toque. Se ejecuta también en varias zonas horarias.
4. Contrastar el mismo arnés contra la versión anterior: debe fallar donde se ha corregido algo.
   Desde la v92 hay una sección de «comportamiento observable» sin guarda de función, para que el
   contraste falle por el comportamiento y no solo porque falta una función.
5. Desde la v94 se trabaja en **Claude Code** sobre el repositorio, no en un chat de proyecto de
   claude.ai. Entregar = commit en una rama de trabajo + pull request contra `main`, con `README.md`
   (sección `## vNN`: qué, por qué y cómo se ha comprobado), `sw.js` y el arnés nuevo en el mismo
   cambio. **Fusionar en `main` es publicar**: GitHub Pages sirve `main`. Lo fusiona el usuario
   cuando lo ha revisado. Ya no hay zip ni archivos sueltos.

**Trampa conocida al aplicar parches por script:** si el script hace varias sustituciones y una
falla, no se escribe NADA. Conviene escribir a disco tras cada sustitución o verificar después que
todas están presentes; ya ha provocado entregas a medias.

**Trampa histórica con el proyecto de Claude (hasta la v93):** los documentos del proyecto se leían
en línea y no quedaban en disco, así que el README no se podía editar y las secciones nuevas se
entregaban aparte (`README-v92.md`, `README-v93.md`). Con el repositorio ya no aplica: se edita
`README.md` directamente y no se crean `README-vNN.md` sueltos.

**Regresión visual:** Playwright con Chromium, cargando una copia real en `localStorage` antes de
abrir la página, a 375×812 y 390×844 y con tamaños de letra 100%, 130% y 145%. Se comprueban errores
de JavaScript y desbordes laterales en las seis pestañas, la revisión previa y el reproductor. Lo que
no se puede comprobar así (teclado de iOS, fuentes de emoji, safe areas) se anota en el README como
«pendiente en el iPhone».

**Probar con datos reales, no solo con el veterano de laboratorio.** En la v88 la copia real destapó
tres fallos que el arnés no veía (series por tiempo, sufijo «por pierna», texto de la serie a
fallo); en la v92, el prellenado de las repeticiones. Si hay una copia disponible, el arnés la usa
(`FITCOACH_BACKUP=ruta node test-vNN.js`). En Claude Code la copia no está en el entorno: el usuario
la sube a la sesión cuando haga falta, se usa desde el directorio temporal y **nunca se copia al
repositorio** (es público y GitHub Pages lo publica).

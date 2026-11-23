/* Arnés de pruebas FitCoach IA · v93
   Uso: node test-v93.js [ruta-index.html]   (FITCOACH_BACKUP=ruta para incluir la copia real)
   Se ejecuta en Europe/Madrid, UTC, America/Santiago, Australia/Sydney y Pacific/Kiritimati.
   Secciones 24-30: cada una falla contra la versión anterior a la suya. Ese es el contraste.
   v92: secciones 9 y 24-D marcan la técnica como limpia en los casos que prueban la subida con
   Epley, porque desde la v92 un ejercicio en sus dos primeras sesiones solo sube con técnica
   confirmada (comportamiento nuevo y buscado, probado aparte en la sección 28). */
const fs=require('fs');
const path=require('path');
const {JSDOM,VirtualConsole}=require('jsdom');

const FILE=process.argv[2]||'index.html';
const HTML=fs.readFileSync(FILE,'utf8');

let ok=0,bad=0;const fails=[];
function t(name,cond,extra){
  if(cond)ok++;else{bad++;fails.push(name+(extra?' → '+extra:''));}
}

// contra una versión anterior algunas funciones no existen: se informa en vez de morir en silencio
process.on('uncaughtException',e=>{bad++;fails.push('EXCEPCIÓN, el arnés se detuvo aquí: '+e.message);
  console.log('\n'+ok+' comprobaciones OK, '+bad+' fallos (ejecución interrumpida)');
  console.log('\nFALLOS:');fails.forEach(f=>console.log(' ✕ '+f));process.exit(1);});

function boot(estadoInicial){
  const vc=new VirtualConsole(); // silenciar ruido de jsdom
  const dom=new JSDOM(HTML,{runScripts:'outside-only',url:'https://example.org/',
    pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window;
  // polyfills mínimos que la app toca al arrancar
  w.alert=()=>{};w.confirm=()=>true;w.scrollTo=()=>{};
  w.matchMedia=w.matchMedia||(q=>({matches:false,media:q,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}}));
  if(!w.navigator.clipboard)Object.defineProperty(w.navigator,'clipboard',{value:{writeText:()=>Promise.resolve()},configurable:true});
  if(!w.navigator.serviceWorker)Object.defineProperty(w.navigator,'serviceWorker',{value:{register:()=>Promise.resolve({addEventListener(){}}),addEventListener(){},ready:Promise.resolve({})},configurable:true});
  w.indexedDB=undefined;
  w.requestAnimationFrame=cb=>setTimeout(cb,0);
  if(estadoInicial)w.localStorage.setItem('fitcoach',JSON.stringify(estadoInicial));
  const code=HTML.replace(/[\s\S]*?<script>/,'').replace(/<\/script>[\s\S]*$/,'');
  // `let S` y las const de módulo no cuelgan de window: se exponen para poder inspeccionarlas
  w.eval(code+"\n;Object.defineProperty(window,'S',{get:()=>S,set:v=>{S=v;},configurable:true});"
    +"\n;window.__k={};try{window.__k.ESF_OPTS=()=>ESF_OPTS;}catch(e){}window.__k.RIR_OPTS=()=>{try{return RIR_OPTS;}catch(e){return [];}};window.__k.MOD=()=>{try{return MOD;}catch(e){return null;}};window.__k.FIGS=()=>{try{return FIGS;}catch(e){return null;}};window.__k.GEN=()=>{try{return GEN;}catch(e){return null;}};"
    +"\n;Object.defineProperty(window,'P',{get:()=>P,set:v=>{P=v;},configurable:true});"
    +"\n;Object.defineProperty(window,'PRE',{get:()=>{try{return PRE;}catch(e){return undefined;}},configurable:true});");
  return w;
}

/* ---------- estado de USUARIO VETERANO (v79) ------------------------------------------------ */
function estadoVeterano(){
  const hoy=new Date();
  const d=n=>{const x=new Date(hoy);x.setDate(x.getDate()-n);
    return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');};
  return {
    profile:{peso:'82.5',altura:'178',edad:'58',sexo:'mujer',nivel:'avanzado',minutos:50,
      objetivos:['musculo','grasa'],equipos:['mancuernas','bandas'],
      limitaciones:['hombro'],limitacionesNota:'molestia hombro derecho'},
    aiDays:['L','X','V'],briefDays:['X'],freeDays:['S'],
    currentWeek:0,
    schedule:{[d(3)]:[{type:'ai',title:'Cuerpo entero A',done:true,
      exercises:[{nombre:'Press mancuerna',series:3,reps:'8-12',descanso_seg:90,peso:'16 kg por mancuerna'},
                 {nombre:'Remo mancuerna',series:3,reps:'8-12',descanso_seg:90,peso:'18 kg por mancuerna'}],
      sets:[{nombre:'Press mancuerna',series:[{kg:16,reps:'12'},{kg:16,reps:'12'},{kg:16,reps:'12'}]},
            {nombre:'Remo mancuerna',series:[{kg:18,reps:'10'},{kg:18,reps:'9'},{kg:18,reps:'8'}]}]}]},
    history:[{key:d(3),title:'Cuerpo entero A',duration:'50',feeling:'💪',fatiga:'normal',
      sets:[{nombre:'Press mancuerna',series:[{kg:16,reps:'12'},{kg:16,reps:'12'},{kg:16,reps:'12'}]}]},
      {key:d(5),title:'Carrera suave',duration:'40',distance:'6.2',hr:'138',feeling:'💪'}],
    weekPlans:{'2026-W20':{ai:['L','X'],brief:[],free:['S']}},
    nutri:{calorias_diarias:2100,proteina_g:150,agua_litros:2.6,menu_dia:[{momento:'Desayuno',plato:'Avena',kcal:400,proteina_g:25}]},
    insight:'texto viejo',
    baseline:'Circuito con banda 40 min',
    health:{restingHR:54,hrv:62,vo2max:41,bodyFat:24,avgSteps:9000,avgActiveKcal:520,avgSleepH:7.2,imported:true},
    healthLog:[{date:d(60),restingHR:57,hrv:58,avgSleepH:6.9},{date:d(30),restingHR:54,hrv:62,avgSleepH:7.2}],
    weightLog:[{date:d(28),kg:84.1},{date:d(14),kg:83.2},{date:d(1),kg:82.5}],
    programStart:d(70),mesoLen:4,mesoFocus:'Acumulación de hipertrofia',
    dumbbells:{min:4,max:24,step:2},bands:['media','alta'],bandAnchor:true,kettlebells:[12,16],
    fontScale:1.1,earnedBadges:['primera'],cloud:{token:'',gistId:''},lastBackup:d(6),
    coachLog:[{fecha:d(7),semana:'2026-W30',enfoque:'Acumulación',justificacion:'x',analisis:'y',sesiones:3}],
    currentTab:'perfil'
  };
}

/* ---------- 15. v81 · comportamiento observable (se ejecuta también contra la v80) ------------ */
{
  const w=boot(estadoVeterano());
  w.S.profile.equipos=['ninguno'];   // solo peso corporal
  w.S.bandAnchor=false;
  const exPress={nombre:'Press de banca',p:'empuje',musculos:'Pecho, tríceps',peso:'40 kg en total incluida la barra'};
  const alts=w.altsFor(exPress,{exercises:[exPress]})||[];
  t('v81 comportamiento: sin material NO se ofrecen alternativas con mancuernas',
    !alts.some(a=>a.nombre==='Press con mancuernas'),JSON.stringify(alts.map(a=>a.nombre)));

  w.S.profile.equipos=['mancuernas','bandas']; // para que el rumano sea candidato de verdad
  const exSent={nombre:'Sentadilla goblet',p:'pierna',musculos:'Cuádriceps, glúteos'};
  const sessS={exercises:[exSent,{nombre:'Peso muerto rumano',p:'pierna',musculos:'Isquios, glúteos'}]};
  const comp=w.compatibleExercises(exSent,sessS);
  t('v81 comportamiento: el buscador no repite un ejercicio que ya está en la sesión',
    !comp.some(e=>e.n==='Peso muerto rumano'));
  t('v81 comportamiento: el primero propuesto es del mismo grupo muscular',
    comp.length>0&&comp[0].mismo===true,comp.length?(comp[0].n+' / '+comp[0].g):'lista vacía');

  w.S.profile.equipos=['ninguno'];
  const ex0={nombre:'Press de banca',p:'empuje',musculos:'Pecho, tríceps',peso:'40 kg en total incluida la barra'};
  const key=Object.keys(w.S.schedule)[0];
  w.S.schedule[key][0].exercises=[ex0];
  w.S.viewKey=key;
  const o=[null].concat(w.altsFor(ex0,w.S.schedule[key][0])||[]);
  const iF=o.findIndex(x=>x&&x.nombre==='Flexiones');
  if(iF>0){
    w.swapExercise(key,0,iF);
    const r=w.S.schedule[key][0].exercises[0];
    t('v81 comportamiento: al pasar a peso corporal, la carga en kg no se arrastra',
      r.peso==='solo peso corporal',String(r.peso));
  }else{
    t('v81 comportamiento: hay alternativa a peso corporal para el press',false);
  }
}


/* ---------- 16. v82 · la ficha técnica completa llega al reproductor -------------------------- */
{
  const w=boot(estadoVeterano());
  const ex={nombre:'Sentadilla goblet',p:'pierna',series:4,reps:'8-12',descanso_seg:120,
    peso:'16 kg en una sola mancuerna',musculos:'Cuádriceps, glúteos',
    descripcion:'Mancuerna pegada al pecho, baja controlando y sube empujando el suelo.',
    nota_progresion:'Subimos dos kilos respecto a la semana pasada.',
    errores:['Rodillas hacia dentro','Lumbar redondeada abajo','Separar la mancuerna del pecho']};
  const ficha=w.fichaTecnica?w.fichaTecnica(ex,ex.errores):''; // en la v81 no existe: falla a propósito
  t('v82: la ficha existe',!!ficha);
  t('v82: se muestran los TRES errores, no solo el primero',
    (ficha.match(/<li>/g)||[]).length===3,String((ficha.match(/<li>/g)||[]).length));
  t('v82: el contador de errores es el real',/Errores a evitar \(3\)/.test(ficha));
  t('v82: aparecen los músculos',/Cuádriceps, glúteos/.test(ficha));
  t('v82: aparece la nota de progresión',/Subimos dos kilos/.test(ficha));
  t('v82: aparece la descripción completa',/sube empujando el suelo/.test(ficha));
  t('v82: los errores van escapados',!!w.fichaTecnica&&/&lt;/.test(w.fichaTecnica(ex,['<img src=x onerror=1>'])));
  t('v82: sin datos no pinta ficha vacía',!!w.fichaTecnica&&w.fichaTecnica({nombre:'x'},[])==='');
  // en la sesión guiada real
  const key=Object.keys(w.S.schedule)[0];
  w.S.schedule[key][0].done=false;
  w.S.schedule[key][0].exercises=[ex];
  w.startPlayer(key);
  const body=w.document.getElementById('player-body').innerHTML;
  t('v82 reproductor: los tres avisos están en pantalla',(body.match(/<li>/g)||[]).length===3);
  t('v82 reproductor: ya no se recorta a "Evita: <primero>"',body.indexOf('⚠ Evita:')<0);
  t('v82 reproductor: se ven los músculos',/Cuádriceps/.test(body));
  t('v82 reproductor: se ve la progresión',/Subimos dos kilos/.test(body));
  t('v82: existe el indicador de contenido pendiente',!!w.document.getElementById('pl-more'));
  t('v82: plPaint y plMoreCheck existen',typeof w.plPaint==='function'&&typeof w.plMoreCheck==='function');
  // la pantalla de fin de sesión sigue pintándose (pasa por plPaint)
  try{w.eval("P.setLog=[{nombre:'Sentadilla goblet',series:[{kg:16,reps:'10'}]}];finishSession();");}catch(e){}
  t('v82: la pantalla de fin de sesión se sigue pintando',
    /Sesión completada/.test(w.document.getElementById('player-body').innerHTML));
}


/* ---------- 17. v83 · orden fuerza/cardio y esfuerzo visible al guardar ----------------------- */
{
  const w=boot(estadoVeterano()); // briefDays: ['X']
  const dates=w.weekDates(w.S.currentWeek).map(w.fmt);
  const kX=dates[2]; // miércoles = día de fuerza breve, lleva carrera el mismo día

  // --- el selector de orden aparece en los días con dos actividades
  w.S.schedule[kX]=[{type:'ai',title:'Fuerza breve',done:false,exercises:[
    {nombre:'Remo con mancuerna',series:3,reps:'8-12',descanso_seg:90,peso:'18 kg por mancuerna'}]}];
  w.openLog(kX,'log');
  let body=w.document.getElementById('log-body').innerHTML;
  t('v83: en un día doble aparece el selector de orden',/orden-b/.test(body));
  t('v83: hay opción ANTES',/data-v="antes"/.test(body));
  t('v83: hay opción DESPUÉS',/data-v="despues"/.test(body));
  t('v83: hay campo de separación en horas',!!w.document.getElementById('l-sep'));

  // --- y NO aparece en un día normal sin nada más
  const kJ=dates[3];
  w.S.schedule[kJ]=[];
  w.openLog(kJ,'log');
  t('v83: en un día sin doble actividad no molesta con el selector',
    !/orden-b/.test(w.document.getElementById('log-body').innerHTML));

  // --- se guarda
  w.openLog(kX,'log');
  w.document.querySelectorAll('.orden-b').forEach(b=>b.classList.remove('sel'));
  const _bd=w.document.querySelector('.orden-b[data-v="despues"]');
  if(_bd)_bd.classList.add('sel');
  w.document.getElementById('l-dur').value='22';
  const _sp=w.document.getElementById('l-sep'); if(_sp)_sp.value='6';
  w.document.getElementById('l-type').value='Fuerza (sesión IA)';
  w.saveLog();
  const reg=w.S.history.find(h=>h.key===kX);
  t('v83: el orden se guarda en el historial',reg&&reg.orden==='despues',JSON.stringify(reg&&reg.orden));
  t('v83: la separación se guarda',reg&&reg.sepH===6,String(reg&&reg.sepH));
  t('v83: y persiste en localStorage',
    (JSON.parse(w.localStorage.getItem('fitcoach')).history||[]).some(h=>h.orden==='despues'));

  // --- llega al mensaje para Claude
  const p=w.buildPrompt('adapt');
  t('v83: el orden viaja al mensaje',/fue DESPUÉS de la otra del día/.test(p));
  t('v83: la separación viaja al mensaje',/6 h de separación/.test(p));
  t('v83: se le pide contrastar su recomendación',/ORDEN FUERZA \/ CARDIO REALIZADO/.test(p));

  // --- "solo esto" no ensucia el registro
  const kV=dates[4];
  w.S.schedule[kV]=[{type:'ai',title:'Fuerza',done:false,exercises:[{nombre:'Sentadilla goblet',series:3,reps:'10',descanso_seg:90}]},
                    {type:'free',title:'Carrera',done:true,log:{}}];
  w.openLog(kV,'log');
  w.document.getElementById('l-dur').value='40';
  w.document.getElementById('l-type').value='Fuerza (sesión IA)';
  w.saveLog(); // se queda con "Solo esto", que es lo marcado por defecto
  const regV=w.S.history.find(h=>h.key===kV);
  t('v83: "solo esto" no guarda orden',regV&&regV.orden===undefined);
}

/* ---------- 18. v83 · el esfuerzo es visible al registrar la sesión --------------------------- */
{
  const w=boot(estadoVeterano());
  const dates=w.weekDates(w.S.currentWeek).map(w.fmt);
  const k=dates[0];
  w.S.schedule[k]=[{type:'ai',title:'Cuerpo entero',done:false,
    exercises:[{nombre:'Press mancuerna',series:3,reps:'8-12',descanso_seg:90,peso:'16 kg por mancuerna'},
               {nombre:'Remo mancuerna',series:3,reps:'8-12',descanso_seg:90,peso:'18 kg por mancuerna'}],
    sets:[{nombre:'Press mancuerna',series:[{kg:16,reps:'12',esf:'limite'},{kg:16,reps:'11',esf:'limite'}]},
          {nombre:'Remo mancuerna',series:[{kg:18,reps:'10'},{kg:18,reps:'10'}]}]}];
  w.openLog(k,'log');
  const body=w.document.getElementById('log-body').innerHTML;
  t('v83: se muestra el resumen de lo que se guardará',/Esto es lo que se guardará en tu historial/.test(body));
  t('v83→v86: el esfuerzo aparece en el resumen, ahora por serie',/\(al límite\)/.test(body),'');
  t('v83: si no se marcó esfuerzo, se dice',/sin esfuerzo marcado/.test(body));
  t('v83: se declara qué fuente prevalece',/no sustituyen a estos datos/.test(body));
  const notas=w.document.getElementById('l-notes').value;
  t('v83→v86: la plantilla de notas trae el esfuerzo por serie',/\(al límite\)/.test(notas),notas.slice(0,120));
  t('v83: la plantilla avisa de que es una copia',/lo que cuenta para la progresión/.test(notas));
  // y al guardar, las series con esfuerzo viajan al historial
  w.document.getElementById('l-dur').value='50';
  w.document.getElementById('l-type').value='Fuerza (sesión IA)';
  w.saveLog();
  const reg=w.S.history.find(h=>h.key===k);
  t('v83: las series llegan al historial',!!(reg&&reg.sets&&reg.sets.length===2));
  t('v83: el esfuerzo llega al historial',
    !!(reg&&reg.sets[0].series[0].esf==='limite'),JSON.stringify(reg&&reg.sets[0].series[0]));
  const p=w.buildPrompt('adapt');
  t('v83: el esfuerzo llega al mensaje desde el historial',/al límite/.test(p));
}


/* ---------- 19. v84 · el texto del entrenador ya no se corta AL GUARDAR ----------------------- */
{
  const w=boot(estadoVeterano());
  const META='Sesión de cuerpo entero centrada en el patrón de rodilla y en el tirón horizontal, con la sentadilla goblet como ejercicio principal porque es donde esperamos progresar en carga esta semana. Se mantiene el volumen de la semana pasada en tren superior y se añade una serie al remo para corregir el desequilibrio entre empuje y tirón que arrastrabas. Termina con core anti-extensión.';
  const CARDIO='Dos salidas: carrera continua de 40 minutos en Z2 (128-142 lpm) el sábado y paseo largo de 60 minutos el domingo. Con esto sumas unos 100 minutos de intensidad moderada, por debajo del mínimo de salud de 150-300 minutos semanales; si puedes, añade 30 minutos de caminata rápida entre semana, que no interfiere con la fuerza.';
  const JUST='Mantengo la acumulación una semana más porque el 1RM estimado sigue subiendo y no hay señales de fatiga acumulada; me has pedido no bajar el ritmo y en este caso los datos te dan la razón, pero si la semana que viene el press se queda plano bajaremos el volumen aunque no te guste, porque insistir sobre una carga estancada solo suma fatiga y no produce adaptación.';
  w.applyBridgePlan({sesiones_ia:[{dia_codigo:'L',titulo:'Cuerpo entero A',meta:META,ejercicios:[
      {nombre:'Sentadilla goblet',series:4,reps:'8-12',descanso_seg:120,peso:'16 kg en una sola mancuerna',
       patron:'rodilla',musculos:'Cuádriceps, glúteos',descripcion:'y'.repeat(850),
       nota_progresion:'Subimos dos kilos.',errores:['a','b','c']}]}],
    recomendacion_cardio:CARDIO, analisis_progreso:'Todo en orden.',
    mesociclo:{enfoque:'Acumulación',semanas_bloque:4,justificacion:JUST}});
  const key=w.fmt(w.weekDates(w.S.currentWeek)[0]);
  const ai=(w.S.schedule[key]||[]).find(x=>x.type==='ai');
  t('v84: la explicación del día se guarda entera',ai&&ai.meta.length===META.length,
    String(ai&&ai.meta.length)+' de '+META.length);
  t('v84: y sin puntos suspensivos',ai&&!/…$/.test(ai.meta));
  const libre=Object.values(w.S.schedule).reduce((a,v)=>a.concat(v),[]).find(x=>x.type==='free');
  t('v84: la recomendación de cardio del día libre se guarda entera',
    libre&&libre.meta.length===CARDIO.length,String(libre&&libre.meta.length)+' de '+CARDIO.length);
  t('v84: el análisis de Progreso no lleva recortes',((w.S.insight||'').match(/…/g)||[]).length===0,
    String((w.S.insight||'').length));
  t('v84: la justificación del mesociclo se guarda entera',(w.S.insight||'').indexOf('no produce adaptación')>=0);
  t('v84: el cardio completo está en Progreso',(w.S.insight||'').indexOf('no interfiere con la fuerza')>=0);
  t('v84: la descripción admite más de 600 caracteres',ai.exercises[0].descripcion.length===850,
    String(ai.exercises[0].descripcion.length));
  t('v84: la memoria del entrenador guarda la justificación entera',
    ((w.S.coachLog||[]).slice(-1)[0]||{}).justificacion||''.indexOf('no produce adaptación')>=0);
  // los errores ahora se sanean (antes entraban tal cual)
  const ex=w.cleanEx({nombre:'x',errores:['<b>ojo</b>','b','c','d','e','f','g','h']});
  t('v84: los errores se limitan en número',ex.errores.length===6,String(ex.errores.length));
  t('v84: los errores se sanean como cadena',typeof ex.errores[0]==='string');
  t('v84→v91: nota_progresion se sanea (límite 1500)',w.cleanEx({nombre:'x',nota_progresion:'z'.repeat(3000)}).nota_progresion.length<=1501);

  // --- recorte expandible del historial
  const largo='n'.repeat(200);
  const html=w.recorteExpandible?w.recorteExpandible(largo,70,'var(--text3)'):'';
  t('v84: el recorte del historial ofrece "ver más"',/ver más/.test(html));
  t('v84: el texto completo está en el DOM, no perdido',html.indexOf(largo)>=0);
  t('v84: si es corto no añade nada',!!w.recorteExpandible&&w.recorteExpandible('hola',70,'x').indexOf('ver más')<0);
  t('v84: sin texto no pinta nada',!!w.recorteExpandible&&w.recorteExpandible('',70,'x')==='');
}


/* ---------- 20. v85 · esfuerzo SERIE A SERIE y unidades sin ambigüedad ------------------------ */
if(!boot(null).esfDetalle){ t('v85: esfDetalle existe',false); } else {
  const w=boot(estadoVeterano());
  const dates=w.weekDates(w.S.currentWeek).map(w.fmt);
  const k=dates[0];
  const mk=(esfs,reps)=>esfs.map((e,i)=>({kg:16,reps:String(reps||10),...(e?{esf:e}:{})}));
  w.S.schedule[k]=[{type:'ai',title:'Cuerpo entero',done:true,
    exercises:[{nombre:'Sentadilla bulgara con mancuernas',series:4,reps:'8-10 por pierna',
      descanso_seg:120,peso:'16 kg por mancuerna (una en cada mano)'}],
    sets:[{nombre:'Sentadilla bulgara con mancuernas',
      pesoRef:'16 kg por mancuerna (una en cada mano)',repsRef:'8-10 por pierna',
      series:mk(['facil','facil','justo','limite'])}]}];
  w.S.history=[{key:k,title:'Fuerza (sesión IA)',duration:'40',feeling:'💪',fatiga:'normal',
    sets:w.S.schedule[k][0].sets}];

  // --- esfuerzo por serie, no una etiqueta
  t('v85: esfDetalle enumera las series',
    /s1 fácil, s2 fácil, s3 justo, s4 al límite/.test(w.esfDetalle(w.S.schedule[k][0].sets[0].series)),
    w.esfDetalle(w.S.schedule[k][0].sets[0].series));
  t('v85: sin esfuerzo marcado no añade nada',w.esfDetalle([{kg:1,reps:'5'}])==='');
  t('v85: una serie sin marcar se declara',/sin marcar/.test(w.esfDetalle([{esf:'facil'},{kg:1}])));
  t('v85: nAlLimite cuenta',w.nAlLimite(mk(['limite','justo','limite']))===2);

  // --- la decisión ya no la vuelca una sola serie
  let c=w.complianceFor(k);
  let f=c.filas[0];
  // v88: 1 de 4 sin margen sigue sin obligar a consolidar, pero el salto 16→18 (+13%) no cabe en 8-10
  t('v85→v88: 1 de 4 sin margen no obliga a consolidar',!/consolidar esta carga/.test(f.estado),f.estado);
  t('v88: el salto que no cabe amplía el rango en vez de subir',/18 kg, \+13%/.test(f.estado)&&/rango ampliado a 8-13/.test(f.estado),f.estado);
  t('v85: el detalle por serie viaja en "realizado"',/s4 al límite/.test(f.real),f.real);
  w.S.schedule[k][0].sets[0].series=mk(['limite','limite','justo','limite']);
  c=w.complianceFor(k);
  t('v85: 3 de 4 al límite sí bloquea',/consolidar esta carga/.test(c.filas[0].estado),c.filas[0].estado);
  t('v85→v88: dice cuántas fueron sin margen',/3 de 4 series sin margen \(RIR 0\)/.test(c.filas[0].estado));
  // regresión: sin esfuerzo marcado se comporta como siempre
  w.S.schedule[k][0].sets[0].series=mk([null,null,null,null]);
  c=w.complianceFor(k);
  t('v85→v88: sin esfuerzo marcado se supone 1 repetición de margen y se dice',
    /sin dato de esfuerzo: se supone 1 rep\. de margen/.test(c.filas[0].estado)&&/tope del rango/.test(c.filas[0].estado),c.filas[0].estado);

  // --- unidades: la referencia de lo pautado acompaña al registro
  w.S.schedule[k][0].sets[0].series=mk(['facil','justo','limite']);
  w.S.history[0].sets=w.S.schedule[k][0].sets;
  const ref=w.refSets(w.S.schedule[k][0].sets[0]);
  t('v85: refSets incluye la carga pautada',/16 kg por mancuerna/.test(ref),ref);
  t('v85: refSets incluye las repeticiones pautadas',/8-10 por pierna/.test(ref));
  t('v85: sin referencia no inventa nada',w.refSets({nombre:'x'})==='');
  const p=w.buildPrompt('adapt');
  t('v85→v88: el pautado acompaña a las cargas (ahora en CUMPLIMIENTO, sin duplicar)',/pautado 4×8-10 por pierna @ 16 kg por mancuerna/.test(p));
  t('v85: el historial lleva el esfuerzo por serie',/s3 al límite/.test(p));
  t('v85→v88: se explica cómo leer el esfuerzo por serie',/«RIR n» = repeticiones que creo que me quedaban/.test(p)&&/justo ≈ RIR 1-2/.test(p));
  t('v85: se avisa de las unidades',/AVISO SOBRE LAS UNIDADES/.test(p));
  t('v85: el aviso pone el ejemplo por pierna',/10 repeticiones POR PIERNA, no en total/.test(p));
  t('v85: se le pide preguntar si falta el pautado',/dilo en "meta" en vez de suponer/.test(p));

  // --- la referencia se guarda al registrar desde el reproductor
  const w2=boot(estadoVeterano());
  const k2=w2.weekDates(w2.S.currentWeek).map(w2.fmt)[0];
  w2.S.schedule[k2]=[{type:'ai',title:'A',done:false,exercises:[
    {nombre:'Zancada inversa con mancuernas',series:3,reps:'10-12 por pierna',descanso_seg:90,
     peso:'18 kg por mancuerna (una en cada mano)'}]}];
  w2.startPlayer(k2);
  w2.document.getElementById('pl-kg').value='18';
  w2.document.getElementById('pl-reps').value='12';
  w2.setEsf('justo');
  w2.recordSet(w2.S.schedule[k2][0].exercises[0]);
  const e0=(w2.S.schedule[k2][0].sets||[])[0];
  t('v85: al registrar se guarda la carga pautada',e0&&e0.pesoRef==='18 kg por mancuerna (una en cada mano)',
    JSON.stringify(e0&&e0.pesoRef));
  t('v85: y las repeticiones pautadas',e0&&e0.repsRef==='10-12 por pierna',JSON.stringify(e0&&e0.repsRef));
  t('v85: la serie conserva su esfuerzo',e0&&e0.series[0].esf==='justo');
  t('v88: y además el RIR numérico',e0&&e0.series[0].rir===1,JSON.stringify(e0&&e0.series[0]));
  t('v85: y persiste',(JSON.parse(w2.localStorage.getItem('fitcoach')).schedule[k2][0].sets||[])[0].repsRef==='10-12 por pierna');
}
/* ---------- 21. v85 · comportamiento observable (se ejecuta también contra la v84) ------------ */
{
  const w=boot(estadoVeterano());
  const k=w.weekDates(w.S.currentWeek).map(w.fmt)[0];
  const ser=[{kg:16,reps:'10',esf:'facil'},{kg:16,reps:'10',esf:'facil'},
             {kg:16,reps:'10',esf:'justo'},{kg:16,reps:'10',esf:'limite'}];
  w.S.schedule[k]=[{type:'ai',title:'A',done:true,
    exercises:[{nombre:'Sentadilla bulgara con mancuernas',series:4,reps:'8-10 por pierna',
      descanso_seg:120,peso:'16 kg por mancuerna (una en cada mano)'}],
    sets:[{nombre:'Sentadilla bulgara con mancuernas',
      pesoRef:'16 kg por mancuerna (una en cada mano)',repsRef:'8-10 por pierna',series:ser}]}];
  w.S.history=[{key:k,title:'Fuerza (sesión IA)',duration:'40',feeling:'💪',fatiga:'normal',
    sets:w.S.schedule[k][0].sets}];
  const f=w.complianceFor(k).filas[0];
  t('v85 comportamiento: el esfuerzo de CADA serie llega al entrenador',
    /s1 .*s2 .*s3 .*s4 /.test(f.real),f.real);
  t('v85 comportamiento: una sola serie al límite no bloquea la subida',
    !/consolidar esta carga/.test(f.estado),f.estado);
  const p=w.buildPrompt('adapt');
  t('v85 comportamiento: el historial dice a qué se refieren los kilos y las repeticiones',
    /16 kg por mancuerna/.test(p.slice(p.indexOf('CUMPLIMIENTO REAL'))),'');
}



/* ---------- 22. v86 · el detalle es VISIBLE, no solo enviado --------------------------------- */
{
  const w=boot(estadoVeterano());
  const k=w.weekDates(w.S.currentWeek).map(w.fmt)[0];
  const ser=[{kg:16,reps:'10',esf:'facil'},{kg:16,reps:'10',esf:'justo'},{kg:16,reps:'10',esf:'limite'}];
  w.S.schedule[k]=[{type:'ai',title:'A',done:false,
    exercises:[{nombre:'Zancada inversa con mancuernas',series:3,reps:'10-12 por pierna',
      descanso_seg:90,peso:'18 kg por mancuerna (una en cada mano)'}],
    sets:[{nombre:'Zancada inversa con mancuernas',series:ser}]}]; // sin pesoRef: registro antiguo
  w.openLog(k,'log');
  const body=w.document.getElementById('log-body').innerHTML;
  t('v86: el resumen muestra el esfuerzo de CADA serie',
    /\(fácil\)/.test(body)&&/\(justo\)/.test(body)&&/\(al límite\)/.test(body),'');
  t('v86: ya no muestra una etiqueta única para todo el ejercicio',
    !/esfuerzo al límite<\/b>/.test(body));
  t('v86: el resumen dice a qué se refieren los kilos',/18 kg por mancuerna/.test(body));
  t('v86: y a qué se refieren las repeticiones',/10-12 por pierna/.test(body));
  t('v86: funciona con registros anteriores a la v85 (sin pesoRef)',/pautado/.test(body));
  const notas=w.document.getElementById('l-notes').value;
  t('v86: la plantilla de notas trae el esfuerzo por serie',
    /16 kg × 10 \(fácil\)/.test(notas),notas.slice(0,140));
  t('v86: la plantilla de notas trae la referencia de unidades',/por mancuerna/.test(notas));
  // helpers
  t('v86: fmtSerieUna con banda',!!w.fmtSerieUna&&/banda alta × 12/.test(w.fmtSerieUna({banda:'alta',reps:'12'})));
  t('v86: fmtSerieUna sin carga',!!w.fmtSerieUna&&/pc × 12/.test(w.fmtSerieUna({reps:'12'})));
  t('v86: fmtSetsDetalladas separa las series',
    !!w.fmtSetsDetalladas&&w.fmtSetsDetalladas({series:ser}).split(' · ').length===3);
  t('v86: sin series no rompe',!!w.fmtSetsDetalladas&&w.fmtSetsDetalladas({})==='');
  // historial
  w.S.history=[{key:k,title:'Fuerza (sesión IA)',duration:'40',feeling:'💪',
    sets:[{nombre:'Zancada inversa con mancuernas',pesoRef:'18 kg por mancuerna (una en cada mano)',
      repsRef:'10-12 por pierna',series:ser}]}];
  w.renderProg();
  const hl=w.document.getElementById('history');
  const hh=hl?hl.innerHTML:'';
  t('v86: el historial muestra el esfuerzo por serie',/fácil/.test(hh)&&/al límite/.test(hh),hh.slice(0,160));
  t('v86: el historial muestra el pautado',/por mancuerna/.test(hh));
}


/* ---------- 23. v87 · revisión previa del día --------------------------------------------------- */
if(!boot(null).ajustesDelDia){ t('v87: ajustesDelDia existe',false); } else {
  // escenario: hoy toca búlgara a 16 kg y press a 18 kg; el lunes...
  const mkW=()=>{
    const w=boot(estadoVeterano());
    w.S.dumbbells={min:8,max:30,step:2};
    const hoy=w.todayKey();
    const d=n=>{const x=new Date(hoy+'T00:00:00');x.setDate(x.getDate()-n);return w.fmt(x);};
    w.S.schedule[hoy]=[{type:'ai',title:'Cuerpo entero',done:false,exercises:[
      {nombre:'Sentadilla bulgara con mancuernas',series:4,reps:'8-10 por pierna',descanso_seg:120,rir:'1-2',
       peso:'16 kg por mancuerna (una en cada mano)'},
      {nombre:'Press de pecho en suelo con mancuernas',series:3,reps:'8-10',descanso_seg:90,rir:'1-2',
       peso:'18 kg por mancuerna (una en cada mano)'},
      {nombre:'Remo con mancuerna a una mano',series:3,reps:'10-12 por brazo',descanso_seg:90,rir:'1-2',
       peso:'22 kg por mancuerna (un brazo cada vez)'},
      {nombre:'AMRAP 8',tipo:'amrap',duracion_min:8,movimientos:[{nombre:'Burpees',reps:'8'}]}]}];
    w.S.history=[
      {key:d(2),type:'Fuerza (sesión IA)',sets:[
        // búlgara: tope del rango, solo la última al límite, con 16 → hay margen, hoy 18
        {nombre:'Sentadilla bulgara con mancuernas',series:[{kg:16,reps:'10',esf:'facil'},{kg:16,reps:'10',esf:'justo'},{kg:16,reps:'10',esf:'justo'},{kg:16,reps:'10',esf:'limite'}]},
        // press: el pautado de hoy (18) es MAYOR que lo hecho (16) y fue al límite → consolidar 16
        {nombre:'Press de pecho en suelo con mancuernas',series:[{kg:16,reps:'10',esf:'limite'},{kg:16,reps:'9',esf:'limite'},{kg:16,reps:'8',esf:'justo'}]},
        // remo: sin esfuerzo marcado → las reglas no se arriesgan a subir
        {nombre:'Remo con mancuerna a una mano',series:[{kg:22,reps:'12'},{kg:22,reps:'12'},{kg:22,reps:'12'}]}]}];
    return {w,hoy,d};
  };
  let {w,hoy,d}=mkW();
  let pr=w.ajustesDelDia(hoy,{estado:'normal',dolor:[]});
  const por=n=>pr.find(p=>p.nombre.indexOf(n)===0);
  // v88: 16→18 kg es un +13% y no cabe en 8-10: ya no se sube, se amplía el rango con la misma carga
  t('v87→v88: con margen pero salto que no cabe, NO sube la carga',por('Sentadilla')&&!por('Sentadilla').cambios.peso,
    JSON.stringify(por('Sentadilla')&&por('Sentadilla').cambios));
  t('v88: amplía el rango conservando «por pierna»',por('Sentadilla')&&(por('Sentadilla').cambios.reps||{}).despues==='8-13 por pierna',
    JSON.stringify(por('Sentadilla')&&por('Sentadilla').cambios));
  t('v87→v88: el motivo cita la fecha, el dato y el tamaño del salto',por('Sentadilla')&&/\+13%/.test(por('Sentadilla').motivos[0]||'')&&/18 kg/.test(por('Sentadilla').motivos[0]||''),
    por('Sentadilla')&&por('Sentadilla').motivos[0]);
  t('v87: consolida si lo pautado supera lo que salió al límite',
    por('Press')&&/16 kg por mancuerna/.test((por('Press').cambios.peso||{}).despues||''),JSON.stringify(por('Press')&&por('Press').cambios));
  t('v87: sin esfuerzo marcado, no sube por su cuenta',!por('Remo')||!por('Remo').cambios.peso);
  t('v87: los bloques AMRAP no se tocan',!pr.some(p=>/AMRAP/.test(p.nombre)));
  t('v87: la unidad del texto se conserva al cambiar la carga',
    (por('Press').cambios.peso||{}).despues==='16 kg por mancuerna (una en cada mano)');

  // llegar cansado
  pr=w.ajustesDelDia(hoy,{estado:'cansado',dolor:[]});
  t('v87: cansado → una serie menos',por('Remo')&&por('Remo').cambios.series&&por('Remo').cambios.series.despues===2);
  t('v87: cansado → RIR +1',por('Remo')&&por('Remo').cambios.rir&&por('Remo').cambios.rir.despues==='2-3');
  t('v87: cansado → NO sube carga aunque haya margen',por('Sentadilla')&&!por('Sentadilla').cambios.peso,
    JSON.stringify(por('Sentadilla')&&por('Sentadilla').cambios));
  t('v88: cansado → tampoco amplía el rango de repeticiones',por('Sentadilla')&&!por('Sentadilla').cambios.reps);
  t('v87: la descripción de carga es corta si solo cambia el número',
    w._descCambios({peso:{antes:'16 kg por mancuerna (una en cada mano)',despues:'18 kg por mancuerna (una en cada mano)'}})==='carga 16 → 18 kg · por mancuerna (una en cada mano)',
    w._descCambios({peso:{antes:'16 kg por mancuerna (una en cada mano)',despues:'18 kg por mancuerna (una en cada mano)'}}));
  // acotado: nunca por debajo de 2 series
  w.S.schedule[hoy][0].exercises[2].series=2;
  pr=w.ajustesDelDia(hoy,{estado:'cansado',dolor:[]});
  t('v87: nunca baja de 2 series',!por('Remo').cambios.series);
  w.S.schedule[hoy][0].exercises[2].series=3;

  // molestia articular de rodilla hoy
  pr=w.ajustesDelDia(hoy,{estado:'normal',dolor:['rodilla'],tipoDolor:'articular'});
  const bu=por('Sentadilla');
  t('v87: molestia de rodilla afecta a la búlgara',bu&&/rodilla/i.test(bu.motivos.join(' ')),JSON.stringify(bu&&bu.motivos));
  t('v87: con molestia NO sube, baja',bu&&w.parseKg((bu.cambios.peso||{}).despues)<16,JSON.stringify(bu&&bu.cambios.peso));
  t('v87: con molestia quita una serie',bu&&bu.cambios.series&&bu.cambios.series.despues===3);
  t('v87: la molestia de rodilla no toca el press',!por('Press')||!/rodilla/i.test(por('Press').motivos.join(' ')));
  // agujetas: aviso, no cambio
  pr=w.ajustesDelDia(hoy,{estado:'normal',dolor:['rodilla'],tipoDolor:'muscular'});
  t('v87: agujetas → aviso, sin retirar el patrón',por('Sentadilla')&&!/rodilla/i.test(por('Sentadilla').motivos.join(' '))&&por('Sentadilla').avisos.length>0);
  // molestia articular registrada hace 2 días también cuenta
  w.S.history.unshift({key:d(1),type:'Carrera',pain:['rodilla'],painKind:'articular'});
  pr=w.ajustesDelDia(hoy,{estado:'normal',dolor:[]});
  t('v87: la molestia registrada en las últimas 72 h cuenta',por('Sentadilla')&&/rodilla/i.test(por('Sentadilla').motivos.join(' ')));
  w.S.history.shift();

  // helpers
  t('v87: _rirMas1 rango',w._rirMas1('1-2')==='2-3');
  t('v87: _rirMas1 número',w._rirMas1('2')==='3');
  t('v87: _stepKg sube',w._stepKg(16,1,'16 kg por mancuerna')===18);
  t('v87: _stepKg baja',w._stepKg(16,-1,'16 kg por mancuerna')===14);
  t('v87: _stepKg en el tope no inventa',w._stepKg(30,1,'30 kg por mancuerna')===null);
  w.S.kettlebells={list:'8, 12, 16'};
  t('v87: con kettlebell usa SUS pesos',w._stepKg(12,1,'kettlebell de 12 kg')===16);

  // --- aplicar: UI completa -------------------------------------------------------------------
  ({w,hoy,d}=mkW());
  w.preSesion(hoy);
  let body=w.document.getElementById('player-body').innerHTML;
  t('v87 UI: pregunta cómo llegas',/¿Cómo llegas hoy\?/.test(body));
  t('v87 UI: pregunta por molestias',/¿Notas alguna molestia ahora\?/.test(body));
  w.preRevisar();
  body=w.document.getElementById('player-body').innerHTML;
  t('v87→v88 UI: lista las propuestas',/Sentadilla bulgara/.test(body)&&/repeticiones 8-10 por pierna → 8-13 por pierna/.test(body)&&/18 → 16 kg/.test(body),body.slice(0,300));
  t('v87 UI: cada propuesta con casilla marcada por defecto',/id="pp-0" checked/.test(body));
  t('v87 UI: ofrece copiar para Claude',/Copiar revisión para Claude/.test(body));
  // desmarco el press: rechazo esa propuesta
  const k=w.PRE.props.findIndex(p=>/^Press/.test(p.nombre));
  w.document.getElementById('pp-'+k).checked=false;
  w.preEmpezar(true);
  const ses=w.mainAISess(hoy);
  t('v87→v88: el ajuste aceptado se aplica',ses.exercises[0].reps==='8-13 por pierna'&&/^16 kg/.test(ses.exercises[0].peso),ses.exercises[0].reps);
  t('v87: el rechazado no se aplica',/^18 kg/.test(ses.exercises[1].peso),ses.exercises[1].peso);
  t('v87→v88: se guarda el original (reversible), también las repeticiones',ses.exercises[0]._preAjuste&&/^16 kg/.test(ses.exercises[0]._preAjuste.peso)&&ses.exercises[0]._preAjuste.reps==='8-10 por pierna');
  t('v87: queda constancia del ajuste',ses.ajusteDia&&ses.ajusteDia.cambios.length===2&&ses.ajusteDia.rechazados.length===1,
    JSON.stringify(ses.ajusteDia));
  t('v87: y persiste',((JSON.parse(w.localStorage.getItem('fitcoach')).schedule[hoy]||[])[0].ajusteDia||{}).fecha===hoy);
  t('v87: arranca la sesión guiada',w.P.active===true&&/Sentadilla bulgara/.test(w.document.getElementById('player-body').innerHTML));
  // al volver a empezar hoy no se repite la revisión
  w.closePlayer&&w.eval('P._terminando=true');w.closePlayer();
  w.preSesion(hoy);
  t('v87: la revisión no se repite el mismo día',w.P.active===true);
  // el ajuste viaja al historial y al mensaje semanal
  w.closePlayer();
  w.S.schedule[hoy][0].sets=[{nombre:'Sentadilla bulgara con mancuernas',series:[{kg:18,reps:'10',esf:'justo'}]}];
  w.openLog(hoy,'log');
  w.document.getElementById('l-dur').value='45';
  w.document.getElementById('l-type').value='Fuerza (sesión IA)';
  w.saveLog();
  const reg=w.S.history.find(h=>h.key===hoy);
  t('v87: el ajuste llega al historial',reg&&reg.ajusteDia&&reg.ajusteDia.cambios.length===2);
  const pw=w.buildPrompt('adapt');
  t('v87: el ajuste llega al mensaje semanal',/AJUSTE DEL DÍA \(reglas de la app/.test(pw));
  t('v87: con lo aplicado y lo rechazado',/aplicado Sentadilla bulgara/.test(pw)&&/rechacé Press/.test(pw));
  t('v87: el entrenador semanal recibe la regla para interpretarlo',/Si se repiten en el mismo sentido/.test(pw));
  // el cumplimiento dice que lo pautado se ajustó
  w.S.schedule[hoy][0].done=true;
  const cf=w.complianceFor(hoy);
  t('v87: el cumplimiento muestra el plan semanal original',cf&&/4×8-13 por pierna/.test(cf.filas[0].plan)&&/ajustado ese día; plan semanal: 4×8-10 por pierna @ 16 kg/.test(cf.filas[0].plan),cf&&cf.filas[0].plan);

  // --- Claude por copiar y pegar -------------------------------------------------------------
  ({w,hoy,d}=mkW());
  const dp=w.buildDailyPrompt(hoy,{estado:'cansado',dolor:['hombro'],tipoDolor:'articular'});
  t('v87 Claude: el mensaje es un ajuste del día, no una replanificación',/AJUSTE DEL DÍA: no replanifiques la semana/.test(dp));
  t('v87 Claude: lleva cómo llego',/CÓMO LLEGO HOY: cansado. Molestia ahora: Hombro \(molestia ARTICULAR\)/.test(dp));
  t('v87 Claude: lleva la sesión prevista',/Sentadilla bulgara con mancuernas: 4×8-10 por pierna @ 16 kg/.test(dp));
  t('v87 Claude: lleva lo último con esfuerzo por serie',/16 kg × 10 \(fácil\)/.test(dp));
  t('v87 Claude: lleva la referencia de unidades',/pautado: 16 kg por mancuerna/.test(dp));
  t('v87 Claude: lleva la propuesta de las reglas para que la valore',/PROPUESTA DE LA APP/.test(dp));
  t('v87 Claude: lleva los límites',/como máximo un escalón de carga/.test(dp));
  t('v88 Claude: lleva el criterio de carga y puede ampliar el rango',/la carga solo sube si el salto cabe en el rango/.test(dp)&&/"reps":"8-12 o null"/.test(dp));
  t('v87 Claude: lleva la lista de mancuernas',/8, 10, 12, 14, 16/.test(dp));
  t('v87 Claude: pide JSON',/Responde ÚNICAMENTE con un objeto JSON/.test(dp));
  t('v87 Claude: sin llamadas a la API',HTML.indexOf('api.anthropic.com')<0);
  // respuesta de Claude
  const resp={analisis:'Vienes bien del lunes; el hombro manda hoy.',ajustes:[
    {ejercicio:'Press de pecho en suelo con mancuernas',peso:'14 kg por mancuerna (una en cada mano)',series:2,rir:'3',sustituir_por:null,motivo:'Hombro: menos carga.'},
    {ejercicio:'Sentadilla bulgara con mancuernas',peso:null,series:6,rir:null,sustituir_por:null,motivo:'x'},
    {ejercicio:'Peso muerto que no existe',peso:'20 kg',series:3,motivo:'y'},
    {ejercicio:'Remo con mancuerna a una mano',peso:'23 kg por mancuerna',series:null,rir:null,motivo:'z'}]};
  const r=w.propsDesdeClaude(resp,hoy);
  const pp=n=>r.props.find(p=>p.nombre.indexOf(n)===0);
  t('v87 Claude: lee el ajuste de carga',pp('Press')&&pp('Press').cambios.peso.despues==='14 kg por mancuerna (una en cada mano)');
  t('v87 Claude: lee series y RIR',pp('Press')&&pp('Press').cambios.series.despues===2&&pp('Press').cambios.rir.despues==='3');
  t('v87 Claude: limita las series a ±1',pp('Sentadilla')&&pp('Sentadilla').cambios.series.despues===5,JSON.stringify(pp('Sentadilla')&&pp('Sentadilla').cambios));
  t('v87 Claude: avisa del exceso',r.errores.some(e=>/más de lo que permite/.test(e)));
  t('v87 Claude: ignora ejercicios que no están hoy',r.errores.some(e=>/no está en la sesión de hoy/.test(e))&&!pp('Peso muerto'));
  t('v87 Claude: avisa de un peso que no tienes',r.errores.some(e=>/23 kg no está en tu lista/.test(e)));
  t('v87 Claude: conserva el análisis',/el hombro manda hoy/.test(r.analisis));
  t('v87 Claude: JSON inválido no rompe',w.propsDesdeClaude(null,hoy).errores.length===1);
  // pegado real en la pantalla
  w.preSesion(hoy);w.preRevisar();
  w.document.getElementById('pre-resp').value=JSON.stringify(resp).replace(/"/g,'“').replace(/“(?=[,}\]:])/g,'”');
  w.preLeerClaude();
  const b2=w.document.getElementById('player-body').innerHTML;
  t('v87 Claude: la respuesta pegada se muestra como propuesta de Claude',/propuesta de Claude/.test(b2),b2.slice(0,200));
  t('v87 Claude: tolera comillas tipográficas de iOS',/18 → 14 kg/.test(b2),b2.slice(0,300));
  w.preEmpezar(true);
  t('v87 Claude: se registra que la fuente fue Claude',w.mainAISess(hoy).ajusteDia.fuente==='claude');
  t('v87 Claude: se guarda su análisis',/el hombro manda hoy/.test(w.mainAISess(hoy).ajusteDia.analisis));

  // --- persistencia: el estado del veterano no se toca por abrir la revisión --------------------
  const w3=boot(estadoVeterano());const antes=JSON.stringify(w3.S.history);
  const k3=Object.keys(w3.S.schedule)[0];
  w3.preSesion(k3);w3.preRevisar();w3.closePlayer();
  t('v87: abrir y cerrar la revisión no toca el historial',JSON.stringify(w3.S.history)===antes);
}

/* ============================================================================================ */
console.log('TZ =',Intl.DateTimeFormat().resolvedOptions().timeZone);

/* ---------- 1. Arranque limpio -------------------------------------------------------------- */
{
  const w=boot(null);
  t('arranque limpio: S existe',typeof w.S==='object'&&w.S!==null);
  t('arranque limpio: perfil por defecto',w.S.profile&&w.S.profile.minutos===45);
  t('v80 arranque limpio: weekNote inicializado',w.S.weekNote==='');
  t('v80 arranque limpio: dietaNota inicializado',w.S.profile.dietaNota==='');
  t('arranque limpio: no hay historial inventado',Array.isArray(w.S.history)&&w.S.history.length===0);
}

/* ---------- 2. Persistencia campo a campo del usuario veterano ------------------------------ */
{
  const orig=estadoVeterano();
  const w=boot(JSON.parse(JSON.stringify(orig)));
  const S=w.S;
  const comparar=(ruta,a,b)=>t('persistencia '+ruta,JSON.stringify(a)===JSON.stringify(b),
    JSON.stringify(a)+' vs '+JSON.stringify(b));
  ['aiDays','briefDays','freeDays','history','nutri','insight','baseline','health',
   'healthLog','weightLog','programStart','mesoLen','mesoFocus','dumbbells','bands','bandAnchor',
   'kettlebells','fontScale','cloud','lastBackup','coachLog','schedule']
    .forEach(k=>comparar(k,S[k],orig[k]));
  // weekPlans y earnedBadges son datos DERIVADOS: la app añade la foto de la semana en curso y
  // recalcula las insignias desde el historial. Lo que se comprueba es que no borran lo anterior.
  t('persistencia weekPlans (aditiva)',Object.keys(orig.weekPlans).every(k=>S.weekPlans[k]));
  t('persistencia earnedBadges (derivada, no rompe)',Array.isArray(S.earnedBadges));
  ['peso','altura','edad','sexo','nivel','minutos','objetivos','equipos','limitaciones','limitacionesNota']
    .forEach(k=>comparar('profile.'+k,S.profile[k],orig.profile[k]));
  t('v80: initState añade weekNote sin tocar nada',S.weekNote==='');
  t('v80: initState añade profile.dietaNota',S.profile.dietaNota==='');
  // las cargas serie a serie sobreviven
  const k=Object.keys(orig.schedule)[0];
  comparar('schedule.sets',S.schedule[k][0].sets,orig.schedule[k][0].sets);
}

/* ---------- 3. C1 · la nota semanal se persiste --------------------------------------------- */
{
  const w=boot(null);
  const wn=w.document.getElementById('week-note');
  t('C1: existe el campo week-note',!!wn);
  wn.value='esta semana evita saltos';
  wn.dispatchEvent(new w.Event('change'));
  t('C1: la nota se guarda en S',w.S.weekNote==='esta semana evita saltos');
  const _ls=w.localStorage.getItem('fitcoach');
  t('C1: la nota está en localStorage',!!_ls&&JSON.parse(_ls).weekNote==='esta semana evita saltos');
  // simula reinicio de la app (iOS descarta la PWA): el DOM arranca vacío
  const w2=boot(_ls?JSON.parse(_ls):null);
  t('C1: la nota sobrevive al reinicio',w2.S.weekNote==='esta semana evita saltos');
  t('C1: userNoteFrom la recupera aunque el campo esté vacío',
    w2.userNoteFrom('week-note')==='esta semana evita saltos');
  // y el prompt la incluye
  w2.S.profile.peso='80';w2.S.profile.altura='180';w2.S.profile.edad='40';
  const p=w2.buildPrompt('new');
  t('C1: la nota llega al mensaje de Claude',p.indexOf('esta semana evita saltos')>=0);
}
/* regresión v79: la nota NO se persistía */
{
  const v79=fs.existsSync('index-v79.html');
  if(v79){
    const HTML80=HTML;
    const html79=fs.readFileSync('index-v79.html','utf8');
    t('contraste v79: la nota semanal NO se persistía',html79.indexOf("S.weekNote")<0);
    t('contraste v79: no existía el campo de alimentación',html79.indexOf('dieta-nota')<0);
    t('contraste v79: prohibía la descarga en absoluto',html79.indexOf('NO programes semanas de descarga')>=0);
    t('contraste v80: ya no la prohíbe en absoluto',HTML80.indexOf('NO programes semanas de descarga')<0);
  }
}

/* ---------- 4. A2 · alcance de la nota libre ------------------------------------------------ */
{
  const w=boot(estadoVeterano());
  w.S.weekNote='quiero sentadillas pesadas todos los días';
  const p=w.buildPrompt('adapt');
  t('A2: la nota ya no tiene prioridad sobre todo el mensaje',
    p.indexOf('tienen prioridad sobre las preferencias generales')<0);
  t('A2: la seguridad queda por encima de la nota',
    p.indexOf('NO tienen prioridad sobre las limitaciones')>=0);
  t('A2: se le pide contradecir al usuario',p.indexOf('no me des la razón por comodidad')>=0);
}

/* ---------- 5. A1 · descarga condicional y autoridad ---------------------------------------- */
{
  const w=boot(estadoVeterano());
  const p=w.buildPrompt('adapt');
  t('A1: no hay prohibición absoluta de descarga',p.indexOf('NO programes semanas de descarga')<0);
  t('A1: sigue prohibida la semana de descanso',p.indexOf('no programes NUNCA una semana de descanso')>=0);
  t('A1: aparece la semana de volumen reducido',p.indexOf('VOLUMEN REDUCIDO')>=0);
  t('A1: hay indicaciones concretas',p.indexOf('1RM estimado plano o a la baja')>=0);
  t('A1: mandato de contradecir la preferencia',p.indexOf('AUTORIDAD DE ENTRENADOR')>=0);
  t('A1: la regla también está en las reglas de adaptación',
    p.indexOf('Nunca una semana de descanso: entreno siempre')>=0);
}

/* ---------- 6. A3/B5/B9/B1 · estructura, fechas, orden, tiempo ------------------------------ */
{
  const w=boot(estadoVeterano());
  const p=w.buildPrompt('adapt');
  t('A3: ya no fuerza cuerpo entero',p.indexOf('cuerpo entero): ')<0);
  t('A3: deja elegir la estructura',p.indexOf('ESTRUCTURA DE LA SEMANA')>=0);
  t('A3: los días llevan fecha',/L \(Lunes \d+\/\d+\)/.test(p));
  t('A3: avisa de los días consecutivos',p.indexOf('48 h entre estímulos fuertes')>=0);
  t('B9: orden de ejercicios',p.indexOf('ORDEN DENTRO DE LA SESIÓN')>=0);
  t('B1: presupuesto de tiempo',p.indexOf('PRESUPUESTO DE TIEMPO')>=0);
  t('B5: orden fuerza/carrera en días breves',p.indexOf('ANTES o DESPUÉS de la carrera')>=0);
}

/* ---------- 7. B4/B6/B7 · patrones, edad, sexo, mínimo aeróbico ----------------------------- */
{
  const w=boot(estadoVeterano()); // 58 años, mujer
  const p=w.buildPrompt('adapt');
  t('B4: equilibrio de patrones',p.indexOf('EQUILIBRIO DE PATRONES')>=0);
  t('B4: pide el campo patron',p.indexOf('"patron"')>=0);
  t('B4: tirón nunca por debajo de la mitad del empuje',p.indexOf('nunca menor que la mitad')>=0);
  t('B6: bloque de edad ≥55',p.indexOf('EDAD (58 años)')>=0);
  t('B6: potencia y equilibrio',p.indexOf('EQUILIBRIO / apoyo monopodal')>=0);
  t('B6: bloque de sexo',p.indexOf('NO programes por fases del ciclo menstrual')>=0);
  t('B7: mínimo aeróbico',p.indexOf('MÍNIMO AERÓBICO DE SALUD')>=0);
  t('B2: series de aproximación',p.indexOf('SERIES DE APROXIMACIÓN')>=0);

  const e2=estadoVeterano();e2.profile.edad='34';e2.profile.sexo='hombre';
  const w2=boot(e2);const p2=w2.buildPrompt('adapt');
  t('B6: sin bloque de edad si es joven',p2.indexOf('EDAD (34 años)')<0);
  t('B6: sin bloque de sexo si es hombre',p2.indexOf('ciclo menstrual')<0);
}

/* ---------- 8. B8 · nutrición ---------------------------------------------------------------- */
{
  const w=boot(estadoVeterano());
  let p=w.buildPrompt('adapt');
  t('B8: sin restricciones, lo dice',p.indexOf('no he indicado restricciones')>=0);
  t('B8: ciclo cerrado de calorías',p.indexOf('AJUSTE CALÓRICO CON MI PESO REAL')>=0);
  t('B8: ritmos de referencia',p.indexOf('0,25-0,5%')>=0);
  t('B8: honestidad sobre el menú',p.indexOf('PRECISIÓN DEL MENÚ')>=0);
  w.S.profile.dietaNota='sin lactosa; no como pescado';
  p=w.buildPrompt('adapt');
  t('B8: las restricciones llegan al mensaje',p.indexOf('sin lactosa; no como pescado')>=0);
  const dn=w.document.getElementById('dieta-nota');
  t('B8: existe el campo en Perfil',!!dn);
  if(dn){dn.value='vegetariano';dn.dispatchEvent(new w.Event('change'));}
  t('B8: el campo se guarda',w.S.profile.dietaNota==='vegetariano');
  const _ls2=w.localStorage.getItem('fitcoach');
  t('B8: y persiste',!!_ls2&&JSON.parse(_ls2).profile.dietaNota==='vegetariano');
}

/* ---------- 9. B3 · esfuerzo por serie ------------------------------------------------------- */
if(!boot(null).esfResumen){ t('B3: esfResumen existe',false); } else {
  const w=boot(estadoVeterano());
  t('B3: esfResumen vacío sin datos',w.esfResumen([{kg:10,reps:'10'}])==='');
  t('B3: esfResumen fácil',w.esfResumen([{esf:'facil'},{esf:'facil'}])==='fácil');
  t('B3: esfResumen al límite manda',w.esfResumen([{esf:'facil'},{esf:'limite'}])==='al límite');
  t('B3: esfResumen justo',w.esfResumen([{esf:'facil'},{esf:'justo'}])==='justo');
  // complianceFor: tope del rango pero al límite → NO subir
  const k=Object.keys(w.S.schedule)[0];
  const sets=w.S.schedule[k][0].sets;
  sets[0].tec='ok'; // v92: es su 1.ª sesión; con técnica confirmada se prueba el camino de Epley
  sets[0].series.forEach(s=>s.esf='limite');
  let c=w.complianceFor(k);
  const fila=(c&&c.filas.find(f=>f.nombre==='Press mancuerna'))||{estado:'',real:''};
  t('B3: al límite → consolidar, no subir',/consolidar esta carga/.test(fila.estado),fila.estado);
  t('B3: el esfuerzo viaja en "realizado"',/al límite/.test(fila.real),fila.real);
  sets[0].series.forEach(s=>s.esf='justo');
  c=w.complianceFor(k);
  // v88: 16 kg ×12 en 8-12 a RIR ~1: 16→18 (+13%) dejaría ~7 rep. → no cabe, se amplía el rango
  const est9=()=>((c&&c.filas.find(f=>f.nombre==='Press mancuerna'))||{estado:''}).estado;
  t('B3→v88: con 1 de margen el salto de +13% no cabe → misma carga, rango 8-14',/rango ampliado a 8-14/.test(est9()),est9());
  sets[0].series.forEach(s=>s.esf='facil');
  c=w.complianceFor(k);
  t('B3→v88: con 3 de margen el salto cabe → sube y vuelve a la parte baja',/sube a 18 kg \(\+13%\) y vuelve a la parte baja del rango \(8-9 rep\.\)/.test(est9()),est9());
  // regresión: sin esfuerzo registrado se comporta como antes
  sets[0].series.forEach(s=>{delete s.esf;});
  c=w.complianceFor(k);
  t('B3→v88: sin esfuerzo no se bloquea la progresión; se supone 1 de margen',
    /sin dato de esfuerzo/.test(((c&&c.filas.find(f=>f.nombre==='Press mancuerna'))||{estado:''}).estado),
    ((c&&c.filas.find(f=>f.nombre==='Press mancuerna'))||{estado:''}).estado);
  t('B3: el prompt explica el dato nuevo',w.buildPrompt('adapt').indexOf('El "esfuerzo por serie" es lo que marqué')>=0);
  t('B3→v88: la escala es RIR 0, 1, 2, 3 o más',!!(w.__k.RIR_OPTS&&w.__k.RIR_OPTS().length===4));
}

/* ---------- 10. B1/C2 · duración estimada y comprobaciones de entrenador -------------------- */
if(!boot(null).estimateSessionMin){ t('B1/C2: estimateSessionMin existe',false); } else {
  const w=boot(estadoVeterano()); // minutos = 50
  const est=w.estimateSessionMin([
    {nombre:'A',series:4,reps:'8-12',descanso_seg:120},
    {nombre:'B',series:4,reps:'8-12',descanso_seg:120},
    {nombre:'C',series:4,reps:'8-12',descanso_seg:120},
    {nombre:'D',series:4,reps:'8-12',descanso_seg:120},
    {nombre:'E',series:4,reps:'8-12',descanso_seg:120},
    {nombre:'F',series:4,reps:'8-12',descanso_seg:120}]);
  t('B1: estima una sesión larga como larga',est>60,'estimado '+est);
  const corta=w.estimateSessionMin([{nombre:'A',series:3,reps:'10',descanso_seg:60}]);
  t('B1: estima una sesión corta como corta',corta<20,'estimado '+corta);
  t('B1: cuenta el calentamiento',w.estimateSessionMin([])===6);
  t('B1: ejercicios por tiempo ("40s")',
    w.estimateSessionMin([{nombre:'X',series:4,reps:'40s',descanso_seg:20}])===6+Math.round(4*60/60));
  // plan que no cabe → aviso
  const plan={sesiones_ia:[{dia_codigo:'L',titulo:'Larga',ejercicios:[
    {nombre:'Press mancuerna',series:5,reps:'8-12',descanso_seg:150,peso:'16 kg por mancuerna',patron:'empuje_horizontal'},
    {nombre:'Press militar',series:5,reps:'8-12',descanso_seg:150,peso:'12 kg por mancuerna',patron:'empuje_vertical'},
    {nombre:'Aperturas',series:5,reps:'12-15',descanso_seg:120,peso:'8 kg por mancuerna',patron:'empuje_horizontal'},
    {nombre:'Fondos en banco',series:5,reps:'10-12',descanso_seg:120,peso:'solo peso corporal',patron:'empuje_horizontal'},
    {nombre:'Elevaciones laterales',series:5,reps:'12-15',descanso_seg:90,peso:'6 kg por mancuerna',patron:'empuje_vertical'},
    {nombre:'Plancha',series:4,reps:'40s',descanso_seg:60,peso:'solo peso corporal',patron:'core_antiextension'}]}]};
  const iss=w.validatePlan(plan);
  t('C2: avisa de que la sesión no cabe',iss.warns.some(x=>/min estimados/.test(x)),JSON.stringify(iss.warns));
  t('C2: avisa del tren inferior ausente',iss.warns.some(x=>/Tren inferior infrarrepresentado/.test(x)));
  t('C2: avisa del desequilibrio empuje/tirón',iss.warns.some(x=>/Desequilibrio empuje\/tirón/.test(x)));
  t('C2: no inventa errores bloqueantes',iss.errors.length===0,JSON.stringify(iss.errors));
  // plan equilibrado y corto → sin avisos de entrenador
  const bien={sesiones_ia:[{dia_codigo:'L',titulo:'Cuerpo entero',ejercicios:[
    {nombre:'Sentadilla goblet',series:3,reps:'8-12',descanso_seg:90,peso:'16 kg en una sola mancuerna',patron:'rodilla'},
    {nombre:'Peso muerto rumano',series:3,reps:'8-12',descanso_seg:90,peso:'18 kg por mancuerna',patron:'cadera'},
    {nombre:'Press mancuerna',series:3,reps:'8-12',descanso_seg:75,peso:'16 kg por mancuerna',patron:'empuje_horizontal'},
    {nombre:'Remo mancuerna',series:3,reps:'8-12',descanso_seg:75,peso:'18 kg por mancuerna',patron:'tiron_horizontal'},
    {nombre:'Jalón con banda',series:3,reps:'12-15',descanso_seg:60,peso:'banda media',patron:'tiron_vertical'},
    {nombre:'Plancha',series:3,reps:'40s',descanso_seg:45,peso:'solo peso corporal',patron:'core_antiextension'}]}]};
  const iss2=w.validatePlan(bien);
  t('C2: plan correcto sin avisos de reparto',
    !iss2.warns.some(x=>/Tren inferior|Desequilibrio|min estimados/.test(x)),JSON.stringify(iss2.warns));
  // carga ambigua
  const amb=w.validatePlan({sesiones_ia:[{dia_codigo:'L',titulo:'x',ejercicios:[
    {nombre:'Press banca',series:3,reps:'8-12',descanso_seg:90,peso:'20 kg'}]}]});
  t('C2: detecta carga ambigua',amb.warns.some(x=>/ambigua/.test(x)),JSON.stringify(amb.warns));
  const noAmb=w.validatePlan({sesiones_ia:[{dia_codigo:'L',titulo:'x',ejercicios:[
    {nombre:'Press banca',series:3,reps:'8-12',descanso_seg:90,peso:'20 kg por mancuerna'}]}]});
  t('C2: no marca ambigua una carga aclarada',!noAmb.warns.some(x=>/ambigua/.test(x)));
  // material no disponible
  const mat=w.validatePlan({sesiones_ia:[{dia_codigo:'L',titulo:'x',ejercicios:[
    {nombre:'Jalón en polea',series:3,reps:'10',descanso_seg:90,peso:'40 kg en total'}]}]});
  t('C2: avisa de material de gimnasio',mat.warns.some(x=>/gimnasio/.test(x)));
  // avisa si no viene ningún patrón
  const sinPat=w.validatePlan({sesiones_ia:[{dia_codigo:'L',titulo:'x',ejercicios:
    ['Sentadilla','Peso muerto','Press','Remo','Plancha','Zancada'].map(n=>
      ({nombre:n,series:2,reps:'10',descanso_seg:45,peso:'solo peso corporal'}))}]});
  t('C2: avisa si falta el campo patron',sinPat.warns.some(x=>/campo "patron"/.test(x)));
}

/* ---------- 11. Regresiones de versiones anteriores ------------------------------------------ */
{
  const w=boot(estadoVeterano());
  // v78/v79: bloques AMRAP/circuito
  t('regresión: isBlock reconoce amrap',
    w.isBlock({tipo:'amrap',duracion_min:12,movimientos:[{nombre:'Flexiones',reps:'10'}]}));
  t('regresión v79: descanso entre rondas se conserva',
    w.cleanEx({nombre:'C',tipo:'circuito',rondas:3,descanso_rondas_seg:45,
      movimientos:[{nombre:'a',reps:'10'}]}).descanso_rondas_seg===45);
  t('regresión: los bloques no disparan errores de validación',
    w.validatePlan({sesiones_ia:[{dia_codigo:'L',titulo:'x',ejercicios:[
      {nombre:'AMRAP 12',tipo:'amrap',duracion_min:12,movimientos:[{nombre:'a',reps:'10'}]}]}]}).errors.length===0);
  // v72: comillas tipográficas
  t('regresión: looseJSON tolera comillas tipográficas',
    w.looseJSON('{\u201Ca\u201D:\u201Cb\u201D}').a==='b');
  t('regresión: looseJSON tolera texto alrededor',w.looseJSON('bla {"a":1} bla').a===1);
  // fechas locales
  t('regresión: ymd usa hora local',w.ymd(new Date(2026,0,1))==='2026-01-01');
  t('regresión: fmt usa hora local',w.fmt(new Date(2026,11,31))==='2026-12-31');
  t('regresión: daysBetween cruza cambio de hora',w.daysBetween('2026-03-28','2026-03-30')===2);
  t('regresión: no hay llamadas a api.anthropic.com',HTML.indexOf('api.anthropic.com')<0);
  t('regresión: patron se sanea como cadena',
    typeof w.cleanEx({nombre:'x',patron:'rodilla'}).patron==='string');
  // el campo nuevo sobrevive al cleanEx
  t('v80: cleanEx conserva patron',w.cleanEx({nombre:'x',patron:'cadera'}).patron==='cadera');
  // C3: coherencia de RIR en fuerza
  t('C3: RIR de fuerza coherente con el bloque de evidencia',HTML.indexOf("fuerza:{reps:'3-6',sets:[3,4],rest:[150,210],rir:'3-4'")>=0);
  // el motor offline sigue vivo
  const sess=w.buildSessionOffline(new Set(['mancuernas']),'musculo','intermedio',45,'L',1,false,{});
  t('regresión: el generador offline sigue produciendo ejercicios',
    sess&&Array.isArray(sess.ejercicios)&&sess.ejercicios.length>0);
}

/* ---------- 12. Aplicar un plan no destruye datos -------------------------------------------- */
{
  const w=boot(estadoVeterano());
  const antesHist=JSON.stringify(w.S.history);
  const antesPeso=JSON.stringify(w.S.weightLog);
  const dates=w.weekDates(w.S.currentWeek);
  const key=w.fmt(dates[0]);
  w.S.schedule[key]=[{type:'ai',title:'previa',done:false,exercises:[],
    sets:[{nombre:'Press mancuerna',series:[{kg:16,reps:'12'}]}]}];
  w.applyBridgePlan({sesiones_ia:[{dia_codigo:'L',titulo:'Nueva',ejercicios:[
    {nombre:'Sentadilla goblet',series:3,reps:'10',descanso_seg:90,peso:'16 kg en una sola mancuerna'}]}],
    nutricion:{calorias_diarias:2000,proteina_g:140,agua_litros:2.5,menu_dia:[]},
    mesociclo:{enfoque:'Intensificación',semanas_bloque:4,justificacion:'x'}});
  t('v74: las cargas anotadas sobreviven a aplicar un plan',
    (w.S.schedule[key].find(x=>x.type==='ai').sets||[]).length===1);
  t('aplicar plan no toca el historial',JSON.stringify(w.S.history)===antesHist);
  t('aplicar plan no toca el peso',JSON.stringify(w.S.weightLog)===antesPeso);
  t('aplicar plan actualiza el enfoque',w.S.mesoFocus==='Intensificación');
}


/* ---------- 13. B3 · el reproductor pinta los botones de esfuerzo ---------------------------- */
{
  const w=boot(estadoVeterano());
  const key=Object.keys(w.S.schedule)[0];
  w.S.schedule[key][0].done=false;
  w.startPlayer(key);
  const body=w.document.getElementById('player-body').innerHTML;
  t('B3→v88 UI: aparecen los cuatro botones de RIR',
    /id="rir-0"/.test(body)&&/id="rir-1"/.test(body)&&/id="rir-2"/.test(body)&&/id="rir-3"/.test(body));
  t('B3→v88 UI: la pregunta es concreta',/¿Cuántas repeticiones más podrías haber hecho/.test(body));
  w.setRir(0);
  t('B3 UI: al pulsar se marca',/esf-on/.test(w.document.getElementById('rir-0').className));
  t('B3 UI: los otros quedan sin marcar',!/esf-on/.test(w.document.getElementById('rir-3').className));
  w.setRir(0);
  t('B3 UI: volver a pulsar deselecciona',!/esf-on/.test(w.document.getElementById('rir-0').className));
  w.setEsf('justo'); // compatibilidad: la escala antigua se traduce a RIR 1
  // registrar la serie guarda el esfuerzo
  w.document.getElementById('pl-kg').value='16';
  w.document.getElementById('pl-reps').value='11';
  w.recordSet(w.S.schedule[key][0].exercises[0]);
  const guardado=w.S.schedule[key][0].sets.find(x=>x.nombre==='Press mancuerna');
  t('B3 UI: el esfuerzo se guarda con la serie',
    guardado.series[guardado.series.length-1].esf==='justo',JSON.stringify(guardado.series.slice(-1)));
}


/* ---------- 14. v81 · alternativas coherentes ------------------------------------------------ */
if(!boot(null).muscleGroup){ t('v81: muscleGroup existe',false); } else {
  const w=boot(estadoVeterano()); // material: mancuernas + bandas, CON anclaje

  // --- clasificador de grupo muscular
  t('v81: cuádriceps es el principal en "Cuádriceps, glúteos"',w.muscleGroup('Cuádriceps, glúteos')==='cuádriceps');
  t('v81: "Isquios, glúteos" es cadena posterior',w.muscleGroup('Isquios, glúteos')==='glúteos e isquios');
  t('v81: "Pecho, tríceps" es pecho',w.muscleGroup('Pecho, tríceps')==='pecho');
  t('v81: "Deltoides posterior" es hombro',w.muscleGroup('Deltoides posterior')==='hombro');
  t('v81: "Dorsal" es espalda',w.muscleGroup('Dorsal')==='espalda');
  t('v81: "Oblicuos" es core',w.muscleGroup('Oblicuos')==='core');
  t('v81: sin match cae en otro',w.muscleGroup('')==='otro');

  // --- material: las alternativas se filtran por lo que hay
  const exPress={nombre:'Press de banca',p:'empuje',musculos:'Pecho, tríceps',peso:'40 kg en total incluida la barra'};
  const sessP={exercises:[exPress]};
  let alts=w.altsFor(exPress,sessP)||[];
  t('v81: con mancuernas, "Press con mancuernas" es alternativa',
    alts.some(a=>a.nombre==='Press con mancuernas'),JSON.stringify(alts.map(a=>a.nombre)));
  // ahora sin material ninguno
  w.S.profile.equipos=['ninguno'];
  alts=w.altsFor(exPress,sessP)||[];
  t('v81: sin material, ya NO ofrece press con mancuernas',
    !alts.some(a=>a.nombre==='Press con mancuernas'),JSON.stringify(alts.map(a=>a.nombre)));
  t('v81: sin material, sí ofrece flexiones',alts.some(a=>a.nombre==='Flexiones'));
  // dominadas: jalón con banda necesita banda Y anclaje
  const exDom={nombre:'Dominadas',p:'tiron',musculos:'Dorsal, bíceps'};
  w.S.profile.equipos=['bandas'];w.S.bandAnchor=false;
  let ad=w.altsFor(exDom,{exercises:[exDom]})||[];
  t('v81: sin anclaje, no ofrece jalón con banda',!ad.some(a=>a.nombre==='Jalón con banda'),
    JSON.stringify(ad.map(a=>a.nombre)));
  t('v81: sin anclaje, sí ofrece remo sentado con banda',ad.some(a=>a.nombre==='Remo sentado con banda'));
  w.S.bandAnchor=true;
  ad=w.altsFor(exDom,{exercises:[exDom]})||[];
  t('v81: con anclaje, vuelve el jalón con banda',ad.some(a=>a.nombre==='Jalón con banda'));
  t('v81: con solo bandas, no ofrece remo con mancuerna',!ad.some(a=>a.nombre==='Remo con mancuerna'));

  // --- no repetir lo que ya está en la sesión
  w.S.profile.equipos=['mancuernas','bandas'];
  const sessDup={exercises:[exDom,{nombre:'Remo con mancuerna',p:'tiron',musculos:'Dorsal, romboides'}]};
  const adup=w.altsFor(exDom,sessDup)||[];
  t('v81: no ofrece como alternativa algo que ya está en la sesión',
    !adup.some(a=>a.nombre==='Remo con mancuerna'),JSON.stringify(adup.map(a=>a.nombre)));

  // --- buscador: mismo grupo primero, otro grupo marcado
  w.S.profile.equipos=['mancuernas','bandas']; // para que el rumano sea candidato de verdad
  const exSent={nombre:'Sentadilla goblet',p:'pierna',musculos:'Cuádriceps, glúteos'};
  const sessS={exercises:[exSent,{nombre:'Peso muerto rumano',p:'pierna',musculos:'Isquios, glúteos'}]};
  const comp=w.compatibleExercises(exSent,sessS);
  t('v81: el buscador devuelve algo',comp.length>0);
  t('v81: los del mismo grupo van primero',comp[0].mismo===true,comp[0].n+' / '+comp[0].g);
  t('v81: excluye lo que ya está en la sesión',!comp.some(e=>e.n==='Peso muerto rumano'));
  t('v81: marca los que trabajan un grupo ya cubierto hoy',
    comp.some(e=>e.g==='glúteos e isquios'&&e.yaHoy===true),
    JSON.stringify(comp.filter(e=>!e.mismo).map(e=>e.n+':'+e.g+':'+e.yaHoy)));
  t('v81: no ofrece material que no tengo',
    !comp.some(e=>e.n==='Sentadilla con barra'||e.n==='Prensa de piernas'),
    JSON.stringify(comp.map(e=>e.n)));
  // sin sesión (compatibilidad hacia atrás): no debe romper
  t('v81: compatibleExercises sin sesión no rompe',Array.isArray(w.compatibleExercises(exSent)));

  // --- la carga se ajusta al cambiar de ejercicio
  t('v81: a peso corporal, la carga se limpia',
    w.pesoTrasCambio('16 kg por mancuerna',['ninguno'])==='solo peso corporal');
  t('v81: a banda, la carga pasa a tensión',
    /banda/.test(w.pesoTrasCambio('16 kg por mancuerna',['bandas'])));
  t('v81: con mancuernas se conserva la carga',
    w.pesoTrasCambio('16 kg por mancuerna',['mancuernas','gimnasio'])==='16 kg por mancuerna');
  t('v81: sin equipo declarado no se toca',
    w.pesoTrasCambio('16 kg por mancuerna',[])==='16 kg por mancuerna');

  // --- swap real sobre la agenda
  const key=Object.keys(w.S.schedule)[0];
  const sess=w.S.schedule[key][0];
  sess.exercises=[{nombre:'Press de banca',p:'empuje',musculos:'Pecho, tríceps',
    series:3,reps:'8-12',descanso_seg:90,peso:'40 kg en total incluida la barra'}];
  w.S.profile.equipos=['ninguno'];
  w.S.viewKey=key;
  const opts=[null].concat(w.altsFor(sess.exercises[0],sess)||[]);
  const idxFlex=opts.findIndex(o=>o&&o.nombre==='Flexiones');
  w.swapExercise(key,0,idxFlex);
  const ex0=w.S.schedule[key][0].exercises[0];
  t('v81: el swap cambia el nombre',ex0.nombre==='Flexiones');
  t('v81: el swap arregla la carga heredada',ex0.peso==='solo peso corporal',String(ex0.peso));
  t('v81: el swap actualiza el patrón',ex0.p==='empuje');
  t('v81: guarda el original para poder volver',ex0._orig&&ex0._orig.nombre==='Press de banca');
  w.swapExercise(key,0,0);
  const ex1=w.S.schedule[key][0].exercises[0];
  t('v81: volver al original recupera nombre',ex1.nombre==='Press de banca');
  t('v81: volver al original recupera la carga',ex1.peso==='40 kg en total incluida la barra',String(ex1.peso));
  // swapToName también ajusta la carga
  w.S.profile.equipos=['mancuernas'];
  sess.exercises=[{nombre:'Press de banca',p:'empuje',musculos:'Pecho, tríceps',
    series:3,reps:'8-12',descanso_seg:90,peso:'40 kg en total incluida la barra'}];
  delete sess.exercises[0]._orig;
  w.swapToName(key,0,'Flexiones');
  const ex2=w.S.schedule[key][0].exercises[0];
  t('v81: swapToName cambia el ejercicio',ex2.nombre==='Flexiones');
  t('v81: swapToName ajusta la carga',ex2.peso==='solo peso corporal',String(ex2.peso));
}

/* ---------- 24. v88 · reauditoría con 18 semanas de datos reales -------------------------------- */
if(!boot(null).decisionProgresion){ t('v88: decisionProgresion existe',false); } else {
  const hoyD=new Date();
  const dd=n=>{const x=new Date(hoyD);x.setDate(x.getDate()-n);
    return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');};

  // --- A. initState aditivo -------------------------------------------------------------------
  {
    const orig=estadoVeterano();const w=boot(JSON.parse(JSON.stringify(orig)));
    t('v88 A: initState añade waistLog',Array.isArray(w.S.waistLog)&&w.S.waistLog.length===0);
    t('v88 A: initState añade blockStart y blockNum',w.S.blockStart===''&&w.S.blockNum===0);
    t('v88 A: sin tocar historial, peso ni marcadores',JSON.stringify(w.S.history)===JSON.stringify(orig.history)
      &&JSON.stringify(w.S.weightLog)===JSON.stringify(orig.weightLog)&&JSON.stringify(w.S.healthLog)===JSON.stringify(orig.healthLog));
    const mi=w.mesoInfo(w.programWeekFor(w.todayKey()),w.todayKey());
    t('v88 A: sin ancla, el bloque se cuenta como antes',mi&&!mi.ancla&&mi.block===Math.floor((mi.weekNum-1)/4)+1);
  }

  // --- B. identidad de ejercicio --------------------------------------------------------------
  {
    const w=boot(estadoVeterano());
    t('v88 B: mismo ejercicio con y sin material ni acentos',w.mismoEjercicio('Sentadilla búlgara','Sentadilla bulgara con mancuernas'));
    t('v88 B: singular y plural',w.mismoEjercicio('Zancadas','Zancada'));
    t('v88 B: material distinto NO se fusiona',!w.mismoEjercicio('Sentadilla goblet con kettlebell','Sentadilla goblet con mancuerna'));
    t('v88 B: variante distinta NO se fusiona',!w.mismoEjercicio('Curl de bíceps','Curl martillo')&&!w.mismoEjercicio('Remo con mancuerna a una mano','Remo con mancuernas'));
    t('v88 B: vacío no casa con nada',!w.mismoEjercicio('','Remo')&&!w.mismoEjercicio(null,null));
    w.S.history=[{key:dd(4),title:'Fuerza',sets:[{nombre:'Sentadilla búlgara',series:[{kg:16,reps:'10'}]}]}];
    const u=w.ultimoRegistro('Sentadilla bulgara con mancuernas',w.todayKey());
    t('v88 B: la última marca se encuentra aunque el nombre varíe',u&&u.fecha===dd(4));
    t('v88 B: el 1RM estimado agrupa por identidad',w.e1rmProgressionFor('Sentadilla bulgara con mancuernas').values.length===1);
    w.S.history=[{key:dd(60),title:'Fuerza',sets:[{nombre:'Goblet antigua',series:[{kg:8,reps:'10'}]}]},
                 {key:dd(3),title:'Fuerza',sets:[{nombre:'Press actual',series:[{kg:16,reps:'10'}]}]}];
    const top=w.e1rmTopSummary(6).join(' | ');
    t('v88 B: el resumen de fuerza solo usa las últimas 6 semanas',/Press actual/.test(top)&&!/Goblet antigua/.test(top),top);
  }

  // --- C. reproductor: RIR numérico, sin arrastre, serie a fallo técnico ------------------------
  {
    const w=boot(estadoVeterano());
    w.S.profile.limitaciones=[];w.S.profile.limitacionesNota='';
    const k=w.todayKey();
    w.S.schedule[k]=[{type:'ai',title:'C',done:false,ajusteDia:{fecha:k,cambios:[],rechazados:[]},exercises:[
      {nombre:'Curl de biceps con mancuernas',series:2,reps:'8-12',descanso_seg:60,rir:'1-2',peso:'12 kg por mancuerna (una en cada mano)'},
      {nombre:'Sentadilla goblet',series:2,reps:'8-12',descanso_seg:60,peso:'una sola mancuerna de 16 kg'}]}];
    const ex=w.S.schedule[k][0].exercises;
    t('v88 C: un monoarticular seguro admite fallo técnico',w.esFalloTecnico(ex[0])===true);
    t('v88 C: una sentadilla nunca, por defecto',w.esFalloTecnico(ex[1])===false);
    t('v88 C: el entrenador puede desactivarlo',w.esFalloTecnico(Object.assign({},ex[0],{fallo_tecnico:false}))===false);
    t('v88 C: las series por tiempo no van a fallo',w.esFalloTecnico({nombre:'Curl isométrico',reps:'30s',series:2})===false);
    w.startPlayer(k);
    let body=w.document.getElementById('player-body').innerHTML;
    t('v88 C: la serie 1 pregunta el RIR',/id="rir-0"/.test(body)&&!/pl-fallo/.test(body));
    t('v88 C: ningún RIR viene premarcado',!/esf-b esf-on/.test(body));
    w.document.getElementById('pl-kg').value='12';w.document.getElementById('pl-reps').value='12';
    w.setRir(1);
    w.finishSet();
    w.skipRest&&w.skipRest();
    body=w.document.getElementById('player-body').innerHTML;
    t('v88 C: la última serie se anuncia a fallo técnico',/pl-fallo/.test(body)&&/Última serie a fallo técnico/.test(body),body.slice(0,200));
    t('v88 C: en la serie a fallo no se pregunta el RIR',!/id="rir-0"/.test(body));
    t('v88 C: las repeticiones no vienen prellenadas con el tope',w.document.getElementById('pl-reps').value==='');
    t('v88 C: la indicación ya no dice «deja reps en reserva»',!/reps en reserva/.test(body)&&/hasta el fallo técnico/.test(body));
    const nAntes=(w.S.schedule[k][0].sets[0].series||[]).length;
    w.finishSet();
    t('v88 C: sin repeticiones la serie a fallo no se guarda',(w.S.schedule[k][0].sets[0].series||[]).length===nAntes
      &&/repeticiones/i.test((w.document.getElementById('pl-msg')||{}).textContent||''),(w.document.getElementById('pl-msg')||{}).textContent);
    w.document.getElementById('pl-reps').value='16';
    w.finishSet();
    const ser=w.S.schedule[k][0].sets[0].series;
    t('v88 C: la serie 1 guarda RIR numérico',ser[0].rir===1&&ser[0].esf==='justo',JSON.stringify(ser[0]));
    t('v88 C: la serie 2 guarda fallo:true y sus repeticiones',ser[1]&&ser[1].fallo===true&&String(ser[1].reps)==='16'&&ser[1].rir==null,JSON.stringify(ser[1]));
    t('v88 C: y persiste',JSON.parse(w.localStorage.getItem('fitcoach')).schedule[k][0].sets[0].series[1].fallo===true);
    const cal=w.calibracionDe(ser);
    t('v88 C: calibración: dije 1 y salieron 4 más → al menos 3 más',cal&&cal.estimadas===1&&cal.hechasDeMas===4&&cal.sesgo===3,JSON.stringify(cal));
    t('v88 C: el detalle distingue RIR y fallo técnico',/s1 RIR 1, s2 a fallo técnico/.test(w.esfDetalle(ser)),w.esfDetalle(ser));
    t('v88 C: la serie a fallo no cuenta como «sin margen»',w.nAlLimite(ser)===0);
    // sin arrastre entre series: tras RIR 0 en la s1 de la goblet, la s2 llega sin marcar
    w.eval("P.exi=1;P.set=1;P.phase='ready';P.rec=null;renderPlayer();");
    w.document.getElementById('pl-kg').value='16';w.document.getElementById('pl-reps').value='10';
    w.setRir(0);w.finishSet();w.skipRest&&w.skipRest();
    body=w.document.getElementById('player-body').innerHTML;
    t('v88 C: el RIR de la serie anterior no se arrastra a la siguiente',/id="rir-0"/.test(body)&&!/esf-b esf-on/.test(body));
    w.eval('P._terminando=true');w.closePlayer();
  }

  // --- D. decisión de progresión ----------------------------------------------------------------
  {
    const w=boot(estadoVeterano()); // mancuernas 4-24 de 2 en 2
    const exA={nombre:'Curl',series:2,reps:'8-12',peso:'12 kg por mancuerna'};
    t('v88 D: Epley tras un salto de +12,5% desde 10 al fallo ≈ 5,6',Math.abs(w.repsTrasSalto(10,0.125)-5.56)<0.02,String(w.repsTrasSalto(10,0.125)));
    let d=w.decisionProgresion(exA,[{kg:12,reps:'12',rir:2},{kg:12,reps:'16',fallo:true}],null);
    t('v88 D: la serie a fallo manda y el salto cabe → subir',d.accion==='subir'&&d.up===14&&/serie a fallo técnico: 16/.test(d.fuente),JSON.stringify(d));
    d=w.decisionProgresion(exA,[{kg:12,reps:'12',rir:2},{kg:12,reps:'12',fallo:true}],null);
    t('v88 D: fallo justo en el tope → el salto no cabe, se amplía el rango',d.accion==='ampliar'&&d.tope>12,JSON.stringify(d));
    d=w.decisionProgresion(exA,[{kg:12,reps:'12',rir:0},{kg:12,reps:'12',rir:0}],null);
    t('v88 D: la mitad o más a RIR 0 → consolidar',d.accion==='consolidar');
    d=w.decisionProgresion(exA,[{kg:12,reps:'10',rir:1},{kg:12,reps:'9',rir:1}],null);
    t('v88 D: dentro del rango → sumar repeticiones',d.accion==='reps'&&/suma repeticiones hasta cerrar todas las series en 12/.test(d.texto));
    d=w.decisionProgresion(exA,[{kg:12,reps:'6',rir:0},{kg:12,reps:'5',rir:0}],null);
    t('v88 D: lejos del rango → bajar',d.accion==='bajar');
    d=w.decisionProgresion({nombre:'Press',series:2,reps:'8-12',peso:'24 kg por mancuerna'},[{kg:24,reps:'12',rir:3},{kg:24,reps:'12',rir:3}],null);
    t('v88 D: sin carga más pesada → progresar por repeticiones',d.accion==='sin_escalon'&&d.tope===14,JSON.stringify(d));
    d=w.decisionProgresion({nombre:'Flexiones',series:2,reps:'10-15',peso:'solo peso corporal'},[{reps:'15',rir:2},{reps:'15',rir:2}],null);
    t('v88 D: peso corporal → repeticiones, tempo o variante',d.accion==='variante');
    t('v88 D: las series por tiempo no pasan por Epley',w.decisionProgresion({nombre:'Isométrico',series:3,reps:'40s',peso:'16 kg por mancuerna'},[{kg:16,reps:'40s'}],null)===null);
    d=w.decisionProgresion(exA,[{kg:12,reps:'12',esf:'justo'},{kg:12,reps:'12',esf:'justo'}],null);
    t('v88 D: las etiquetas antiguas se leen como RIR aproximado y se dice',/etiquetas antiguas/.test(d.fuente),d.fuente);
    // la revisión del día usa la misma regla
    w.S.dumbbells={min:8,max:30,step:2};
    const hoy=w.todayKey();
    w.S.schedule[hoy]=[{type:'ai',title:'D',done:false,exercises:[
      {nombre:'Sentadilla goblet',series:3,reps:'8-12',descanso_seg:90,rir:'1-2',peso:'una sola mancuerna de 28 kg'}]}];
    // v92: técnica confirmada (es la 1.ª sesión registrada de este ejercicio)
    w.S.history=[{key:dd(3),type:'Fuerza',sets:[{nombre:'Sentadilla goblet',tec:'ok',series:[{kg:28,reps:'12',rir:2},{kg:28,reps:'12',rir:2},{kg:28,reps:'12',rir:2}]}]}];
    let pr=w.ajustesDelDia(hoy,{estado:'normal',dolor:[]});
    t('v88 D: revisión del día: 28→30 (+7%) cabe → sube',pr[0]&&/30 kg/.test((pr[0].cambios.peso||{}).despues||''),JSON.stringify(pr[0]&&pr[0].cambios));
    t('v88 D: y dice a qué repeticiones ir el primer día',pr[0]&&/buscando 8-10 repeticiones, no el tope/.test(pr[0].motivos[0]||''),pr[0]&&pr[0].motivos[0]);
    pr=w.ajustesDelDia(hoy,{estado:'cansado',dolor:[]});
    t('v88 D: cansado → no sube y dice por qué',pr[0]&&!pr[0].cambios.peso&&/llegas cansado: hoy mantenemos 28 kg/.test(pr[0].avisos.join(' ')));
    w.S.schedule[hoy][0].done=true;
    w.S.schedule[hoy][0].sets=w.S.history[0].sets;
    const cf=w.complianceFor(hoy);
    t('v88 D: el mensaje semanal recibe la MISMA decisión',cf&&/sube a 30 kg \(\+7%\) y vuelve a la parte baja del rango/.test(cf.filas[0].estado),cf&&cf.filas[0].estado);
  }

  // --- E. cardio por tipo y coherencia del pulso -------------------------------------------------
  {
    const w=boot(estadoVeterano());
    t('v88 E: 38:28 son 38,47 minutos',Math.abs(w.minutosDe('38:28')-38.4667)<0.01&&w.minutosDe('45')===45&&w.minutosDe('1:02:30')===62.5);
    t('v88 E: tipo de cardio',w.tipoCardio({title:'Carrera en cinta'})==='carrera'&&w.tipoCardio({title:'Caminata / Paseo'})==='caminata'&&w.tipoCardio({title:'HIIT'})==='otro');
    const lunes=w.weekDates(0).map(w.fmt)[0];
    w.S.history=[{key:lunes,title:'Carrera',duration:'40:00',distance:'7.2',hr:'150'},
                 {key:lunes,title:'Caminata / Paseo',duration:'60',distance:'6.5',hr:'90'}];
    const c=w.cardioWeek(0,'carrera'),p=w.cardioWeek(0,'caminata'),tot=w.cardioWeek(0);
    t('v88 E: la carrera se cuenta sola',c.n===1&&c.km===7.2&&c.ritmo==='5:33/km',JSON.stringify(c));
    t('v88 E: la caminata, aparte',p.n===1&&p.km===6.5);
    t('v88 E: sin tipo sigue sumando todo (compatibilidad)',tot.n===2&&tot.km===13.7);
    w.S.history=[{key:dd(2),title:'Carrera',duration:'40:00',distance:'7.2',hr:'172'},
                 {key:dd(5),title:'Carrera en cinta',duration:'40:10',distance:'7.2',hr:'131'},
                 {key:dd(9),title:'Carrera',duration:'39:50',distance:'7.2',hr:'165'}];
    const coh=w.hrCoherencia();
    t('v88 E: mismo ritmo y 41 lpm de diferencia → pulsos no fiables',coh&&coh.incoherente&&/131 a 172/.test(coh.texto),JSON.stringify(coh&&coh.texto));
    const pm=w.buildPrompt('adapt');
    t('v88 E: el mensaje avisa de que el pulso no es fiable',/PULSOS NO FIABLES/.test(pm)&&/prescribe la intensidad por RITMO/.test(pm));
    t('v88 E: el mensaje separa carrera y caminata',/CARRERA /.test(pm)&&/CAMINATA /.test(pm)&&/nunca a la suma/.test(pm));
    w.S.history.forEach(h=>h.hr='150');
    t('v88 E: con pulsos coherentes no hay aviso',!w.hrCoherencia().incoherente);
    w.renderCardio&&w.tab('prog');
    t('v88 E: la tarjeta de Progreso separa carrera y caminata',/🏃 Carrera/.test(w.document.getElementById('cardio-body').innerHTML));
  }

  // --- F. peso por fechas, cintura y registro rápido ---------------------------------------------
  {
    const w=boot(estadoVeterano());
    w.S.profile.peso='64.7';w.S.profile.altura='176';w.S.profile.nivel='intermedio';
    w.S.weightLog=[{date:dd(28),kg:64.0},{date:dd(21),kg:64.2},{date:dd(14),kg:64.4},{date:dd(7),kg:64.6},{date:dd(0),kg:64.8}];
    let wt=w.weightTrend();
    t('v88 F: +0,2 kg por semana se detecta (antes: «estable»)',wt&&Math.abs(wt.kgSem-0.2)<0.011&&wt.dir==='subiendo',JSON.stringify(wt));
    t('v88 F: en % del peso',wt&&Math.abs(wt.pctSem-0.31)<0.02);
    w.S.weightLog=[{date:dd(300),kg:70},{date:dd(200),kg:69},{date:dd(100),kg:68},{date:dd(3),kg:64.8}];
    t('v88 F: pesajes viejos no hacen tendencia',w.weightTrend()===null);
    w.S.weightLog=[{date:dd(21),kg:64},{date:dd(14),kg:64},{date:dd(7),kg:64},{date:dd(0),kg:64}];
    wt=w.weightTrend();
    t('v88 F: detecta pesajes redondeados al kilo',wt&&wt.enteros===true&&wt.dir==='estable');
    t('v88 F: IMC del perfil',w.imcPerfil()===20.9,String(w.imcPerfil()));
    w.S.nutri=null;w.tab('nutri');
    t('v88 F: el registro rápido aparece aunque no haya plan de nutrición',!!w.document.getElementById('nq-peso')&&!!w.document.getElementById('nq-cintura'));
    w.document.getElementById('nq-peso').value='64,9';w.document.getElementById('nq-cintura').value='80,5';
    w.guardarPesoRapido();
    const g=JSON.parse(w.localStorage.getItem('fitcoach'));
    t('v88 F: guarda el peso con decimales en el registro',g.weightLog.some(x=>x.date===w.todayKey()&&x.kg===64.9),JSON.stringify(g.weightLog.slice(-1)));
    t('v88 F: actualiza el peso del perfil',g.profile.peso==='64.9');
    t('v88 F: guarda la cintura y persiste',g.waistLog.length===1&&g.waistLog[0].cm===80.5&&g.waistLog[0].date===w.todayKey());
    t('v88 F: no borra pesajes anteriores',g.weightLog.length===4||g.weightLog.length===5,String(g.weightLog.length));
    w.guardarPesoRapido(); // vacío
    t('v88 F: vacío no guarda nada',JSON.parse(w.localStorage.getItem('fitcoach')).waistLog.length===1);
    const pm=w.buildPrompt('adapt');
    t('v88 F: peso y cintura viajan aunque no haya datos de Salud',/PESO Y CINTURA:/.test(pm)&&/CINTURA \(cm/.test(pm)&&/80\.5/.test(pm));
    t('v88 F: aviso de coherencia con IMC bajo y «perder grasa»',/AVISO DE COHERENCIA/.test(pm)&&/IMC de 21/.test(pm));
    t('v88 F: ya no hay regla fija de déficit',!/músculo\+grasa = recomposición: déficit ligero/.test(pm));
    t('v88 F: la nutrición sin conexión no pone déficit con IMC bajo',w.estrategiaCalorica(['musculo','grasa']).f===1);
    const w2=boot(estadoVeterano()); // 82,5 kg y 178 cm: IMC 26
    t('v88 F: con IMC alto sí propone déficit ligero y no hay aviso',w2.estrategiaCalorica(['musculo','grasa']).f===0.9&&!/AVISO DE COHERENCIA/.test(w2.buildPrompt('adapt')));
  }

  // --- G. marcadores a mano: solo lo que se toca ---------------------------------------------------
  {
    const w=boot(estadoVeterano());
    w.tab('set');w.prefillManualHealth();
    const n0=w.S.healthLog.length;
    w.saveManualHealth();
    t('v88 G: guardar sin tocar nada no crea un registro',w.S.healthLog.length===n0);
    const el=w.document.getElementById('m-rhr');el.value='51';el.oninput&&el.oninput();
    w.saveManualHealth();
    const ult=w.S.healthLog[w.S.healthLog.length-1];
    t('v88 G: se guarda solo el marcador editado',ult.date===w.todayKey()&&ult.restingHR===51&&ult.hrv===undefined&&ult.avgSleepH===undefined,JSON.stringify(ult));
    t('v88 G: el valor vigente de los demás no se pierde',w.S.health.hrv===62&&w.S.health.restingHR===51);
    w.prefillManualHealth();
    const e2=w.document.getElementById('m-hrv');e2.value='60';e2.oninput&&e2.oninput();
    w.saveManualHealth();
    const u2=w.S.healthLog[w.S.healthLog.length-1];
    t('v88 G: dos guardados el mismo día se fusionan',u2.restingHR===51&&u2.hrv===60,JSON.stringify(u2));
    w.S.healthLog=[1,2,3,4,5].map(i=>({date:dd(40-i*7),hrv:44,restingHR:48+i,avgSleepH:7}));
    const pm=w.buildPrompt('adapt');
    t('v88 G: una serie idéntica se marca como dato arrastrado',/HRV: .*VALOR IDÉNTICO en los 5 registros/.test(pm)&&/Sueño: .*VALOR IDÉNTICO/.test(pm));
    t('v88 G: una serie que varía no se marca',!/FC en reposo: [^\n]*VALOR IDÉNTICO/.test(pm));
  }

  // --- H. la copia de seguridad no lleva credenciales ------------------------------------------------
  {
    const e=estadoVeterano();e.cloud={token:'ghp_PRUEBA_NO_REAL',gistId:'abc',auto:false,lastAt:''};
    const w=boot(e);
    const c=w.copiaSinSecretos();
    t('v88 H: la copia exportada no contiene el token',c.cloud.token===''&&JSON.stringify(c).indexOf('ghp_PRUEBA_NO_REAL')<0);
    t('v88 H: conserva el resto',c.cloud.gistId==='abc'&&c.history.length===e.history.length);
    t('v88 H: el token sigue en el dispositivo',w.S.cloud.token==='ghp_PRUEBA_NO_REAL');
  }

  // --- I. contador de bloque fijado por el entrenador --------------------------------------------------
  {
    const w=boot(estadoVeterano());
    const dates=w.weekDates(w.S.currentWeek);const lunes=w.fmt(dates[0]);
    const antes=w.mesoInfo(w.programWeekFor(lunes),lunes);
    const plan=sb=>({sesiones_ia:[{dia_codigo:'L',titulo:'X',ejercicios:[{nombre:'Sentadilla goblet',series:3,reps:'8-12',descanso_seg:90,peso:'una sola mancuerna de 16 kg'}]}],
      mesociclo:{enfoque:'Acumulación',semanas_bloque:4,semana_en_bloque:sb,justificacion:'x'}});
    w.applyBridgePlan(plan(2));
    const l0=new Date(dates[0]);l0.setDate(l0.getDate()-7);
    t('v88 I: «semana 2 del bloque» fija el inicio una semana antes',w.S.blockStart===w.fmt(l0),w.S.blockStart);
    let mi=w.mesoInfo(w.programWeekFor(lunes),lunes);
    t('v88 I: la app cuenta lo que dijo el entrenador',mi.ancla===true&&mi.wInBlock===2&&mi.block===antes.block,JSON.stringify(mi));
    t('v88 I: y lo dice en el siguiente mensaje',/CONTADOR DE BLOQUE: la cuenta de arriba parte de la semana que tú fijaste/.test(w.buildPrompt('adapt')));
    w.applyBridgePlan(plan(1));
    mi=w.mesoInfo(w.programWeekFor(lunes),lunes);
    t('v88 I: «semana 1» abre bloque nuevo',w.S.blockStart===lunes&&mi.wInBlock===1&&mi.block===antes.block+1||mi.block>=1&&mi.wInBlock===1,JSON.stringify(mi));
    t('v88 I: persiste',JSON.parse(w.localStorage.getItem('fitcoach')).blockStart===lunes);
    const w2=boot(estadoVeterano());const p0=w2.buildPrompt('adapt');
    t('v88 I: el esquema pide semana_en_bloque',/"semana_en_bloque":1/.test(p0)&&/calendario automático desde mi primer registro/.test(p0));
  }

  // --- J. volumen fraccionado ---------------------------------------------------------------------------
  {
    const w=boot(estadoVeterano());
    const g=w.gruposPonderados({nombre:'Press de banca',musculos:'Pectoral, tríceps, deltoides anterior'});
    const por=n=>(g.find(x=>x.g===n)||{}).w;
    t('v88 J: el grupo principal cuenta 1 y los que ayudan 0,5',por('pecho')===1&&por('triceps')===0.5&&por('hombro')===0.5,JSON.stringify(g));
    const k=w.weekDates(0).map(w.fmt)[0];
    w.S.schedule={[k]:[{type:'ai',title:'J',done:true,exercises:[{nombre:'Press de banca',series:4,reps:'8-12',musculos:'Pectoral, tríceps, deltoides anterior'}],
      sets:[{nombre:'Press de banca',series:[{kg:40,reps:'10'},{kg:40,reps:'10'},{kg:40,reps:'10'},{kg:40,reps:'10'}]}]}]};
    const v=w.weeklyVolumeByGroup(0,true);
    t('v88 J: 4 series de press = 4 de pecho y 2 de tríceps',v.vol.pecho===4&&v.vol.triceps===2&&v.bruto.triceps===4,JSON.stringify(v.vol));
    t('v88 J: el texto enseña los dos recuentos',/Tríceps 2 \(4 en bruto\)/.test(w.volumeSummaryText(0,true)),w.volumeSummaryText(0,true));
  }

  // --- K. mensaje semanal -----------------------------------------------------------------------------------
  {
    const w=boot(estadoVeterano());
    const k=dd(3);
    // v89: el bloque de ejercicios estables solo sale si hay ejercicios ANTES del lunes de la semana
    // planificada; con d(3) la prueba fallaba según el día de la semana en que se ejecutara
    w.S.schedule[dd(12)]=[{type:'ai',title:'Previa',done:true,exercises:[{nombre:'Remo mancuerna',series:3,reps:'8-12',peso:'18 kg por mancuerna'}]}];
    const p=w.buildPrompt('adapt');
    t('v88 K: una sola regla de progresión',/PROGRESIÓN \(regla única/.test(p)&&/La carga sube solo cuando el salto CABE|el salto tiene que CABER/i.test(p));
    t('v88 K: desaparece «sube carga ~2-5%»',!/sube carga ~2-5%/.test(p));
    t('v88 K: desaparece la regla de rotar',!/VARIEDAD \(anti-monotonía\)/.test(p)&&!/Varía algún ejercicio si lleva 2\+ semanas/.test(p));
    t('v88 K: pide ejercicios estables con el mismo nombre',/EJERCICIOS ESTABLES DENTRO DEL BLOQUE/.test(p)&&/MISMO NOMBRE, letra por letra/.test(p));
    t('v88 K: rangos anchos',/RANGOS DE REPETICIONES ANCHOS/.test(p));
    t('v88 K: serie a fallo técnico explicada y en el esquema',/SERIE A FALLO TÉCNICO \("fallo_tecnico"\)/.test(p)&&/"fallo_tecnico":false/.test(p));
    t('v88 K: fuerza y carrera, 3 h (no 6)',/sepáralas 3 h o más/.test(p)&&!/sepáralas 6 h o más/.test(p));
    t('v88 K: plan de carrera',/PLAN DE CARRERA/.test(p));
    t('v88 K: el 1RM estimado se declara como mínimo',/este número es un MÍNIMO/.test(p));
    ['10.1007/s40279-021-01559-x','10.1007/s40279-022-01784-y','10.1007/s00421-017-3725-7','10.7717/peerj.14142','10.1519/JSC.0000000000004258',
     '10.3389/fspor.2024.1429789','10.47206/ijsc.v3i1.182','10.1007/s40279-021-01587-7','10.1007/s40279-024-02034-z','10.7717/peerj.16777',
     '10.1186/s12970-017-0173-z','10.1186/s13102-026-01997-y'].forEach(doi=>t('v88 K: referencia '+doi,p.indexOf(doi)>=0));
    t('v88 K: lo que es convención se dice',/convenciones de práctica, no puntos de corte validados/.test(p));
    t('v88 K: cero llamadas a la API',HTML.indexOf('api.anthropic.com')<0);
    // las series no viajan tres veces
    const ser=[{kg:16,reps:'12',rir:1},{kg:16,reps:'12',rir:1},{kg:16,reps:'12',rir:0}];
    const auto='Press mancuerna [pautado: 16 kg por mancuerna · reps pautadas 8-12]: '+w.fmtSetsDetalladas({series:ser});
    w.S.schedule[k][0].sets=[{nombre:'Press mancuerna',pesoRef:'16 kg por mancuerna',repsRef:'8-12',series:ser}];
    w.S.schedule[k][0].exercises=[w.S.schedule[k][0].exercises[0]];
    w.S.history=[{key:k,title:'Fuerza (sesión IA)',duration:'50',feeling:'💪',fatiga:'normal',
      notes:'Hombro algo cargado al colocar las mancuernas.\n'+auto,sets:w.S.schedule[k][0].sets}];
    const h=w.S.history[0];
    t('v88 K: las notas conservan lo escrito a mano y pierden la copia automática',w.notasLibres(h)==='Hombro algo cargado al colocar las mancuernas.',w.notasLibres(h));
    h.notes='Texto.\nPress mancuerna [pautado: 16 kg por mancuerna · reps pautadas 8-12]: 16 kg × 12 (RIR 1) · en realidad la última fueron 11';
    t('v88 K: una línea corregida a mano NO se quita',/en realidad la última fueron 11/.test(w.notasLibres(h)));
    h.notes='Hombro algo cargado al colocar las mancuernas.\n'+auto;
    const p2=w.buildPrompt('adapt');
    const hist=p2.slice(p2.indexOf('HISTORIAL DE SESIONES'),p2.indexOf('PRINCIPIOS BASADOS'));
    t('v88 K: el historial remite al cumplimiento en vez de repetir las series',/Series: detalladas arriba, en CUMPLIMIENTO REAL/.test(hist)&&!/16 kg × 12/.test(hist),hist.slice(0,400));
    t('v88 K: las series siguen estando, una vez',(p2.match(/16kg×12, 16kg×12, 16kg×12/g)||[]).length===1);
    t('v88 K: la nota a mano llega',/Hombro algo cargado al colocar las mancuernas/.test(hist));
    w.S.history.push({key:dd(50),title:'Fuerza antigua',duration:'40',feeling:'💪',sets:[{nombre:'Remo viejo',series:[{kg:20,reps:'10'}]}]});
    t('v88 K: lo que queda fuera del cumplimiento conserva sus cargas',/Remo viejo 20 kg × 10/.test(w.buildPrompt('adapt')));
  }

  // --- L. validadores y saneado -----------------------------------------------------------------------------
  {
    const w=boot(estadoVeterano());
    const ej=(n,reps,extra)=>Object.assign({nombre:n,series:3,reps,descanso_seg:90,peso:'16 kg por mancuerna (una en cada mano)',patron:'otro'},extra||{});
    const plan=(ejs,sb)=>({sesiones_ia:[{dia_codigo:'L',titulo:'L',ejercicios:ejs}],mesociclo:{enfoque:'x',semanas_bloque:4,semana_en_bloque:sb}});
    let iss=w.validatePlan(plan([ej('Press mancuerna','8-10'),ej('Remo mancuerna','8')],2));
    t('v88 L: avisa de rangos estrechos',iss.warns.some(x=>/Rangos de repeticiones estrechos en 2/.test(x)),JSON.stringify(iss.warns));
    iss=w.validatePlan(plan([ej('Press mancuerna','8-12'),ej('Plancha','40s',{peso:'solo peso corporal'})],2));
    t('v88 L: rangos anchos y series por tiempo no avisan',!iss.warns.some(x=>/Rangos de repeticiones estrechos/.test(x)));
    iss=w.validatePlan(plan([ej('Sentadilla goblet','8-12',{fallo_tecnico:true})],2));
    t('v88 L: avisa si se marca fallo técnico en un ejercicio de riesgo',iss.warns.some(x=>/fallo técnico/.test(x)&&/Sentadilla goblet/.test(x)));
    // rotación: la semana anterior tuvo 6 ejercicios; el plan nuevo repite 1
    const prev=w.weekDates(w.S.currentWeek-1).map(w.fmt)[0];
    w.S.schedule[prev]=[{type:'ai',title:'P',done:true,exercises:['A uno','B dos','C tres','D cuatro','E cinco','F seis'].map(n=>ej(n,'8-12'))}];
    const nuevos=['A uno','G siete','H ocho','I nueve','J diez','K once'].map(n=>ej(n,'8-12'));
    iss=w.validatePlan(plan(nuevos,2));
    t('v88 L: avisa si se rota más de la mitad sin cambiar de bloque',iss.warns.some(x=>/Solo 1 de 6 ejercicios se repiten/.test(x)),JSON.stringify(iss.warns));
    iss=w.validatePlan(plan(nuevos,1));
    t('v88 L: al empezar bloque nuevo, rotar no avisa',!iss.warns.some(x=>/se repiten respecto a la semana anterior/.test(x)));
    t('v88 L: cleanEx normaliza fallo_tecnico',w.cleanEx({nombre:'x',fallo_tecnico:'true'}).fallo_tecnico===true
      &&w.cleanEx({nombre:'x',fallo_tecnico:false}).fallo_tecnico===false&&!('fallo_tecnico' in w.cleanEx({nombre:'x',fallo_tecnico:'<b>'})));
    t('v88 L: rotacionEntre',w.rotacionEntre(['Zancadas','Remo'],['Zancada','Curl']).pct===50);
  }

  // --- M. visual y versión ---------------------------------------------------------------------------------------
  {
    t('v88→v93 M: versión en el pie',/FitCoach IA · versión 93</.test(HTML));
    t('v88 M: texto negro sobre el botón verde',/\.btn-primary\{[^}]*color:#000\}/.test(HTML));
    t('v88 M: texto terciario con contraste suficiente',/--text3:#98989f/.test(HTML));
    const tb=HTML.slice(HTML.indexOf('<div class="tabbar">'),HTML.indexOf('<!-- LOG SHEET -->'));
    t('v88 M: la barra de pestañas usa iconos SVG, no emoji',(tb.match(/<svg/g)||[]).length===6&&!/📅/.test(tb));
    t('v88 M: no queda ningún 📅 (en iOS enseña «17 JUL»)',HTML.indexOf('📅')<0);
    const w=boot(estadoVeterano());
    t('v88 M: el punto de partida va plegado y al final de Progreso',w.document.getElementById('baseline-card').tagName==='DETAILS'
      &&!w.document.getElementById('baseline-card').open&&!!w.document.getElementById('baseline-in'));
    w.document.getElementById('baseline-in').value='nuevo punto de partida';w.saveBaseline();
    t('v88 M: y se sigue guardando',JSON.parse(w.localStorage.getItem('fitcoach')).baseline==='nuevo punto de partida');
    const fijos=(HTML.match(/font-size:\s*(9|10|11|12|13)(\.5)?px/g)||[]).length;
    t('v88 M: los textos pequeños escalan con el tamaño de letra',fijos<=3,String(fijos));
    const sw=path.join(path.dirname(path.resolve(FILE)),'sw.js');
    if(path.basename(FILE)==='index.html'&&fs.existsSync(sw))
      t('v93 M: la caché del service worker cambia de nombre',/fitcoach-v93/.test(fs.readFileSync(sw,'utf8')));
  }

  // --- N. copia real del usuario (solo si está disponible en esta máquina) -----------------------------------------
  {
    const ruta=process.env.FITCOACH_BACKUP||'/home/claude/data/b.json';
    if(fs.existsSync(ruta)){
      const orig=JSON.parse(fs.readFileSync(ruta,'utf8'));
      const w=boot(JSON.parse(JSON.stringify(orig)));
      const S=w.S;
      ['history','schedule','weightLog','healthLog','health','nutri','baseline','coachLog','programStart','mesoLen','mesoFocus','dumbbells','fontScale','aiDays','briefDays','freeDays','insight']
        .forEach(k=>t('v88 N copia real: '+k+' intacto',JSON.stringify(S[k])===JSON.stringify(orig[k])));
      t('v88 N copia real: perfil intacto',Object.keys(orig.profile).every(k=>JSON.stringify(S.profile[k])===JSON.stringify(orig.profile[k])));
      t('v88 N copia real: todas las sesiones siguen ahí',S.history.length===orig.history.length);
      w.save();
      const g=JSON.parse(w.localStorage.getItem('fitcoach'));
      t('v88 N copia real: guardar y releer no pierde nada',JSON.stringify(g.history)===JSON.stringify(orig.history)&&JSON.stringify(g.schedule)===JSON.stringify(orig.schedule));
      let err='';try{['cal','sess','prog','nutri','prof','set'].forEach(x=>w.tab(x));w.S.currentWeek=1;w.buildPrompt('adapt');}catch(e){err=e.message;}
      t('v88 N copia real: todas las pantallas y el mensaje semanal se generan',err==='',err);
      const pm=w.buildPrompt('adapt');
      t('v88 N copia real: la HRV repetida se marca',/HRV: .*VALOR IDÉNTICO/.test(pm));
      t('v88 N copia real: las series por tiempo no reciben una decisión absurda',!/rango ampliado a 40-/.test(pm));
      t('v88 N copia real: ninguna credencial en el mensaje',!/gh[pous]_[A-Za-z0-9]{20,}/.test(pm));
    }
  }
}

/* ---------- 25. v89 · cambios en días concretos (tiempo, material, sin sesión) ------------------ */
if(!boot(null).excDia){ t('v89: excDia existe',false); } else {
  // veterano: L completo, X breve, V completo, S libre; mancuernas y bandas; 50 min
  const mk=()=>{const w=boot(estadoVeterano());w.S.currentWeek=1;
    const k=c=>w.keyDeCodigo(c,1);return {w,k};};

  // --- A. estado ---------------------------------------------------------------------------------
  {
    const orig=estadoVeterano();const w=boot(JSON.parse(JSON.stringify(orig)));
    t('v89 A: initState añade dayOverrides vacío',w.S.dayOverrides&&typeof w.S.dayOverrides==='object'&&!Array.isArray(w.S.dayOverrides)&&!Object.keys(w.S.dayOverrides).length);
    t('v89 A: sin tocar nada más',JSON.stringify(w.S.history)===JSON.stringify(orig.history)&&JSON.stringify(w.S.schedule)===JSON.stringify(orig.schedule)&&JSON.stringify(w.S.aiDays)===JSON.stringify(orig.aiDays));
    const e=estadoVeterano();e.dayOverrides={'2030-01-07':{min:30}};
    t('v89 A: los cambios guardados sobreviven al arranque',boot(e).S.dayOverrides['2030-01-07'].min===30);
    t('v89 A: un valor corrupto no rompe el arranque',(()=>{const e2=estadoVeterano();e2.dayOverrides=[1,2];return !Array.isArray(boot(e2).S.dayOverrides);})());
  }

  // --- B. lectura y saneado -----------------------------------------------------------------------
  {
    const {w}=mk();
    w.S.dayOverrides={a:{min:300,equipos:['volante','bandas'],nota:'  '},b:{min:'30'},c:{},d:{sinSesion:true,nota:'boda'}};
    t('v89 B: minutos fuera de rango y material desconocido se descartan',JSON.stringify(w.excDia('a'))==='{"equipos":["bandas"]}',JSON.stringify(w.excDia('a')));
    t('v89 B: los minutos como texto se leen',w.excDia('b').min===30);
    t('v89 B: un cambio vacío no es un cambio',w.excDia('c')===null&&w.excDia('zz')===null);
    t('v89 B: descripción legible',w.excTxt({min:30,equipos:['bandas']})==='30 min · solo bandas elásticas'
      &&w.excTxt({equipos:['ninguno']})==='solo peso corporal'&&w.excTxt(w.excDia('d'))==='sin sesión · «boda»',w.excTxt({min:30,equipos:['bandas']}));
    t('v89 B: minutos del día: cambio, breve y general',w.minutosDia('b','L')===30&&w.minutosDia('zz','X')===20&&w.minutosDia('zz','L')===50);
  }

  // --- C. interfaz en Perfil -----------------------------------------------------------------------
  {
    const {w,k}=mk();
    w.tab('prof');
    const card=()=>w.document.getElementById('exc-body').innerHTML;
    t('v89 C: la tarjeta existe y lista los días con sesión de la semana próxima',
      /Lunes/.test(card())&&/Miércoles/.test(card())&&/Viernes/.test(card())&&/Sábado/.test(card())&&!/Martes/.test(card()),card().slice(0,200));
    t('v89 C: por defecto propone la semana próxima',/class="chip sel"[^>]*>Próxima/.test(w.document.getElementById('exc-weeks').innerHTML));
    t('v89 C: sin cambios dice «como siempre» con los minutos y el material generales',/como siempre · 50 min · mancuernas, bandas elásticas/.test(card()));
    w.excAbrir(k('L'));
    t('v89 C: el editor ofrece tiempo, material, sin sesión y nota',/excMin\(/.test(card())&&/excEq\(/.test(card())&&/Sin sesión este día/.test(card())&&!!w.document.getElementById('exc-nota'));
    w.excMin(k('L'),30);w.excEq(k('L'),'bandas');
    t('v89 C: lunes a 30 min solo con bandas',JSON.stringify(w.S.dayOverrides[k('L')])==='{"min":30,"equipos":["bandas"]}',JSON.stringify(w.S.dayOverrides[k('L')]));
    w.excEq(k('L'),'mancuernas');w.excEq(k('L'),'ninguno');
    t('v89 C: «sin equipo» excluye el resto',JSON.stringify(w.S.dayOverrides[k('L')].equipos)==='["ninguno"]');
    w.excEq(k('L'),'bandas');
    t('v89 C: y elegir material quita «sin equipo»',JSON.stringify(w.S.dayOverrides[k('L')].equipos)==='["bandas"]');
    w.document.getElementById('exc-nota').value='en casa de mis padres';w.excCerrar();
    t('v89 C: la nota se guarda al cerrar',w.S.dayOverrides[k('L')].nota==='en casa de mis padres');
    t('v89 C: el resumen lo enseña',/📌 30 min · solo bandas elásticas · «en casa de mis padres»/.test(card()),card().slice(0,400));
    const g=JSON.parse(w.localStorage.getItem('fitcoach'));
    t('v89 C: persiste',g.dayOverrides[k('L')].min===30&&g.dayOverrides[k('L')].nota==='en casa de mis padres');
    t('v89 C: la semana tipo NO cambia',JSON.stringify(g.aiDays)==='["L","X","V"]'&&g.profile.minutos===50&&JSON.stringify(g.profile.equipos)==='["mancuernas","bandas"]');
    w.excMin(k('L'),0);w.excEq(k('L'),null);w.excNota(k('L'),'');
    t('v89 C: si se deshace todo, el cambio desaparece',!(k('L') in w.S.dayOverrides));
    w.excSin(k('S'));
    t('v89 C: un día puede quedar sin sesión',w.excDia(k('S')).sinSesion===true);
    w.excQuitar(k('S'));
    t('v89 C: «Quitar cambio» lo borra',!(k('S') in w.S.dayOverrides));
    w.excSemana(0);
    t('v89 C: se puede elegir la semana en curso',/class="chip sel"[^>]*>Esta semana/.test(w.document.getElementById('exc-weeks').innerHTML));
  }

  // --- D. mensaje semanal ----------------------------------------------------------------------------
  {
    const {w,k}=mk();
    w.S.dayOverrides[k('L')]={min:30,equipos:['bandas']};
    w.S.dayOverrides[k('X')]={min:30};
    w.S.dayOverrides[k('V')]={equipos:['ninguno']};
    w.S.dayOverrides[k('S')]={sinSesion:true};
    const p=w.buildPrompt('adapt');
    const f=c=>{const d=new Date(k(c)+'T00:00:00');return d.getDate()+'/'+(d.getMonth()+1);};
    t('v89 D: cada día con cambios lo lleva junto a su fecha',p.indexOf(`L (Lunes ${f('L')}; ESTE DÍA: 30 min · solo bandas elásticas)`)>=0
      &&p.indexOf(`V (Viernes ${f('V')}; ESTE DÍA: solo peso corporal)`)>=0&&p.indexOf(`X (Miércoles ${f('X')}; ESTE DÍA: 30 min)`)>=0,p.slice(p.indexOf('Días de fuerza COMPLETA'),p.indexOf('Días de fuerza COMPLETA')+300));
    t('v89 D: bloque de cambios con instrucciones',/CAMBIOS EN DÍAS CONCRETOS DE ESTA SEMANA/.test(p)&&/tiene que CABER en sus minutos/.test(p)&&/usa SOLO el material de ese día/.test(p)&&/no cuenta para su progresión de carga/.test(p));
    t('v89 D: el día sin sesión sale de la planificación',/Días de entrenamiento libre \(cardio\/paseo\): ninguno/.test(p)&&/Sin sesión esta semana: S \(Sábado/.test(p));
    t('v89 D: la semana tipo sigue presentándose como general',/mi semana tipo no cambia/.test(p));
    w.S.dayOverrides[k('V')]={equipos:['kettlebell']};w.S.kettlebells={list:'12, 16'};
    t('v89 D: material que no está en la lista general se describe con sus pesos',/Kettlebells disponibles \(kg\): 12, 16/.test(w.buildPrompt('adapt')));
    const w2=boot(estadoVeterano());w2.S.currentWeek=1;
    t('v89 D: sin cambios, el mensaje no lleva el bloque',!/CAMBIOS EN DÍAS CONCRETOS/.test(w2.buildPrompt('adapt'))&&!/ESTE DÍA:/.test(w2.buildPrompt('adapt')));
  }

  // --- E. validador ------------------------------------------------------------------------------------
  {
    const {w,k}=mk();
    w.S.dayOverrides[k('L')]={min:30,equipos:['bandas']};
    w.S.dayOverrides[k('V')]={equipos:['ninguno']};
    w.S.dayOverrides[k('S')]={sinSesion:true};
    const ej=(n,peso,series)=>({nombre:n,series:series||4,reps:'10-12',descanso_seg:90,peso,patron:'otro'});
    const larga=[1,2,3,4,5,6].map(i=>ej('Ejercicio '+i,'banda media',4));
    const plan={sesiones_ia:[
      {dia_codigo:'L',titulo:'Lunes',ejercicios:larga},
      {dia_codigo:'V',titulo:'Viernes',ejercicios:[ej('Press de suelo con mancuernas','16 kg por mancuerna (una en cada mano)'),ej('Flexiones','solo peso corporal')]},
      {dia_codigo:'S',titulo:'Sábado',ejercicios:[ej('Flexiones','solo peso corporal',2)]}]};
    const iss=w.validatePlan(plan);
    t('v89 E: el tiempo se compara con los minutos de ESE día',iss.warns.some(x=>/"Lunes".*frente a los 30 min/.test(x)),JSON.stringify(iss.warns));
    t('v89 E: material que ese día no hay → aviso',iss.warns.some(x=>/Press de suelo con mancuernas.*\(Viernes\): ese día solo tienes peso corporal/.test(x)));
    t('v89 E: lo que sí cabe no avisa',!iss.warns.some(x=>/"Flexiones" \(Viernes\)/.test(x)));
    t('v89 E: sesión en un día marcado sin sesión → aviso',iss.warns.some(x=>/lo marcaste sin sesión/.test(x)));
    const w3=boot(estadoVeterano());w3.S.profile.equipos=['kettlebell'];
    const i3={errors:[],warns:[]};w3.validateExercise({nombre:'Swing con kettlebell',series:3,reps:'15',descanso_seg:60,peso:'kettlebell de 16 kg (una sola)'},0,i3);
    t('v89 E: arreglo de paso: con kettlebell configurada ya no avisa de que falta',!i3.warns.some(x=>/no tienes kettlebells/.test(x)),JSON.stringify(i3.warns));
  }

  // --- F. aplicar plan, cumplimiento y calendario --------------------------------------------------------
  {
    const w=boot(estadoVeterano());
    const kL=w.keyDeCodigo('L',0);
    w.S.dayOverrides[kL]={min:30,equipos:['bandas']};
    w.applyBridgePlan({sesiones_ia:[{dia_codigo:'L',titulo:'Bandas 30',ejercicios:[{nombre:'Remo con banda',series:3,reps:'12-15',descanso_seg:60,peso:'banda media'}]}],
      mesociclo:{enfoque:'x',semanas_bloque:4,semana_en_bloque:2}});
    const s=w.mainAISess(kL);
    t('v89 F: la sesión guarda con qué condiciones se planificó',s&&s.cond&&s.cond.min===30&&s.cond.equipos[0]==='bandas');
    s.done=true;s.sets=[{nombre:'Remo con banda',series:[{banda:'media',reps:'15'},{banda:'media',reps:'15'},{banda:'media',reps:'15'}]}];
    const c=w.complianceFor(kL);
    t('v89 F: el cumplimiento lo dice al entrenador',c&&/\[día con cambios: 30 min · solo bandas elásticas\]/.test(c.titulo),c&&c.titulo);
    w.tab('cal');w.selDay(kL,0);
    t('v89 F: el calendario enseña el cambio del día',/📌 <b>Este día:<\/b> 30 min · solo bandas elásticas/.test(w.document.getElementById('day-panel').innerHTML));
    const kV=w.keyDeCodigo('V',0);w.S.dayOverrides[kV]={sinSesion:true};delete w.S.schedule[kV];
    w.selDay(kV,4);
    t('v89 F: un día sin sesión no aparece como «Sesión IA planificada»',/Sin sesión esta semana/.test(w.document.getElementById('day-panel').innerHTML)&&!/Sesión IA planificada/.test(w.document.getElementById('day-panel').innerHTML));
  }

  // --- G. generador sin conexión ------------------------------------------------------------------------------
  {
    const {w,k}=mk();
    w.S.dayOverrides[k('L')]={min:30,equipos:['bandas']};
    w.S.dayOverrides[k('V')]={equipos:['ninguno']};
    w.S.dayOverrides[k('S')]={sinSesion:true};
    Object.keys(w.S.schedule).forEach(x=>{if(x>=k('L'))delete w.S.schedule[x];});
    w.buildWeekOffline();
    const sL=w.mainAISess(k('L')),sV=w.mainAISess(k('V'));
    t('v89 G: el lunes cabe en 30 min',sL&&w.estimateSessionMin(sL.exercises)<=33,sL&&String(w.estimateSessionMin(sL.exercises)));
    const okL=sL&&sL.exercises.every(e=>{const f=w.EXDB?null:null;return !/mancuerna|kettlebell|barra/i.test(e.nombre+' '+(e.peso||''));});
    t('v89 G: el lunes no lleva mancuernas',okL,sL&&sL.exercises.map(e=>e.nombre+' | '+(e.peso||'')).join(' ; '));
    const okV=sV&&sV.exercises.every(e=>!/mancuerna|kettlebell|banda|goma|barra/i.test(e.nombre+' '+(e.peso||''))&&!/\d\s*kg/.test(e.peso||''));
    t('v89 G: el viernes es solo peso corporal',okV,sV&&sV.exercises.map(e=>e.nombre+' | '+(e.peso||'')).join(' ; '));
    t('v89 G: el día sin sesión queda vacío',!(w.S.schedule[k('S')]||[]).some(x=>x.type==='free'));
    t('v89 G: las sesiones guardan sus condiciones',sL.cond&&sL.cond.min===30&&!w.mainAISess(k('X')).cond);
  }

  // --- H. modificar o generar un día parte de sus condiciones -------------------------------------------------
  {
    const {w,k}=mk();
    w.S.dayOverrides[k('V')]={min:30,equipos:['ninguno']};
    w.openModify(k('V'));
    t('v89 H: «Modificar» arranca con el material y los minutos del día',JSON.stringify(w.__k.MOD().equipos)==='["ninguno"]'&&w.document.getElementById('mod-min').value==='30');
    w.closeSheet&&w.closeSheet('mod-bg');
    w.openGen(k('V'),4);
    t('v89 H: «Generar» también',JSON.stringify(w.__k.GEN().equipos)==='["ninguno"]'&&w.document.getElementById('gen-min').value==='30');
    w.openModify(k('L'));
    t('v89 H: un día sin cambios arranca con lo general',JSON.stringify(w.__k.MOD().equipos)==='["mancuernas","bandas"]');
  }
  t('v89: cero llamadas a la API',HTML.indexOf('api.anthropic.com')<0);
}

/* ---------- 26. v90 · una sola puerta para planificar la semana, en Progreso -------------------- */
if(!boot(null).planificarConClaude){ t('v90: planificarConClaude existe',false); } else {
  const seccion=id=>{const i=HTML.indexOf('<div id="'+id+'" class="screen">');const j=HTML.indexOf('class="screen">',i+30);return HTML.slice(i,j<0?undefined:j);};
  const prog=seccion('s-prog'),prof=seccion('s-prof');
  // --- A. dónde está cada cosa ------------------------------------------------------------------
  t('v90 A: en todo el HTML ya no hay botones que abran el mensaje sin pasar por la tarjeta',!/onclick="openWeekBridge\(\)"/.test(HTML)&&!/onclick="buildWeekOffline\(\)"/.test(HTML));
  t('v90 A: Progreso tiene la tarjeta con los dos botones',/id="plan-card"/.test(prog)&&/planificarConClaude\(\)/.test(prog)&&/planificarOffline\(\)/.test(prog));
  t('v90 A: la tarjeta lleva semana, cambios por día e instrucciones, en ese orden',
    (()=>{const a=prog.indexOf('id="exc-weeks"'),b=prog.indexOf('id="exc-body"'),c=prog.indexOf('id="week-note"'),d=prog.indexOf('planificarConClaude()');return a>0&&a<b&&b<c&&c<d;})());
  t('v90 A: Perfil se queda sin generar y sin lo semanal, con un enlace a Progreso',!/planificar(ConClaude|Offline)\(\)/.test(prof)&&!/id="week-note"/.test(prof)&&!/id="exc-body"/.test(prof)&&/irAPlanificar\(\)/.test(prof));
  t('v90 A: Perfil conserva la semana tipo, el tiempo y el material',/id="ai-days"/.test(prof)&&/id="minutos"/.test(prof)&&/id="equip-chips"/.test(prof));
  t('v90 A: los identificadores no se duplican',(HTML.match(/id="week-note"/g)||[]).length===1&&(HTML.match(/id="exc-body"/g)||[]).length===1&&(HTML.match(/id="exc-weeks"/g)||[]).length===1);
  t('v90 A: el atajo del Calendario lleva a la tarjeta',/onclick="irAPlanificar\(1\)">✨ Planificar semana próxima/.test(HTML));
  t('v90 A: no quedan textos que manden a «Adaptar con Claude» ni a «Generar semana» en Perfil',!/"Adaptar con Claude"/.test(HTML)&&!/Pulsa "Generar semana" en Perfil/.test(HTML));

  // --- B. con Claude ------------------------------------------------------------------------------
  {
    const w=boot(estadoVeterano());w.S.currentWeek=0;w.tab('prog');
    t('v90 B: por defecto se planifica la semana próxima',/Se planificará la semana del/.test(w.document.getElementById('plan-aviso').innerHTML));
    w.document.getElementById('week-note').value='esta semana evita saltos';
    w.planificarConClaude();
    t('v90 B: el plan va a la semana elegida',w.S.currentWeek===1);
    t('v90 B: se abre el puente con Claude',w.document.getElementById('bridge-bg').classList.contains('show')&&/Copiar mensaje para Claude/.test(w.document.getElementById('bridge-body').innerHTML));
    t('v90 B: el mensaje lleva la nota escrita en Progreso',/esta semana evita saltos/.test(w._prompt||''));
    t('v90 B: y la nota persiste',JSON.parse(w.localStorage.getItem('fitcoach')).weekNote==='esta semana evita saltos');
    const w2=boot(estadoVeterano());w2.tab('prog');w2.excSemana(0);
    t('v90 B: si eliges la semana en curso, se avisa',/semana <b>en curso<\/b>/.test(w2.document.getElementById('plan-aviso').innerHTML));
    w2.planificarConClaude();
    t('v90 B: y se planifica esa',w2.S.currentWeek===0);
  }

  // --- C. sin conexión ------------------------------------------------------------------------------
  {
    const w=boot(estadoVeterano());let preguntas=0;w.confirm=()=>{preguntas++;return true;};
    w.tab('prog');
    w.planificarOffline();
    const lunes=w.keyDeCodigo('L',1);
    t('v90 C: sin conexión genera la semana próxima por defecto',w.S.currentWeek===1&&!!w.mainAISess(lunes));
    t('v90 C: sin preguntar cuando es la próxima',preguntas===0);
    const w2=boot(estadoVeterano());let n2=0;w2.confirm=()=>{n2++;return false;};
    w2.tab('prog');w2.excSemana(0);
    const antes=JSON.stringify(w2.S.schedule);
    w2.planificarOffline();
    t('v90 C: sobre la semana en curso pregunta antes',n2===1);
    t('v90 C: y si dices que no, no toca nada',JSON.stringify(w2.S.schedule)===antes);
    const w3=boot(estadoVeterano());w3.confirm=()=>true;w3.tab('prog');
    w3.excMin(w3.keyDeCodigo('L',1),30);w3.planificarOffline();
    t('v90 C: respeta los cambios por día de la tarjeta',w3.mainAISess(w3.keyDeCodigo('L',1)).cond.min===30);
  }

  // --- D. accesos ------------------------------------------------------------------------------------
  {
    const w=boot(estadoVeterano());w.tab('prof');
    w.irAPlanificar();
    const activa=()=>w.document.querySelector('.tabbar .t.active').getAttribute('data-s');
    t('v90 D: el enlace de Perfil lleva a Progreso',activa()==='prog');
    t('v90 D: con la tarjeta pintada',/Lunes/.test(w.document.getElementById('exc-body').innerHTML));
    w.tab('cal');w.irAPlanificar(1);
    t('v90 D: el atajo del Calendario fija la semana próxima',activa()==='prog'&&/class="chip sel"[^>]*>Próxima/.test(w.document.getElementById('exc-weeks').innerHTML));
    w.tab('prof');w.document.querySelector('.tabbar .t[data-s="sess"]');
    const w2=boot(estadoVeterano());w2.tab('prog');
    t('v90 D: al entrar en Progreso la tarjeta ya está pintada',/Miércoles/.test(w2.document.getElementById('exc-body').innerHTML)&&!!w2.document.getElementById('plan-aviso').innerHTML);
  }
  t('v90: cero llamadas a la API',HTML.indexOf('api.anthropic.com')<0);
}

/* ---------- 27. v91 · textos completos, figuras, semana del bloque y desayuno ------------------- */
if(!boot(null).separarExplicacion){ t('v91: separarExplicacion existe',false); } else {
  // --- A. límites de guardado ---------------------------------------------------------------------
  {
    const w=boot(estadoVeterano());
    const largo=n=>'palabra '.repeat(Math.ceil(n/8)).slice(0,n);
    const ex=w.cleanEx({nombre:'Press',peso:'16 kg por mancuerna (una en cada mano), sentado con la espalda apoyada en un banco inclinado a 60 grados y los pies firmes en el suelo',descripcion:largo(1800),nota_progresion:largo(1400),errores:[largo(380)]});
    t('v91 A: la carga larga ya no se corta a 120',!/…$/.test(ex.peso)&&ex.peso.length>120);
    t('v91 A: descripción hasta 2000',!/…$/.test(ex.descripcion));
    t('v91 A: nota de progresión hasta 1500',!/…$/.test(ex.nota_progresion));
    t('v91 A: errores hasta 400',!/…$/.test(ex.errores[0]));
    const ses=w.cleanSession({titulo:'x',meta:largo(1800),calentamiento:largo(1800),vuelta_calma:largo(1400),ejercicios:[]});
    t('v91 A: meta, calentamiento y vuelta a la calma enteros',!/…$/.test(ses.meta)&&!/…$/.test(ses.calentamiento)&&!/…$/.test(ses.vuelta_calma));
    const k=w.keyDeCodigo('S',0);
    w.applyBridgePlan({sesiones_ia:[{dia_codigo:'L',titulo:'L',ejercicios:[{nombre:'Remo mancuerna',series:3,reps:'8-12',descanso_seg:90,peso:'18 kg por mancuerna'}]}],
      analisis_progreso:largo(5000),recomendacion_cardio:largo(2500),
      mesociclo:{enfoque:'Acumulación',semanas_bloque:4,semana_en_bloque:2,justificacion:largo(2500)}});
    t('v91 A: el análisis del entrenador se guarda entero (antes cortaba el cardio a 1200)',!/…$/.test(w.S.insight)&&w.S.insight.length>9000,String(w.S.insight.length));
    const libre=(w.S.schedule[k]||[]).find(s=>s.type==='free');
    t('v91 A: la recomendación de cardio del día libre, entera (antes 500)',libre&&!/…$/.test(libre.meta),libre&&String(libre.meta.length));
    const cl=w.S.coachLog[w.S.coachLog.length-1];
    t('v91 A: el registro del entrenador guarda más (1500/2500)',cl.justificacion.length>=1490&&cl.analisis.length>=2490);
    w.S.insight='Texto largo que se cortó…';w.tab('prog');w.renderProg();
    t('v91 A: un texto ya cortado lo dice',/se perdió al guardarse en una versión anterior/.test(w.document.getElementById('insight-cortado').textContent));
    w.S.insight='Texto entero.';w.renderProg();
    t('v91 A: y si no está cortado no dice nada',!w.document.getElementById('insight-cortado'));
  }

  // --- B. desayuno: la explicación no es un plato ---------------------------------------------------
  {
    const w=boot(estadoVeterano());
    const r1=w.separarExplicacion('(Menú: propuesta orientativa para dar ideas, no un objetivo a cumplir al gramo.) Avena (60 g) con leche y un plátano');
    t('v91 B: «(explicación) plato» se separa',r1.plato==='Avena (60 g) con leche y un plátano'&&/propuesta orientativa/.test(r1.explicacion),JSON.stringify(r1));
    const r2=w.separarExplicacion('(Menú: propuesta orientativa para dar ideas y llegar a la proteína, no un objetivo a cumplir al gramo. No toco las calorías: llevas tres pesadas…');
    t('v91 B: si todo es explicación, el plato queda vacío',r2.plato===''&&/No toco las calorías/.test(r2.explicacion));
    t('v91 B: un plato normal no se toca',w.separarExplicacion('Lentejas guisadas (80 g en crudo) con pavo').explicacion==='');
    const n=w.cleanNutri({calorias_diarias:2150,proteina_g:135,agua_litros:'3',nota:'Mantengo.',menu_dia:[
      {momento:'Desayuno',hora:'08:00',plato:'(Propuesta orientativa, no un objetivo a cumplir al gramo.) Tostadas con huevo',kcal:430,proteina_g:26},
      {momento:'Comida',hora:'14:00',plato:'Lentejas con pavo',kcal:660,proteina_g:46}]});
    t('v91 B: al aplicar el plan la explicación pasa a la nota',n.menu_dia[0].plato==='Tostadas con huevo'&&/Mantengo\.\n\n/.test(n.nota)&&/Propuesta orientativa/.test(n.nota),JSON.stringify(n));
    const pl=w.cleanNutri({menu_dia:[{momento:'Comida',plato:'x '.repeat(250)}]});
    t('v91 B: el plato admite hasta 600 caracteres',!/…$/.test(pl.menu_dia[0].plato));
    // datos guardados con la versión anterior: se corrigen al pintar, sin tocar lo guardado
    w.S.nutri={calorias_diarias:2150,proteina_g:135,agua_litros:'3',menu_dia:[
      {momento:'Desayuno',hora:'08:00',plato:'(Menú: propuesta orientativa para dar ideas y llegar a la proteína, no un objetivo a cumplir al gramo. No toco las calorías: llevas tres pesadas…',kcal:430,proteina_g:26},
      {momento:'Comida',hora:'14:00',plato:'Lentejas con pavo',kcal:660,proteina_g:46}]};
    const antes=JSON.stringify(w.S.nutri);
    w.tab('nutri');w.renderNutri();
    const html=w.document.getElementById('nutri-content').innerHTML;
    t('v91 B: la explicación se muestra como nota del entrenador',/Nota de tu entrenador/.test(html)&&/No toco las calorías/.test(html));
    t('v91 B: el desayuno ya no muestra la explicación',(()=>{const i=html.indexOf('Desayuno');const j=html.indexOf('Comida');return i>0&&!/propuesta orientativa/.test(html.slice(i,j))&&/no concretó el plato/.test(html.slice(i,j));})());
    t('v91 B: avisa de que se guardó cortada',/se guardó cortado en una versión anterior/.test(html));
    t('v91 B: no modifica lo guardado',JSON.stringify(w.S.nutri)===antes);
    const pm=w.buildPrompt('adapt');
    t('v91 B: el mensaje pide la explicación en nutricion.nota y solo el plato en cada plato',/en cada "plato" escribe SOLO el plato/.test(pm)&&/"nota":"string: por qué esas calorías/.test(pm));
  }

  // --- C. semana del bloque en Perfil -----------------------------------------------------------------
  {
    const w=boot(estadoVeterano());w.tab('prof');w.renderMeso();
    let h=w.document.getElementById('meso-coach').innerHTML;
    t('v91 C: enseña la semana del calendario automático',/Calendario automático:<\/b> bloque \d+, semana \d+ de 4/.test(h),h.slice(0,200));
    t('v91 C: sin plan nuevo, dice que aún no hay semana del entrenador',/Aún no hay un plan/.test(h));
    // el entrenador fija una semana distinta de la del calendario
    const cur=w.programWeekFor(w.todayKey());const teoW=((cur-1)%4)+1;const sb=teoW===1?3:1;
    w.S.currentWeek=0;
    w.applyBridgePlan({sesiones_ia:[{dia_codigo:'L',titulo:'L',ejercicios:[{nombre:'Remo mancuerna',series:3,reps:'8-12',descanso_seg:90,peso:'18 kg por mancuerna'}]}],
      mesociclo:{enfoque:'Acumulación',semanas_bloque:4,semana_en_bloque:sb,justificacion:'La semana reducida del 14/9 rompió la cuenta: este bloque empezó después.'}});
    w.tab('prof');w.renderMeso();h=w.document.getElementById('meso-coach').innerHTML;
    t('v91 C: enseña la semana que dice el entrenador',new RegExp('Según tu entrenador:</b> bloque \\d+, semana '+sb+' de 4').test(h),h.slice(0,400));
    t('v91 C: si no coinciden, lo dice y explica cuál manda',/No coinciden, y manda la de tu entrenador/.test(h));
    t('v91 C: con el porqué del entrenador',/Por qué, según tu entrenador:<\/b> La semana reducida del 14\/9 rompió la cuenta/.test(h));
    t('v91 C: se guarda y persiste',JSON.parse(w.localStorage.getItem('fitcoach')).mesoNota.semana_en_bloque===sb);
    const w2=boot(estadoVeterano());w2.S.currentWeek=0;
    w2.applyBridgePlan({sesiones_ia:[{dia_codigo:'L',titulo:'L',ejercicios:[{nombre:'Remo mancuerna',series:3,reps:'8-12',descanso_seg:90,peso:'18 kg por mancuerna'}]}],
      mesociclo:{enfoque:'Acumulación',semanas_bloque:4,justificacion:'x'}});
    w2.tab('prof');w2.renderMeso();
    const w3=boot(estadoVeterano());
    const sem=w3.weekKeyOf(w3.todayKey());const pw=w3.programWeekFor(sem);const tw=((pw-1)%4)+1;const dice=tw===3?2:3;
    w3.S.coachLog=[{fecha:w3.todayKey(),semana:sem,enfoque:'x',justificacion:'Por mi cuenta es la semana '+dice+' del bloque que abrimos el 21/9 (la app marca la '+tw+').',analisis:'y',sesiones:3}];
    w3.tab('prof');w3.renderMeso();const h3=w3.document.getElementById('meso-coach').innerHTML;
    t('v91 C: con planes antiguos lee la semana del texto del entrenador y la compara con la del calendario para esa semana',
      new RegExp('semana '+dice+' del bloque\\. Para esa misma semana el calendario contaba la '+tw).test(h3)&&/No coinciden/.test(h3),h3.slice(0,500));
    t('v91 C: si el entrenador no la indica, se dice',/no indicó en su último plan qué semana del bloque era/.test(w2.document.getElementById('meso-coach').innerHTML));
  }

  // --- D. figuras de los ejercicios -------------------------------------------------------------------------
  {
    const w=boot(estadoVeterano());
    const casos=[['Press de pecho en suelo con mancuernas','pressdb'],['Press de pecho con banda rodeando la espalda','pressbanda'],
      ['Press de hombros sentado con mancuernas','militarsent'],['Press militar con mancuernas','militar'],['Fondos en silla','fondos'],
      ['Puente de isquios con talones en una silla','curlfem'],['Puente de glúteo','hipthrust'],['Sentadilla isométrica en pared con mancuernas','wallsit'],
      ['Zancada inversa con mancuerna en posición goblet','zancada'],['Sentadilla goblet','goblet'],['Curl femoral deslizante','curlfem'],
      ['Peso muerto rumano con mancuernas','rdl'],['Paseo lateral con banda','paseolat'],['Elevaciones laterales','lateral'],
      ['Paseo del granjero','granjero'],['Paseo de maleta con una mancuerna','granjero'],['Remo invertido en mesa','remoinv'],
      ['Remo renegado con mancuernas','renegado'],['Remo con mancuerna a una mano','remodb'],['Pull-apart con banda','pullapart'],
      ['Face pull con banda','facepull'],['Pájaros con mancuernas','pajaro'],['Bicho muerto con mancuerna','bichomuerto'],
      ['Posición hueca (hollow hold)','bichomuerto'],['Abducción de cadera tumbado de lado con mancuerna','abduccion'],
      ['Patada de gluteo con banda','patadaglut'],['Leñador con banda','lenador'],['Elevacion de piernas colgado','legraisehang'],
      ['Elevación de piernas tumbado','legraise'],['Patada de triceps con banda','patadatri'],['Extensión de tríceps tumbado en el suelo con mancuernas','tricepstumb'],
      ['Extensión de tríceps sobre la cabeza','triceps'],['Empuje de cadera con banda','hipthrust'],['Curl de bíceps con mancuernas','curl'],['Dominadas','dominada']];
    casos.forEach(([n,k])=>t('v91 D: figura de «'+n+'» = '+k,w.figKey(n)===k,String(w.figKey(n))));
    t('v91 D: todas las figuras nombradas existen y se dibujan',casos.every(([n])=>/<svg/.test(w.exSVG(n))&&/class="exfa"/.test(w.exSVG(n))));
    t('v91 D: el press de pecho se dibuja tumbado (hombro y cadera a la misma altura)',(()=>{const f=w.__k.FIGS().pressdb;return Math.abs(f.A.sh[1]-f.A.hip[1])<8&&f.B.haL[1]<f.A.haL[1];})());
  }
  // --- E. numeración de semanas por calendario --------------------------------------------------------------
  {
    const w=boot(estadoVeterano());
    w.S.programStart='2026-06-07'; // domingo, como en la copia real
    t('v91 E: el lunes y el domingo de una misma semana tienen el mismo número',w.programWeekFor('2026-10-05')===w.programWeekFor('2026-10-11'),
      w.programWeekFor('2026-10-05')+' vs '+w.programWeekFor('2026-10-11'));
    t('v91 E: la semana del primer registro es la 1',w.programWeekFor('2026-06-07')===1&&w.programWeekFor('2026-06-01')===1&&w.programWeekFor('2026-06-08')===2);
    t('v91 E: semana del 5/10 = 19 (lunes 1/6 → lunes 5/10 son 18 semanas)',w.programWeekFor('2026-10-05')===19);
  }
  t('v91: cero llamadas a la API',HTML.indexOf('api.anthropic.com')<0);
}

/* ---------- 28. v92 · progresiones: medir sin ancla, confirmar, técnica, topes y escalonada ------- */
if(!boot(null).objetivoReps){ t('v92: objetivoReps existe',false); } else {
  const hoyD=new Date();
  const dd=n=>{const x=new Date(hoyD);x.setDate(x.getDate()-n);
    return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');};

  // --- A. reproductor: las repeticiones no vienen escritas -------------------------------------------------
  {
    const w=boot(estadoVeterano());
    w.S.profile.limitaciones=[];
    const k=w.todayKey();
    w.S.history=[{key:dd(4),title:'Fuerza',sets:[{nombre:'Remo con mancuerna a una mano',series:[{kg:22,reps:'10',rir:2},{kg:22,reps:'9',rir:1},{kg:22,reps:'9',rir:1}]}]}];
    w.S.schedule[k]=[{type:'ai',title:'A',done:false,ajusteDia:{fecha:k,cambios:[],rechazados:[]},exercises:[
      {nombre:'Remo con mancuerna a una mano',series:3,reps:'8-12 por brazo',descanso_seg:60,rir:'1-2',peso:'22 kg por mancuerna (un brazo cada vez)'}]}];
    w.startPlayer(k);
    let body=w.document.getElementById('player-body').innerHTML;
    const rEl=()=>w.document.getElementById('pl-reps');
    t('v92 A: la serie 1 llega sin repeticiones escritas',rEl().value==='');
    t('v92 A: el objetivo sale de lo de la última vez +1 (10 → 11)',rEl().getAttribute('placeholder')==='obj. 11'&&/Objetivo de hoy: <b>11<\/b>/.test(body),rEl().getAttribute('placeholder'));
    t('v92 A: hay botón para escribir el objetivo de un toque',!!w.document.getElementById('pl-obj'));
    t('v92 A: la carga sí viene escrita',w.document.getElementById('pl-kg').value==='22');
    w.finishSet();
    t('v92 A: sin repeticiones la serie no se guarda',!(w.S.schedule[k][0].sets||[]).length&&/Anota las repeticiones/.test(w.document.getElementById('pl-msg').textContent));
    w.stepField('pl-reps',1,0,false);
    t('v92 A: el + parte del objetivo, no de cero',rEl().value==='12',rEl().value);
    rEl().value='';w.ponerObjetivo();
    t('v92 A: «= objetivo» lo escribe',rEl().value==='11');
    w.finishSet();w.skipRest&&w.skipRest();
    t('v92 A: la serie 2 tampoco hereda las repeticiones de la 1',rEl().value==='',rEl().value);
    t('v92 A: su objetivo es el de la serie 2 de la última vez (9 → 10)',rEl().getAttribute('data-obj')==='10');
    body=w.document.getElementById('player-body').innerHTML;
    t('v92 A: en las series intermedias no se pregunta por la técnica',!/id="tec-ok"/.test(body));
    rEl().value='10';w.finishSet();w.skipRest&&w.skipRest();
    body=w.document.getElementById('player-body').innerHTML;
    t('v92 A: la última serie va con tope abierto',/Última serie, tope abierto/.test(body));
    t('v92 A: y pregunta por la técnica, sin marcar',/id="tec-ok"/.test(body)&&/id="tec-dudosa"/.test(body)&&!/id="tec-ok" class="esf-b esf-on"/.test(body));
    w.setTec('dudosa');
    rEl().value='14';w.setRir(1);w.finishSet();
    const e=w.S.schedule[k][0].sets[0];
    t('v92 A: la serie abierta se guarda como tal y puede pasar del tope',e.series[2].abierta===true&&e.series[2].reps==='14',JSON.stringify(e.series[2]));
    t('v92 A: la técnica se guarda con el ejercicio',e.tec==='dudosa');
    t('v92 A: y persiste',JSON.parse(w.localStorage.getItem('fitcoach')).schedule[k][0].sets[0].tec==='dudosa');
    t('v92 A: el detalle enseña la técnica',/técnica dudosa/.test(w.fmtSetsDetalladas(e)));
    t('v92 A: el esfuerzo enseña el tope abierto',/s3 RIR 1, tope abierto/.test(w.esfDetalle(e.series)),w.esfDetalle(e.series));
    w.eval('P._terminando=true');w.closePlayer();
  }

  // --- B. objetivo de repeticiones ----------------------------------------------------------------------------
  {
    const w=boot(estadoVeterano());
    const ex={nombre:'Press de hombros sentado con mancuernas',series:3,reps:'8-12',peso:'14 kg por mancuerna'};
    w.S.history=[];
    t('v92 B: sin historial, el centro del rango',w.objetivoReps(ex,1,w.todayKey())===10);
    w.S.history=[{key:dd(5),sets:[{nombre:ex.nombre,series:[{kg:14,reps:'12'},{kg:14,reps:'11'},{kg:14,reps:'10'}]}]}];
    t('v92 B: en el tope no se pide más que el tope',w.objetivoReps(ex,1,w.todayKey())===12);
    t('v92 B: serie a serie',w.objetivoReps(ex,3,w.todayKey())===11);
    t('v92 B: tras subir carga, la parte baja +1',w.objetivoReps(Object.assign({},ex,{peso:'16 kg por mancuerna'}),1,w.todayKey())===9);
    t('v92 B: las series por tiempo no tienen objetivo',w.objetivoReps({nombre:'Plancha',reps:'40s'},1)===null);
  }

  // --- C. la serie abierta no aplica en todas partes ------------------------------------------------------------
  {
    const w=boot(estadoVeterano());
    w.S.profile.limitaciones=[];
    w.P={sess:{}};
    t('v92 C: no en los de fallo técnico (ya lo son)',w.serieAbierta({nombre:'Curl de bíceps con mancuernas',reps:'8-12',series:3})===false);
    t('v92 C: sí en un multiarticular',w.serieAbierta({nombre:'Sentadilla goblet',reps:'8-12',series:3})===true);
    t('v92 C: no en series por tiempo',w.serieAbierta({nombre:'Plancha',reps:'40s'})===false);
    w.P={sess:{ajusteDia:{estado:'cansado'}}};
    t('v92 C: no el día que se llega cansado',w.serieAbierta({nombre:'Sentadilla goblet',reps:'8-12',series:3})===false);
    w.P={sess:{}};
    w.S.profile.limitaciones=['rodilla'];
    t('v92 C: no si el ejercicio carga una zona con molestia',w.serieAbierta({nombre:'Sentadilla goblet',reps:'8-12',series:3})===false);
  }

  // --- D. la regla: confirmar, técnica, ejercicio nuevo ------------------------------------------------------------
  {
    const w=boot(estadoVeterano());w.S.dumbbells={min:8,max:40,step:2};
    const ex={nombre:'Sentadilla goblet',series:3,reps:'8-12',peso:'una sola mancuerna de 28 kg'};
    const s1=[{kg:28,reps:'12',rir:1},{kg:28,reps:'12',rir:1},{kg:28,reps:'12',rir:1}];
    let d=w.decisionProgresion(ex,s1,null,{nPrev:4});
    t('v92 D: margen de 1 en una sola sesión → confirmar, no subir',d.accion==='confirmar'&&/dos sesiones seguidas/.test(d.texto),d.texto);
    d=w.decisionProgresion(ex,s1,null,{nPrev:4,prev:[{kg:28,reps:'12'},{kg:28,reps:'12'},{kg:28,reps:'12'}]});
    t('v92 D: margen de 1 y la sesión anterior también cerró el rango → subir',d.accion==='subir'&&/segunda sesión seguida/.test(d.texto),d.texto);
    d=w.decisionProgresion(ex,s1,null,{nPrev:4,prev:[{kg:26,reps:'12'},{kg:26,reps:'12'},{kg:26,reps:'12'}]});
    t('v92 D: si la anterior fue con otra carga no cuenta como confirmación',d.accion==='confirmar');
    d=w.decisionProgresion(ex,[{kg:28,reps:'12',rir:1},{kg:28,reps:'12',rir:1},{kg:28,reps:'14',rir:1,abierta:true}],null,{nPrev:4});
    t('v92 D: la serie abierta con 2 o más por encima del tope → subir ya',d.accion==='subir'&&/margen de 2 o más/.test(d.texto),d.texto);
    d=w.decisionProgresion(ex,[{kg:28,reps:'12',rir:2},{kg:28,reps:'12',rir:2},{kg:28,reps:'12',rir:2}],null,{nPrev:4});
    t('v92 D: RIR 2 declarado en todas → subir ya (1-2 por encima, ACSM)',d.accion==='subir');
    d=w.decisionProgresion(ex,[{kg:28,reps:'12',rir:2},{kg:28,reps:'12',rir:2},{kg:28,reps:'12',rir:2}],null,{nPrev:4,tec:'dudosa'});
    t('v92 D: con técnica dudosa no se sube',d.accion==='tecnica'&&/técnica como dudosa/.test(d.texto));
    d=w.decisionProgresion(ex,[{kg:28,reps:'12',rir:2},{kg:28,reps:'12',rir:2},{kg:28,reps:'12',rir:2}],null,{nPrev:1});
    t('v92 D: ejercicio nuevo sin técnica confirmada → confirmar',d.accion==='confirmar'&&/2\.ª sesión de este ejercicio/.test(d.texto),d.texto);
    d=w.decisionProgresion(ex,[{kg:28,reps:'12',rir:2},{kg:28,reps:'12',rir:2},{kg:28,reps:'12',rir:2}],null,{nPrev:1,tec:'ok'});
    t('v92 D: ejercicio nuevo con técnica limpia → puede subir',d.accion==='subir');
    d=w.decisionProgresion(ex,[{kg:28,reps:'12',rir:1},{kg:28,reps:'12',rir:0},{kg:28,reps:'13',rir:0,abierta:true}],null,{nPrev:4});
    t('v92 D: en la serie abierta, RIR 0 por encima del tope no cuenta para consolidar',d.accion!=='consolidar',d.accion);
    t('v92 D: «con margen» solo aparece si lo hay',!/con margen/.test(w.decisionProgresion(ex,[{kg:28,reps:'12',rir:0},{kg:28,reps:'12',rir:1},{kg:28,reps:'12',rir:1}],null,{nPrev:4}).texto||''));
  }

  // --- E. topes del rango y subida escalonada -----------------------------------------------------------------------
  {
    const w=boot(estadoVeterano());w.S.dumbbells={min:8,max:40,step:2};
    t('v92 E: multiarticular tope 15, monoarticular 20',w.topeRepsRango({nombre:'Press de hombros sentado'})===15&&w.topeRepsRango({nombre:'Elevaciones laterales'})===20&&w.topeRepsRango({nombre:'Curl de bíceps'})===20);
    const exH={nombre:'Press de hombros sentado con mancuernas',series:3,reps:'8-12',peso:'12 kg por mancuerna'};
    let d=w.decisionProgresion(exH,[{kg:12,reps:'12',rir:1},{kg:12,reps:'12',rir:1},{kg:12,reps:'12',rir:1}],null,{nPrev:4});
    t('v92 E: el salto no cabe → rango ampliado, sin pasar de 15',d.accion==='ampliar'&&d.tope<=15,JSON.stringify(d));
    d=w.decisionProgresion(Object.assign({},exH,{reps:'10-15'}),[{kg:12,reps:'15',rir:1},{kg:12,reps:'15',rir:1},{kg:12,reps:'15',rir:1}],null,{nPrev:4});
    t('v92 E: con el rango ya en 15 → subida escalonada',d.accion==='escalonada'&&d.escalon.kg===14&&d.escalon.series===1&&/solo en la 1\.ª serie/.test(d.texto),JSON.stringify(d));
    const exL={nombre:'Elevaciones laterales',series:3,reps:'12-16',peso:'8 kg por mancuerna'};
    d=w.decisionProgresion(exL,[{kg:8,reps:'16',rir:1},{kg:8,reps:'16',rir:1},{kg:8,reps:'16',rir:1}],null,{nPrev:4});
    t('v92 E: un monoarticular puede ampliar hasta 20',d.accion==='ampliar'&&d.tope<=20&&d.tope>16,JSON.stringify(d));
    // series con dos cargas
    const exE=Object.assign({},exH,{reps:'10-15',escalon:{kg:14,series:1}});
    d=w.decisionProgresion(exE,[{kg:14,reps:'11',rir:1},{kg:12,reps:'15',rir:1},{kg:12,reps:'15',rir:1}],null,{});
    t('v92 E: escalonada en curso: suma repeticiones con la carga nueva',d.accion==='escalonada'&&d.escalon.series===1&&/suma repeticiones/.test(d.texto),d.texto);
    d=w.decisionProgresion(exE,[{kg:14,reps:'15',rir:1},{kg:12,reps:'15',rir:1},{kg:12,reps:'15',rir:1}],null,{});
    t('v92 E: la 1.ª serie cierra el rango → pasa la 2.ª',d.accion==='escalonada'&&d.escalon.series===2,d.texto);
    d=w.decisionProgresion(exE,[{kg:14,reps:'15',rir:1},{kg:14,reps:'15',rir:1},{kg:12,reps:'15',rir:1}],null,{});
    t('v92 E: con todas menos una → carga nueva en todas',d.accion==='escalon_completo'&&d.up===14,d.texto);
    d=w.decisionProgresion(exE,[{kg:14,reps:'8',rir:0},{kg:12,reps:'15',rir:1},{kg:12,reps:'15',rir:1}],null,{});
    t('v92 E: si la carga nueva no llega a la parte baja → atrás',d.accion==='escalon_atras'&&/vuelve a 12 kg/.test(d.texto),d.texto);
    t('v92 E: cleanEx admite escalon válido',JSON.stringify(w.cleanEx({nombre:'x',escalon:{kg:'14',series:'2'}}).escalon)==='{"kg":14,"series":2}');
    t('v92 E: cleanEx descarta escalon inválido',!('escalon' in w.cleanEx({nombre:'x',escalon:{kg:'<b>',series:9}}))&&!('escalon' in w.cleanEx({nombre:'x',escalon:'22'})));
    t('v92 E: kgSerie respeta la escalonada',w.kgSerie(exE,1)===14&&w.kgSerie(exE,2)===12&&w.kgSerie(exH,1)===12);
  }

  // --- F. el reproductor y la revisión del día con subida escalonada --------------------------------------------------
  {
    const w=boot(estadoVeterano());w.S.dumbbells={min:8,max:40,step:2};w.S.profile.limitaciones=[];
    const k=w.todayKey();
    w.S.history=[{key:dd(4),title:'Fuerza',sets:[{nombre:'Press de hombros sentado con mancuernas',tec:'ok',series:[{kg:12,reps:'15',rir:1},{kg:12,reps:'15',rir:1},{kg:12,reps:'15',rir:1}]}]},
                 {key:dd(11),title:'Fuerza',sets:[{nombre:'Press de hombros sentado con mancuernas',series:[{kg:12,reps:'15'},{kg:12,reps:'15'},{kg:12,reps:'15'}]}]},
                 {key:dd(18),title:'Fuerza',sets:[{nombre:'Press de hombros sentado con mancuernas',series:[{kg:12,reps:'14'},{kg:12,reps:'14'},{kg:12,reps:'14'}]}]}];
    w.S.schedule[k]=[{type:'ai',title:'F',done:false,exercises:[
      {nombre:'Press de hombros sentado con mancuernas',series:3,reps:'10-15',descanso_seg:90,rir:'1-2',peso:'14 kg por mancuerna (una en cada mano)'}]}];
    const pr=w.ajustesDelDia(k,{estado:'normal',dolor:[]});
    const p0=pr[0]||{cambios:{}};
    t('v92 F: la revisión del día propone la escalonada en vez del salto entero',p0.cambios.escalon&&p0.cambios.escalon.despues.kg===14&&p0.cambios.escalon.despues.series===1,JSON.stringify(p0.cambios));
    t('v92 F: y devuelve la carga base a 12 kg',p0.cambios.peso&&/^12 kg/.test(p0.cambios.peso.despues));
    t('v92 F: el cambio se describe en claro',/subida escalonada: 14 kg en la 1\.ª serie/.test(w._descCambios(p0.cambios)),w._descCambios(p0.cambios));
    w.preSesion(k);w.preRevisar();w.preEmpezar(true);
    const ex=w.mainAISess(k).exercises[0];
    t('v92 F: al aplicarla, el ejercicio lleva escalon y guarda el original',ex.escalon&&ex.escalon.kg===14&&ex._preAjuste&&ex._preAjuste.escalon===null&&/^14 kg/.test(ex._preAjuste.peso),JSON.stringify(ex));
    t('v92 F: el reproductor pone 14 kg en la 1.ª serie',w.document.getElementById('pl-kg').value==='14');
    t('v92 F: y lo explica',/subida escalonada: 14 kg en la 1\.ª serie/.test(w.document.getElementById('player-body').innerHTML));
    w.document.getElementById('pl-reps').value='10';w.finishSet();w.skipRest&&w.skipRest();
    t('v92 F: en la 2.ª serie vuelve a 12 kg',w.document.getElementById('pl-kg').value==='12');
    w.eval('P._terminando=true');w.closePlayer();
    // confirmar: la revisión del día no deja subir sin confirmación
    const w2=boot(estadoVeterano());w2.S.dumbbells={min:8,max:40,step:2};
    w2.S.history=[{key:dd(3),title:'Fuerza',sets:[{nombre:'Sentadilla goblet',series:[{kg:28,reps:'12',rir:1},{kg:28,reps:'12',rir:1},{kg:28,reps:'12',rir:1}]}]},
                  {key:dd(10),title:'Fuerza',sets:[{nombre:'Sentadilla goblet',series:[{kg:26,reps:'12'},{kg:26,reps:'12'},{kg:26,reps:'12'}]}]},
                  {key:dd(17),title:'Fuerza',sets:[{nombre:'Sentadilla goblet',series:[{kg:24,reps:'12'},{kg:24,reps:'12'},{kg:24,reps:'12'}]}]}];
    const k2=w2.todayKey();
    w2.S.schedule[k2]=[{type:'ai',title:'G',done:false,exercises:[{nombre:'Sentadilla goblet',series:3,reps:'8-12',descanso_seg:90,rir:'1-2',peso:'una sola mancuerna de 30 kg'}]}];
    const q=w2.ajustesDelDia(k2,{estado:'normal',dolor:[]})[0]||{cambios:{},motivos:[]};
    t('v92 F: un salto pautado sin confirmar se devuelve a la carga anterior',q.cambios.peso&&/28 kg/.test(q.cambios.peso.despues)&&/falta confirmarlo/.test(q.motivos.join(' ')),JSON.stringify(q));
  }

  // --- G. validador: lo que devuelve Claude pasa por la misma regla ---------------------------------------------------
  {
    const w=boot(estadoVeterano());w.S.dumbbells={min:8,max:40,step:2};
    w.S.currentWeek=1; // el plan es para la semana próxima: lo registrado esta semana es «lo último»
    w.S.history=[{key:dd(4),title:'Fuerza',sets:[{nombre:'Press de pecho en suelo con mancuernas',pesoRef:'20 kg por mancuerna (una en cada mano)',repsRef:'10-16',
      series:[{kg:20,reps:'16',rir:1},{kg:20,reps:'16',rir:0},{kg:20,reps:'14',rir:0}]}]}];
    const plan=(ej)=>({sesiones_ia:[{dia_codigo:'L',titulo:'L',ejercicios:[Object.assign({series:3,descanso_seg:90,patron:'empuje_horizontal'},ej)]}],mesociclo:{enfoque:'x',semanas_bloque:4,semana_en_bloque:2}});
    let iss=w.validatePlan(plan({nombre:'Press de pecho en suelo con mancuernas',reps:'6-10',peso:'22 kg por mancuerna (una en cada mano)'}));
    t('v92 G: avisa de una subida que la regla no da (caso real: 20 kg × 16, 16, 14)',iss.warns.some(x=>/sube de 20 a 22 kg, pero con lo registrado/.test(x)),JSON.stringify(iss.warns));
    t('v92 G: avisa de que cambia rango y carga a la vez',iss.warns.some(x=>/baja el rango \(10-16 → 6-10\)/.test(x)));
    t('v92 G: avisa del rango por encima del tope',w.validatePlan(plan({nombre:'Press de pecho en suelo con mancuernas',reps:'12-18',peso:'20 kg por mancuerna (una en cada mano)'})).warns.some(x=>/pasan del tope/.test(x)));
    w.S.history=[{key:dd(4),title:'Fuerza',sets:[{nombre:'Sentadilla goblet',repsRef:'8-12',tec:'ok',series:[{kg:28,reps:'12',rir:2},{kg:28,reps:'12',rir:2},{kg:28,reps:'12',rir:2}]}]}];
    iss=w.validatePlan(plan({nombre:'Sentadilla goblet',reps:'8-12',peso:'una sola mancuerna de 30 kg'}));
    t('v92 G: una subida que cumple el criterio no avisa',!iss.warns.some(x=>/Sentadilla goblet.*sube de/.test(x)),JSON.stringify(iss.warns));
    t('v92 G: el esquema pide "escalon"',/"escalon":null/.test(w.buildPrompt('adapt')));
  }

  // --- H. mensaje, ficha y estado ---------------------------------------------------------------------------------------
  {
    const orig=estadoVeterano();const w=boot(JSON.parse(JSON.stringify(orig)));
    t('v92 H: initState añade v92Desde y no toca nada más',/^\d{4}-\d{2}-\d{2}$/.test(w.S.v92Desde)&&JSON.stringify(w.S.history)===JSON.stringify(orig.history)&&JSON.stringify(w.S.schedule)===JSON.stringify(orig.schedule));
    const e2=estadoVeterano();e2.v92Desde='2026-11-23';
    t('v92 H: un v92Desde guardado no se pisa',boot(e2).S.v92Desde==='2026-11-23');
    const p=w.buildPrompt('adapt');
    t('v92 H: la regla cita el criterio del ACSM 2009 y la «2 por 2»',/ACSM 2009/.test(p)&&/2 por 2/.test(p)&&/10\.1249\/MSS\.0b013e3181915670/.test(p));
    t('v92 H: cita Nuzzo 2024 con su DOI',/10\.1007\/s40279-023-01937-7/.test(p));
    t('v92 H: avisa de cómo leer los registros anteriores',/CÓMO LEER MIS REPETICIONES/.test(p)&&/paré donde decía la casilla/.test(p));
    t('v92 H: pide no cambiar rango y carga a la vez',/MANTÉN EL MISMO RANGO/.test(p));
    t('v92 H: la técnica entra en la regla',/Con técnica «dudosa» no se sube carga/.test(p));
    t('v92 H: lo que es convención se dice',/Los topes 15\/20, las «dos primeras sesiones», la subida escalonada/.test(p));
    t('v92 H: la ficha de Ajustes recoge las fuentes nuevas',/ACSM 2009 Position Stand/.test(HTML)&&/Nuzzo et al\. 2024/.test(HTML)&&/no se ha comprobado en el texto original/.test(HTML));
    // la vista previa usa los minutos del día
    w.S.currentWeek=0;
    const kL=w.keyDeCodigo('L',0);w.S.dayOverrides[kL]={min:20};
    w.document.getElementById('bridge-in')&&(w.document.getElementById('bridge-in').value=JSON.stringify({sesiones_ia:[{dia_codigo:'L',titulo:'Larga',ejercicios:[1,2,3,4].map(i=>({nombre:'Ej '+i,series:4,reps:'8-12',descanso_seg:90,peso:'solo peso corporal'}))}]}));
    if(w.document.getElementById('bridge-in')){w.previewBridge();
      t('v92 H: la vista previa compara con los minutos de ESE día',/color:var\(--danger\)">· ~\d+ min/.test(w.document.getElementById('bridge-body').innerHTML));}
  }

  // --- I. copia real: ningún rango ampliado por encima del tope ---------------------------------------------------------
  {
    const ruta=process.env.FITCOACH_BACKUP||'/home/claude/data/b.json';
    if(fs.existsSync(ruta)){
      const orig=JSON.parse(fs.readFileSync(ruta,'utf8'));
      const w=boot(JSON.parse(JSON.stringify(orig)));
      let malos=[],n=0;
      Object.keys(w.S.schedule).forEach(k=>{const c=w.complianceFor(k);if(!c)return;c.filas.forEach(f=>{n++;
        const m=f.estado.match(/rango ampliado a \d+-(\d+)/);if(m&&+m[1]>20)malos.push(k+' '+f.nombre+' '+m[0]);
        if(m&&+m[1]>15&&w.topeRepsRango({nombre:f.nombre})===15)malos.push(k+' '+f.nombre+' '+m[0]);});});
      t('v92 I copia real: '+n+' decisiones, ningún rango por encima de su tope',malos.length===0,malos.slice(0,3).join(' | '));
      t('v92 I copia real: v92Desde se añade sin tocar el historial',!!w.S.v92Desde&&JSON.stringify(w.S.history)===JSON.stringify(orig.history));
    }
  }
  // --- J. mancuernas sueltas (solo una unidad de un peso) ------------------------------------------------------------
  {
    const w=boot(estadoVeterano());w.S.dumbbells={min:8,max:50,step:2};
    t('v92 J: initState añade dbSueltas vacío',w.S.dbSueltas==='');
    w.S.dbSueltas='28, 32';
    t('v92 J: lectura',JSON.stringify(w.dbSueltas())==='[28,32]');
    t('v92 J: «una en cada mano» necesita par; goblet y un brazo no',w.necesitaPar('26 kg por mancuerna (una en cada mano)')&&!w.necesitaPar('una sola mancuerna de 28 kg sujeta con ambas manos frente al pecho')&&!w.necesitaPar('28 kg por mancuerna (un brazo cada vez)'));
    t('v92 J: con par, de 26 se salta a 30',w._stepKg(26,1,'26 kg por mancuerna (una en cada mano)')===30);
    t('v92 J: con una sola, de 26 a 28',w._stepKg(26,1,'una sola mancuerna de 26 kg')===28);
    const i={errors:[],warns:[]};
    w.validateExercise({nombre:'Peso muerto rumano con mancuernas',series:3,reps:'8-12',descanso_seg:90,peso:'28 kg por mancuerna (una en cada mano)'},0,i);
    t('v92 J: el validador avisa de un par que no existe',i.warns.some(x=>/de 28 kg solo tienes una/.test(x)),JSON.stringify(i.warns));
    w.S.profile.equipos=['mancuernas'];
    t('v92 J: el mensaje lo dice',/De estos pesos solo tengo UNA mancuerna: 28, 32 kg/.test(w.buildPrompt('adapt')));
    w.tab('prof');w.renderEquipDetail&&w.renderEquipDetail();
    const el=w.document.getElementById('db-sueltas');
    t('v92 J: el campo existe en Perfil',!!el);
    if(el){el.value='32 ; 28 30';w.saveDbSueltas();
      t('v92 J: se normaliza y persiste',JSON.parse(w.localStorage.getItem('fitcoach')).dbSueltas==='28, 30, 32');}
  }
  t('v92: cero llamadas a la API',HTML.indexOf('api.anthropic.com')<0);
}

/* ---------- 29. v92 · comportamiento observable (se ejecuta también contra la v91) ------------ */
{
  const w=boot(estadoVeterano());w.S.profile.limitaciones=[];
  const k=w.todayKey();
  w.S.schedule[k]=[{type:'ai',title:'X',done:false,ajusteDia:{fecha:k,cambios:[],rechazados:[]},exercises:[
    {nombre:'Sentadilla goblet',series:3,reps:'8-12',descanso_seg:60,peso:'una sola mancuerna de 20 kg'}]}];
  w.startPlayer(k);
  t('v92 comportamiento: la casilla de repeticiones no trae escrito el tope del rango',
    w.document.getElementById('pl-reps').value!=='12',w.document.getElementById('pl-reps').value);
  w.eval('P._terminando=true');w.closePlayer();
  w.S.dumbbells={min:8,max:40,step:2};
  const d=w.decisionProgresion({nombre:'Sentadilla goblet',series:3,reps:'8-12',peso:'una sola mancuerna de 28 kg'},
    [{kg:28,reps:'12',rir:1},{kg:28,reps:'12',rir:1},{kg:28,reps:'12',rir:1}],null,{nPrev:4});
  t('v92 comportamiento: una sola sesión con 1 repetición de margen no basta para subir',d&&d.accion!=='subir',d&&d.texto);
}

/* ---------- 30. v93 · evidencia 2024-2026: volumen por grupo, series mínimas, déficit y proteína --- */
if(!boot(null).volumenPlan){ t('v93: volumenPlan existe',false); } else {
  const w=boot(estadoVeterano());w.S.currentWeek=1;
  w.S.profile.objetivos=['musculo','grasa'];w.S.profile.peso='65';w.S.profile.altura='176';w.S.profile.edad='49';w.S.profile.sexo='hombre';
  const ej=(n,m,series,extra)=>Object.assign({nombre:n,musculos:m,series:series||3,reps:'8-12',descanso_seg:90,peso:'16 kg por mancuerna (una en cada mano)',patron:'otro'},extra||{});
  // semana con pecho y cuádriceps cortos y glúteos sobrados (el patrón de la copia real)
  const dia=c=>({dia_codigo:c,titulo:c,ejercicios:[ej('Hip thrust con mancuerna','Glúteos, isquios',4),ej('Puente de glúteo a una pierna','Glúteos',4),
    ej('Peso muerto rumano','Isquios, glúteos',3),ej('Remo con mancuerna','Dorsal, bíceps',3),ej('Press de pecho en suelo','Pecho, tríceps',3),
    ej('Press de hombros sentado','Hombro, tríceps',3),ej('Sentadilla goblet','Cuádriceps, glúteos',3)]});
  const plan={sesiones_ia:[dia('L'),dia('X')],mesociclo:{enfoque:'Acumulación',semanas_bloque:4,semana_en_bloque:2}};
  const v=w.volumenPlan(plan.sesiones_ia);
  t('v93: volumenPlan cuenta como la tarjeta (fraccionado y bruto)',v.bruto.pecho===6&&v.vol.gluteos>20,JSON.stringify(v));
  let iss=w.validatePlan(plan);
  t('v93: avisa de los grupos principales por debajo de 10',iss.warns.some(x=>/por debajo de ~10 series en: .*Cuádriceps 6.*Pecho 6/.test(x)),JSON.stringify(iss.warns));
  t('v93: avisa del grupo por encima de 20 fraccionadas',iss.warns.some(x=>/por encima de ~20 series fraccionadas en: Glúteos/.test(x)));
  const red=JSON.parse(JSON.stringify(plan));red.mesociclo.enfoque='Semana de volumen reducido';
  t('v93: en la semana de volumen reducido no avisa de lo bajo',!w.validatePlan(red).warns.some(x=>/por debajo de ~10 series/.test(x)));
  t('v93: con una sola sesión no se juzga la semana',!w.validatePlan({sesiones_ia:[dia('L')]}).warns.some(x=>/Volumen semanal/.test(x)));
  const i1={errors:[],warns:[]};w.validateExercise(ej('Curl de bíceps','Bíceps',1),0,i1);
  t('v93: avisa de un ejercicio con una sola serie',i1.warns.some(x=>/una sola serie/.test(x)));
  const i2={errors:[],warns:[]};w.validateExercise(ej('Movilidad de cadera','Cadera',1),0,i2);
  t('v93: la movilidad con una serie no avisa',!i2.warns.some(x=>/una sola serie/.test(x)));
  // déficit
  const t0=w.tdeePerfil();
  t('v93: gasto estimado del perfil (Mifflin × 1,55)',t0===Math.round((10*65+6.25*176-5*49+5)*1.55),String(t0));
  iss=w.validatePlan(Object.assign({},plan,{nutricion:{calorias_diarias:t0-700,proteina_g:130,agua_litros:2.5,menu_dia:[]}}));
  t('v93: avisa de un déficit de más de 500 kcal con objetivo de músculo',iss.warns.some(x=>/déficit de ~700 kcal\/día/.test(x)&&/Murphy y Koehler/.test(x)),JSON.stringify(iss.warns.filter(x=>/Calorías/.test(x))));
  iss=w.validatePlan(Object.assign({},plan,{nutricion:{calorias_diarias:t0-300,proteina_g:130,agua_litros:2.5,menu_dia:[]}}));
  t('v93: un déficit pequeño no avisa',!iss.warns.some(x=>/^Calorías:/.test(x)));
  w.S.profile.objetivos=['grasa'];
  iss=w.validatePlan(Object.assign({},plan,{nutricion:{calorias_diarias:t0-700,proteina_g:130,agua_litros:2.5,menu_dia:[]}}));
  t('v93: sin objetivo de músculo no avisa del déficit',!iss.warns.some(x=>/^Calorías:/.test(x)));
  w.S.profile.objetivos=['musculo','grasa'];
  // mensaje y tarjeta
  const p=w.buildPrompt('adapt');
  t('v93: el mensaje lleva las cifras del ACSM 2026',/al menos 2 series por ejercicio/.test(p)&&/~18-20 series semanales/.test(p)&&/sugiere terminar a 2-3 RIR/.test(p));
  t('v93: pide 10+ series en CADA grupo principal y corregir el reparto',/en CADA grupo principal/.test(p)&&/corrige el reparto antes que el total/.test(p));
  t('v93: proteína: manda el total, sin tope por toma',/lo que manda es el TOTAL diario/.test(p)&&/10\.1016\/j\.xcrm\.2023\.101324/.test(p)&&!/comprueba que el "menu_dia" que propones las cumple/.test(p));
  t('v93: déficit máximo con objetivo de músculo',/no me pongas un déficit de más de ~500 kcal\/día/.test(p)&&/10\.1111\/sms\.14075/.test(p));
  t('v93: recorrido completo por defecto; parciales no superiores',/por defecto, recorrido completo/.test(p)&&/10\.7717\/peerj\.18904/.test(p));
  t('v93: Refalo 2024 con su DOI',/10\.1080\/02640414\.2024\.2321021/.test(p));
  t('v93: la tarjeta de Ajustes recoge las fuentes nuevas',/Añadidas en la versión 93/.test(HTML)&&/Murphy y Koehler 2022/.test(HTML)&&/Trommelen et al\. 2023/.test(HTML));
  // tarjeta de volumen
  const k=w.keyDeCodigo('L',w.S.currentWeek);
  w.S.schedule[k]=[{type:'ai',title:'V',done:false,exercises:dia('L').ejercicios.concat(dia('X').ejercicios)}];
  w.tab('prog');w.renderVolume();
  t('v93: la tarjeta marca el grupo por encima de lo eficiente',/Glúteos[\s\S]*por encima de lo eficiente/.test(w.document.getElementById('vol-body').innerHTML));
  t('v93: cero llamadas a la API',HTML.indexOf('api.anthropic.com')<0);
}

/* ---------- 31. v93 · comportamiento observable (se ejecuta también contra la v92) ------------ */
{
  const w=boot(estadoVeterano());w.S.currentWeek=1;
  const ej=(n,m,series)=>({nombre:n,musculos:m,series,reps:'8-12',descanso_seg:90,peso:'16 kg por mancuerna (una en cada mano)',patron:'otro'});
  const dia=c=>({dia_codigo:c,titulo:c,ejercicios:[ej('Hip thrust','Glúteos, isquios',4),ej('Remo con mancuerna','Dorsal, bíceps',3),
    ej('Press de pecho en suelo','Pecho, tríceps',3),ej('Sentadilla goblet','Cuádriceps, glúteos',3)]});
  const iss=w.validatePlan({sesiones_ia:[dia('L'),dia('X')]});
  t('v93 comportamiento: un plan con pecho y cuádriceps a 6 series semanales recibe aviso',iss.warns.some(x=>/Pecho/.test(x)&&/10 series/.test(x)),JSON.stringify(iss.warns));
}

/* ============================================================================================ */
console.log('\n'+ok+' comprobaciones OK, '+bad+' fallos');
if(bad){console.log('\nFALLOS:');fails.forEach(f=>console.log(' ✕ '+f));process.exit(1);}

# PLAN VIDEO v2 — Código Confianza

## Hallazgos Clave del PDF de Bases

- **Pitch final = PDF sin videos** (solo capturas). El video NO va en el pitch.
- **El video sirve como "link al prototipo/MVP"** que piden en los entregables del Día 3 (lunes 9/11, 9am). Debe estar activo 30 días, acceso público.
- **Criterios de evaluación**: Viabilidad técnica (40%) > Creatividad (25%) > Comprensión del problema (20%) > Presentación (15%)
- **Implicación**: El video debe demostrar que esto FUNCIONA dentro de la app BCP real, no solo ser bonito.

---

## 1. Tipo de Video: "Cinematic Prototype Walkthrough"

**Por qué este formato gana en hackathons:**
- Muestra el prototipo funcionando (ataca el 40% de viabilidad)
- Una narrativa con datos reales demuestra comprensión del problema (20%)
- Producción profesional diferencia de otros equipos (15% presentación)
- El concepto mismo es creativo (25%)

**Referentes de estilo:**
- Videos de producto de Nubank/Revolut: pantallas reales del app con transiciones cinematográficas
- Apple Keynote demos: zoom suave al detalle, tipografía limpia, ritmo pausado
- NO es un pitch animado genérico con iconos planos

**Duración: 50-60 segundos** (lo suficiente para mostrar el flujo completo + datos)

---

## 2. Estructura Narrativa (alineada con criterios del hackathon)

### ACTO 1 — EL PROBLEMA (0-12s)
Ataca el criterio de "comprensión profunda del problema" (20%)

| Tiempo | Escena | Descripción | Cámara/Efecto |
|--------|--------|-------------|---------------|
| 0-4s | **GANCHO** | Dato: "Perú: 2do país del mundo en llamadas spam. 18 al día." Tipografía grande, fondo azul BCP. | Texto aparece con impacto, zoom out reveal |
| 4-8s | **DATO 2** | "23,213 denuncias por extorsión telefónica. Solo en octubre 2025." | Número crece con contador animado |
| 8-12s | **PREGUNTA** | Pantalla de celular — llamada entrante de número desconocido. Texto: "¿Es el banco... o un estafador?" | Celular entra desde abajo, ring animation. Zoom lento al celular |

### ACTO 2 — LA SOLUCIÓN: Flujo del Prototipo (12-44s)
Ataca viabilidad técnica (40%) y creatividad (25%)

| Tiempo | Escena | Descripción | Cámara/Efecto |
|--------|--------|-------------|---------------|
| 12-16s | **INTRO SOLUCIÓN** | "¿Y si el banco se identificara ante ti?" Logo BCP aparece. Texto: "Código Confianza" | Transición de la pantalla de llamada desconocida al azul BCP |
| 16-21s | **PASO 1: Push Notification** | BCP envía push: "BCP quiere contactarte sobre: Crédito preaprobado". Botones "Aceptar" / "Ahora no". Dedo toca "Aceptar". | Push baja desde arriba del celular. Zoom IN al push notification |
| 21-25s | **PASO 2: Llamada** | Llega llamada. Asesor: "Hola Rosa, soy Carlos del BCP. Tu Código Confianza es: 1-2-3-4" | Split screen: izq asesor con onda de voz, der celular en llamada. Los dígitos aparecen uno a uno grandes |
| 25-31s | **PASO 3: App BCP** | Rosa abre la app BCP Banca Móvil. Se ve el home screen REAL con los 6 iconos + el NUEVO 7mo icono "Código Confianza". Dedo toca el icono. | **ZOOM cinematográfico** al home de la app. Luego zoom INTO el icono nuevo que brilla sutilmente |
| 31-36s | **PASO 4: Ingreso de código** | Pantalla de ingreso estilo BCP (back arrow, X, 4 casillas). Rosa escribe 1-2-3-4. Cada dígito aparece con micro-bounce. | Zoom a las casillas mientras se llenan. Efecto de escritura uno a uno |
| 36-40s | **PASO 5: Verificado** | Check verde grande. "Llamada Verificada — BCP Oficial". Detalles: Asesor Carlos Mendoza, Motivo: Crédito preaprobado. | Green pulse desde el centro. Zoom out mostrando el celular completo con halo verde |
| 40-44s | **PASO 5b: Error** | Path alternativo rápido: código incorrecto → dígitos tiemblan → se borran → texto rojo "Debes ingresar tu clave". Botón X visible. | Rápido, 4 segundos. Shake animation. Sin botón de reintentar separado |

### ACTO 3 — EL VALOR (44-55s)
Cierra con fuerza

| Tiempo | Escena | Descripción | Cámara/Efecto |
|--------|--------|-------------|---------------|
| 44-48s | **REGLA** | "El código lo dice el banco. Tú lo verificas. Nunca compartes nada." | Tipografía grande sobre fondo blanco, cada frase aparece secuencial |
| 48-52s | **BENEFICIO** | "Sin datos. Sin riesgo. Solo confianza." + dato: "Google ya lo validó: Verified Calls en Android 17, 2026" | Tipografía elegante, referencia a Google como validación externa |
| 52-55s | **CIERRE** | Logo BCP + "Código Confianza" + "Hackathon Women in Tech 2026" | Logo assembla, fade a negro |

---

## 3. Diseño Visual — Fiel a BCP Banca Móvil

### Home Screen de la App (CRÍTICO)
El home screen debe ser una réplica visual del real:
- **Header**: Gradiente azul con ilustración de llama a la derecha
- **Saludo**: "¡Hola, Rosa!" en blanco
- **Saldo**: Tarjeta con saldo visible
- **Iconos circulares existentes** (2 filas de 3):
  1. Beneficios Qore
  2. Token Digital
  3. Bloquear tarjeta
  4. Yapear a celular
  5. Pagar con QR
  6. Pagar servicios
- **NUEVO 7mo icono**: "Código Confianza" — icono de escudo con check, borde naranja sutil para destacar como nuevo

### Pantalla de Código Confianza (dentro de la app)
- **Header azul BCP** con back arrow (←) y título "Código Confianza"
- **Botón X** arriba a la derecha para cerrar
- **Texto**: "Ingresa el código que te dio el asesor"
- **4 casillas** separadas, bordes azul BCP, fondo blanco
- **Teclado numérico** estilo BCP (no teclado del OS)
- **Sin botón "Verificar"** — verifica automáticamente al llenar los 4 dígitos (como Token Digital BCP)

### Estados
- **Correcto**: Casillas → verde, check animado, pantalla de confirmación
- **Incorrecto**: Casillas tiemblan (shake ~450ms), dígitos se borran, texto rojo "Debes ingresar tu clave", casillas vacías listas para reintentar
- **Salir**: Botón X cierra y vuelve al home

### Paleta
- Azul oscuro: #002A8D (headers, texto principal)
- Azul: #0063BD (botones, links)
- Naranja: #F37021 (acentos BCP, dígitos del código)
- Blanco: #FFFFFF (fondos)
- Verde éxito: #4CAF50 (verificado)
- Rojo error: #F44336 (código incorrecto)
- Gris fondo: #F5F5F5 (fondo exterior)

---

## 4. Técnicas de Producción Profesional

### Zoom Effects
- **Macro zoom**: De pantalla completa del dato → zoom out revelando que es la pantalla de un celular
- **Into-screen zoom**: Cámara entra DENTRO de la pantalla del celular al cambiar de escena
- **Detail zoom**: Acercamiento a las casillas del código mientras se llenan
- **Pull-back reveal**: Al verificar, zoom out mostrando el celular completo con glow verde

### Transiciones (no cortes secos)
- **Object morph**: El push notification se transforma en la pantalla de la app
- **Depth transition**: Escena actual se aleja (blur + scale down) mientras la nueva se acerca
- **Swipe natural**: Simular el dedo deslizando entre pantallas de la app
- **Scale through**: Zoom continuo que atraviesa una pantalla para llegar a la siguiente

### Detalles Profesionales
- **Sombra realista** del celular (no plana, con profundidad)
- **Reflejo sutil** en la pantalla del celular
- **Micro-animaciones**: cursor parpadeando, indicador de señal, hora actualizándose
- **Parallax**: Elementos del fondo se mueven a velocidad diferente al celular
- **Ease curves correctas**: expo.out para entradas, power3.in para salidas

---

## 5. Voz con ElevenLabs

### Workflow
1. **Grabas ~1-2 minutos** de tu voz leyendo un texto variado (con diferentes tonos y pausas)
2. **Subes a ElevenLabs** → "Add Voice" → "Instant Voice Clone" 
3. **Generas la narración** segmento por segmento con tu voz clonada
4. **Exportas como WAV/MP3** cada segmento
5. **Se integra al video** como audio track en HyperFrames

### Script de Narración (borrador)
```
[0-4s] "Dieciocho llamadas spam al día. Perú, segundo en el mundo."

[4-8s] "Más de veintitrés mil denuncias por extorsión. Solo en octubre."

[8-12s] "Cuando suena tu teléfono... ¿cómo sabes si es tu banco?"

[12-16s] "¿Y si el banco se identificara ante ti?"

[16-21s] "Con Código Confianza, el BCP te avisa antes de llamarte."

[21-25s] "El asesor te da un código de cuatro dígitos."

[25-31s] "Abres tu app BCP, y verificas."

[31-36s] "Ingresas el código..."

[36-40s] "...y sabes al instante si es real."

[40-44s] "Si el código no coincide, la app te protege."

[44-52s] "Sin datos. Sin riesgo. Solo confianza."

[52-55s] "Código Confianza. Del BCP para ti."
```

### Tono de voz
- Profesional pero cercano (no robótico, no demasiado casual)
- Pausado en los datos (dejar que el número impacte)
- Seguro y cálido en la solución
- Ritmo: dato → pausa → dato → pausa → solución → flujo natural

---

## 6. Estructura Técnica HyperFrames

```
codigo-confianza/
├── index.html                         (root: ~55s, 1920x1080, 30fps)
├── SPEC.md                            (actualizado)
├── PLAN-VIDEO-V2.md                   (este archivo)
├── compositions/
│   ├── 01-gancho-dato.html            (0-4s: dato spam)
│   ├── 02-gancho-dato2.html           (4-8s: dato extorsión)
│   ├── 03-gancho-pregunta.html        (8-12s: ¿es el banco?)
│   ├── 04-intro-solucion.html         (12-16s: Código Confianza reveal)
│   ├── 05-push-permiso.html           (16-21s: push notification + aceptar)
│   ├── 06-llamada-codigo.html         (21-25s: asesor dice código)
│   ├── 07-app-home.html               (25-31s: home BCP + icono nuevo + zoom)
│   ├── 08-ingreso-codigo.html         (31-36s: pantalla código + escritura)
│   ├── 09-verificado.html             (36-40s: verde, verificado)
│   ├── 10-error.html                  (40-44s: shake, borrar, reintentar)
│   ├── 11-valor.html                  (44-48s: regla de oro)
│   ├── 12-beneficio.html              (48-52s: sin datos sin riesgo)
│   └── 13-cierre.html                 (52-55s: logo + cierre)
└── assets/
    └── audio/                          (segmentos de voz ElevenLabs)
```

---

## 7. Diferencias Principales vs Video v1

| Aspecto | Video v1 (rechazado) | Video v2 (nuevo) |
|---------|---------------------|-------------------|
| Duración | 35s (muy corto) | 55s (completo) |
| Hook | Solo "55%" | Dos datos + pregunta emocional |
| Código entry | En push notification overlay | DENTRO de la app BCP (7mo icono) |
| App BCP | No aparece | Home screen fiel al real |
| Zoom | No hay | Zoom in/out cinematográfico |
| Error | Botón "Colgar y reportar" | Shake + clear (como BCP real) |
| Transiciones | Corte + blur | Object morph + depth transition |
| Voz | No hay | Narración ElevenLabs con tu voz |
| Producción | Genérica | Detalles: sombras, micro-animations |

---

## 8. Orden de Trabajo

1. ✏️ **Aprobar este plan** (tú)
2. 🎙️ **Grabar muestra de voz** para ElevenLabs (tú, ~2 min)
3. 🔨 **Reescribir SPEC.md** con la nueva estructura
4. 🔨 **Construir las 13 composiciones** de cero
5. 🔨 **Construir el home screen BCP** fiel al real (escena más importante)
6. ✅ **Check + snapshot** de cada escena
7. 🎙️ **Generar narración** en ElevenLabs con tu voz
8. 🔊 **Integrar audio** al timeline
9. 👀 **Preview + revisión** juntos
10. 🎬 **Render final** a MP4

---

## 9. Lo Que Necesito de Ti

- [ ] Confirmar que apruebas este plan (o qué cambiar)
- [ ] ¿Están en el **Reto 3** (Reinventando la experiencia bancaria digital)?
- [ ] Grabar muestra de voz (~2 min leyendo texto variado) para ElevenLabs
- [ ] ¿Tienes cuenta de ElevenLabs o la creo contigo?

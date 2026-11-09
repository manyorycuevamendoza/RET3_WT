GOAL:    The viewer understands how Código Confianza works in 7 steps and feels it solves the phone trust crisis in Peru
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps
TIME:    35s × 30 = 1050 frames
LOOK:    ground #F5F5F5 (warm grey), ink #002A8D (BCP azul oscuro), accent #F37021 (BCP naranja) on code digits and CTA only;
         display Inter 900 72px -0.03em, body Inter 400 36px 0;
         the medium is a flat phone mockup (white body #FFFFFF, rounded 40px, shadow 0 8 32 rgba(0,0,0,0.12)) centred on the ground,
         with BCP-branded screens inside (header #002A8D, buttons #0063BD pill, success #4CAF50, error #F44336);
         light: flat, no directional shadow; depth: card shadow only; grain 0%; vignette 0%
OBJECTS: phone (white rounded rect with notch, ~540px wide × 960px tall at centre),
         push notification (white card with BCP logo icon, rounded 16px, shadow),
         code input (4 separate rounded boxes 64×72px, 12px gap, border #002A8D),
         call screen (green accept / red decline circles),
         advisor avatar (blue circle with headset icon),
         BCP logo (blue arrow up + orange arrow down, text "BCP")
MOTION:  enter expo.out 0.5s, move power2.inOut 0.4s, exit power3.in 0.3s;
         stagger words 0.07s, digits 0.1s;
         phone shake (error): x ±12px, 0.45s, 5 oscillations, power1.inOut
SHOTS:
  0-120   (0-4s)    HOOK: "55%" scales from 0 to fill 60% of frame width, Inter 900, white on #002A8D; at 2s morphs to phone on counter
  120-240 (4-8s)    PUSH PERMISO: push notification slides down from top of phone; "BCP quiere contactarte" + 3 option buttons animate in staggered
  240-360 (8-12s)   LLAMADA: phone screen transitions to incoming call; unknown number pulses; green/red buttons
  360-510 (12-17s)  CÓDIGO VOZ: split — left: advisor circle with speech bubble "1-2-3-4" appearing digit by digit; right: Rosa's phone with call active
  510-630 (17-21s)  PUSH CÓDIGO: second push slides over call screen; 4 empty code boxes appear; cursor blinks in first box
  630-750 (21-25s)  INGRESO: digits 1-2-3-4 type in one by one with ticks; button "Verificar" pulses blue
  750-870 (25-29s)  VERIFICADO: boxes flash green, checkmark scales up with pop; "Llamada verificada" + advisor name + motivo fade in
  870-960 (29-32s)  ERROR: quick contrast — boxes shake, digits clear, red text "Código incorrecto"; then red alert screen
  960-1050 (32-35s) CIERRE: "El código lo dice el banco. Tú lo escribes." in Inter 900; BCP logo assembles; "Código Confianza" wipes in
BANNED:  dark void, glow, particles, purple/blue gradients, cream-serif-mono, everything fading and sliding up,
         three cards in a row, docked logo, corner brackets, floating cards, breathing/pulsing loops,
         orange for error states (orange = BCP brand)
QA:
  frame 0: "55%" visible, not black
  frame 150: phone on screen with push notification visible
  frame 300: call screen with unknown number readable
  frame 450: advisor + code "1234" visible
  frame 600: 4 code input boxes visible
  frame 720: digits filled, verify button visible
  frame 810: green checkmark visible
  frame 900: shake or red alert visible
  frame 1020: "Código Confianza" and BCP logo visible

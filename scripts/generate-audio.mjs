// Genera el audio de Clara para Código Confianza usando ElevenLabs TTS (con timestamps por carácter).
// Uso: node --env-file=.env scripts/generate-audio.mjs
// Requiere API_KEY_LAB en .env. El .mp3 resultante SÍ se commitea (es un asset estático, no un secreto).
// Imprime los tiempos exactos (ms) en que se dice cada dígito, para sincronizar revealCode() en app.js.

const VOICE_ID = '5uQV9sIbpkHKYD2eUeYp';
const TEXT = '¡Buenas tardes! Te saluda Clara, la asistente virtual oficial del BCP. Nos comunicamos contigo porque tienes un crédito preaprobado esperando por ti. Para tu seguridad, tu código de validación de confianza es el cuatro, ocho, siete, cero. Repito: cuatro, ocho, siete, cero.';
const OUTPUT_PATH = 'codigo-confianza-pwa/assets/audio/clara-codigo-confianza.mp3';

const apiKey = process.env.API_KEY_LAB;
if (!apiKey) {
  console.error('Falta API_KEY_LAB. Ejecuta con: node --env-file=.env scripts/generate-audio.mjs');
  process.exit(1);
}

const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps`, {
  method: 'POST',
  headers: {
    'xi-api-key': apiKey,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    text: TEXT,
    model_id: 'eleven_multilingual_v2',
    voice_settings: { stability: 0.5, similarity_boost: 0.75 },
  }),
});

if (!response.ok) {
  const errorBody = await response.text();
  console.error(`ElevenLabs API error ${response.status}: ${errorBody}`);
  process.exit(1);
}

const data = await response.json();
const buffer = Buffer.from(data.audio_base64, 'base64');

const fs = await import('node:fs/promises');
await fs.writeFile(OUTPUT_PATH, buffer);
console.log(`Audio guardado en ${OUTPUT_PATH} (${buffer.length} bytes)`);

const { characters, character_start_times_seconds: starts } = data.alignment;
const joined = characters.join('');

function findFrom(word, fromIndex) {
  const idx = joined.indexOf(word, fromIndex);
  if (idx === -1) throw new Error(`No se encontró "${word}" desde el índice ${fromIndex}`);
  return idx;
}

const anchorIdx = findFrom('es el ', 0);
const cuatroIdx = findFrom('cuatro', anchorIdx);
const ochoIdx = findFrom('ocho', cuatroIdx);
const sieteIdx = findFrom('siete', ochoIdx);
const ceroIdx = findFrom('cero', sieteIdx);

const toMs = (idx) => Math.round(starts[idx] * 1000);
const totalDurationMs = Math.round(starts[starts.length - 1] * 1000) + 300;

console.log('\nTiempos de los dígitos (ms desde el inicio del audio):');
console.log(`  4 (cuatro): ${toMs(cuatroIdx)}`);
console.log(`  8 (ocho):   ${toMs(ochoIdx)}`);
console.log(`  7 (siete):  ${toMs(sieteIdx)}`);
console.log(`  0 (cero):   ${toMs(ceroIdx)}`);
console.log(`Duración total aproximada: ${totalDurationMs} ms`);

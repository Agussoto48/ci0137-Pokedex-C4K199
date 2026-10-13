// =============================================================
//  ficha.js  —  UNA sola ficha para todos los Pokémon.
//  Lee el id de la dirección (detalle.html?id=7) y arma la página.
//  Lo escribimos juntos en clase. Reemplaza los detalle-pokemon-*.html.
// =============================================================

// De datos.js:
//   buscarPorId   -> encuentra un Pokémon por su id
//   numeroPokedex -> "#007";   totalStats -> suma de las estadísticas
import { pokedex, buscarPorId, numeroPokedex, totalStats } from './datos.js';

const ficha = document.querySelector('#ficha-pokemon');          // el <article> vacío
const carrusel = document.querySelector('#carrusel .carrusel');  // el <ul> del carrusel

// Prueba de que el módulo cargó bien (se borra cuando empecemos):
console.log('ficha.js cargó.');


// -------------------------------------------------------------
// PASO 1 — leer el id de la dirección y buscar el Pokémon
//   Pistas:
//     - new URLSearchParams(location.search)  -> leer lo que va tras el "?"
//     - .get('id')                            -> saca el valor (es texto)
//     - Number(...)                           -> pasarlo a número
//     - buscarPorId(id)                       -> encontrar el Pokémon
//     - if (!pokemon) { ... }                 -> si no existe, mostrar un mensaje
//       si existe: document.title = `Pokédex - ${pokemon.nombre}`
//                  y llamar a dibujarFicha(pokemon) y dibujarCarrusel(pokemon)
// -------------------------------------------------------------


// -------------------------------------------------------------
// PASO 2 — dibujarFicha(p)
//   Arma TODO el contenido de la ficha con innerHTML (es un bloque grande).
//   Es seguro porque los datos son NUESTROS (de datos.js), no de un usuario.
//   Pistas:
//     - ficha.innerHTML = `...`   con template literal (comillas `)
//     - meter los datos con ${p.nombre}, ${numeroPokedex(p.id)}, etc.
//     - la imagen grande: ../assets/${p.slug}-grande.png  (las páginas viven en html/)
//     - para los tipos / habilidades / estadísticas: p.tipos.map(...),
//       p.habilidades.map(...), Object.values(p.stats).map(...)
//     - usar las MISMAS clases del HTML original (ficha-pokemon__resumen,
//       stats-table, cadena-evolutiva, tipo--agua, ...) para que el CSS funcione
//     - el total con totalStats(p)
// -------------------------------------------------------------


// -------------------------------------------------------------
// PASO 3 — dibujarCarrusel(p)
//   Muestra 5 "pokébolas": dos antes, el actual y dos después.
//   Es CIRCULAR: si estás en el primero, el anterior es el último.
//   Pistas:
//     - const n = pokedex.length
//     - const i = pokedex.findIndex((x) => x.id === p.id)  -> posición actual
//     - carrusel.replaceChildren()  -> vaciar antes de dibujar
//     - for (let k = -2; k <= 2; k++) { const j = (i + k + n) % n; ... }
//           el % (resto) hace que el índice "dé la vuelta"
//     - k === 0 es el activo; los demás son enlaces a detalle.html?id=...
//     - li.dataset.pos = k   -> lo usa el CSS para colocar el arco
// -------------------------------------------------------------
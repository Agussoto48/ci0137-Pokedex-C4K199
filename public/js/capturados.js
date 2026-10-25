// =============================================================
//  capturados.js  —  Qué Pokémon capturó el usuario.
//  Se guarda en localStorage para que sobreviva a la recarga.
// =============================================================

import { pokedex } from './datos.js';

const LLAVE = 'capturados';

// localStorage solo guarda texto: se guarda un arreglo de ids con JSON.
// Si todavía no hay nada guardado, se parte de los capturado: true de datos.js
function leer() {
  const guardado = localStorage.getItem(LLAVE);
  if (guardado) return JSON.parse(guardado);
  return pokedex.filter((p) => p.capturado).map((p) => p.id);
}

let ids = leer();

export function estaCapturado(id) {
  return ids.includes(id);
}

// Lo agrega si no estaba, lo quita si estaba. Devuelve el estado nuevo.
export function alternarCaptura(id) {
  ids = estaCapturado(id) ? ids.filter((x) => x !== id) : [...ids, id];
  localStorage.setItem(LLAVE, JSON.stringify(ids));
  return estaCapturado(id);
}

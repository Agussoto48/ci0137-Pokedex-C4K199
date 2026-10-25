// =============================================================
//  perfil-entrenador.js  —  Muestra en el perfil los Pokémon
//  capturados desde la lista (guardados en localStorage).
// =============================================================

import { buscarPorId, numeroPokedex } from './datos.js';
import { listaCapturados } from './capturados.js';

const detalle = document.querySelector('.seccion--capturados .seccion__detalle');
const miniSprites = document.querySelector('.seccion--capturados .mini-sprites');
const grilla = document.querySelector('#modal-capturados .capturados');

// Ids -> Pokémon completos, ordenados por número
const capturados = listaCapturados()
  .map(buscarPorId)
  .filter(Boolean)
  .sort((a, b) => a.id - b.id);

// Imagen del sprite de un Pokémon
function crearSprite(pokemon, tamano) {
  const img = document.createElement('img');
  img.src = `assets/${pokemon.slug}.png`;
  img.alt = '';
  img.width = tamano;
  img.height = tamano;
  return img;
}

// Tarjeta de la sección: texto y hasta 3 mini-sprites (+N si hay más)
function pintarResumen() {
  detalle.textContent = `${capturados.length} Pokémon en tu colección`;

  miniSprites.replaceChildren();
  for (const pokemon of capturados.slice(0, 3)) {
    const li = document.createElement('li');
    li.append(crearSprite(pokemon, 34));
    miniSprites.append(li);
  }

  if (capturados.length > 3) {
    const mas = document.createElement('li');
    mas.className = 'mini-sprites__mas';
    mas.textContent = `+${capturados.length - 3}`;
    miniSprites.append(mas);
  }
}

// Una tarjeta del diálogo: casilla de selección, estrella y el cuerpo (label)
function crearCaptura(pokemon) {
  const li = document.createElement('li');
  li.className = 'captura';

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.className = 'captura__check';
  check.id = `captura-${pokemon.id}`;
  check.setAttribute('aria-label', `Seleccionar a ${pokemon.nombre}`);

  const fav = document.createElement('input');
  fav.type = 'checkbox';
  fav.className = 'captura__fav';
  fav.setAttribute('aria-label', `Marcar a ${pokemon.nombre} como favorito`);

  const cuerpo = document.createElement('label');
  cuerpo.className = 'captura__cuerpo';
  cuerpo.htmlFor = check.id;

  const zona = document.createElement('span');
  zona.className = 'sprite-zona';
  const numero = document.createElement('span');
  numero.className = 'numero';
  numero.textContent = numeroPokedex(pokemon.id);
  zona.append(numero, crearSprite(pokemon, 96));

  const nombre = document.createElement('span');
  nombre.className = 'captura__nombre';
  nombre.textContent = pokemon.nombre;

  cuerpo.append(zona, nombre);
  li.append(check, fav, cuerpo);
  return li;
}

// Grilla del diálogo "Pokémon capturados"
function pintarGrilla() {
  grilla.replaceChildren();

  if (capturados.length === 0) {
    const vacio = document.createElement('li');
    vacio.textContent = 'Todavía no capturaste ninguno. Andá a la Pokédex y tocá "Capturar".';
    grilla.append(vacio);
    return;
  }

  for (const pokemon of capturados) {
    grilla.append(crearCaptura(pokemon));
  }
}

pintarResumen();
pintarGrilla();

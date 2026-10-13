// =============================================================
//  lista.js  —  Genera la lista de la Pokédex y el buscador.
//  Lo vamos a escribir juntos en clase, siguiendo estas pistas.
//  Los datos ya están en datos.js (no se escriben aquí).
// =============================================================

// Traemos lo que necesitamos de datos.js:
//   pokedex       -> la lista de Pokémon
//   numeroPokedex -> convierte 7 en "#007"
import { pokedex, numeroPokedex } from './datos.js';

// Agarramos elementos del HTML (DOM) con querySelector (como en CSS):
const lista = document.querySelector('.pokemon-list');   // el <ul> vacío
const form = document.querySelector('#buscador form');    // el formulario
const contador = document.querySelector('.contador');     // "10 Pokémon" (si existe)

// PASO 1 — crea el <li> de un Pokémon
function crearTarjeta(pokemon) {
  const li = document.createElement('li');
  li.className = 'pokemon-card';

  const a = document.createElement('a');
  a.href = `detalle.html?id=${pokemon.id}`;

  const numero = document.createElement('span');
  numero.className = 'pokemon-card__number';
  numero.textContent = numeroPokedex(pokemon.id);

  const img = document.createElement('img');
  img.src = `../assets/${pokemon.slug}.png`;
  img.alt = pokemon.nombre;
  img.width = 70;

  const nombre = document.createElement('span');
  nombre.className = 'pokemon-card__name';
  nombre.textContent = pokemon.nombre;

  a.append(numero, img, nombre);
  li.append(a);
  return li;
}

// PASO 2 — pinta las tarjetas de la lista que se le pase
function dibujar(listaPokemon) {
  lista.replaceChildren();

  for (const pokemon of listaPokemon) {
    lista.append(crearTarjeta(pokemon));
  }

  if (listaPokemon.length === 0) {
    const vacio = document.createElement('li');
    vacio.textContent = 'No se encontró ningún Pokémon.';
    lista.append(vacio);
  }

  if (contador) contador.textContent = `${listaPokemon.length} Pokémon`;
}


// -------------------------------------------------------------
// PASO 3 — filtrar()  +  eventos del formulario
//   Lee los criterios del formulario y devuelve la lista filtrada.
//   Pistas:
//     - new FormData(form)              -> leer todos los campos
//     - datos.get('nombre'), datos.get('tipo'), etc.
//     - pokedex.filter((p) => { ... })  -> dejar solo los que cumplen
//     - .sort(...)                      -> ordenar segun "Ordenar por"
//     - quitar tildes antes de comparar (p. ej. una función normalizar)
//
//   Y conectar el formulario con el código (EVENTOS):
//     - form.addEventListener('submit', (e) => { e.preventDefault(); dibujar(filtrar()); })
//           preventDefault evita que la página se recargue
//     - form.addEventListener('input', () => dibujar(filtrar()))  -> filtrar en vivo
// -------------------------------------------------------------


// Primer dibujado al cargar la página
dibujar(pokedex);

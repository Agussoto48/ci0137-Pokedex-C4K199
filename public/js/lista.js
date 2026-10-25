// =============================================================
//  lista.js  —  Genera la lista de la Pokédex y el buscador.
//  Lo vamos a escribir juntos en clase, siguiendo estas pistas.
//  Los datos ya están en datos.js (no se escriben aquí).
// =============================================================

// Traemos lo que necesitamos de datos.js:
//   pokedex       -> la lista de Pokémon
//   numeroPokedex -> convierte 7 en "#007"
import { pokedex, numeroPokedex } from './datos.js';
import { estaCapturado, alternarCaptura } from './capturados.js';

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
  img.src = `assets/${pokemon.slug}.png`;
  img.alt = pokemon.nombre;
  img.width = 70;

  const nombre = document.createElement('span');
  nombre.className = 'pokemon-card__name';
  nombre.textContent = pokemon.nombre;

  a.append(numero, img, nombre);

  // Va fuera del <a>: un botón dentro de un enlace no es válido
  const boton = document.createElement('button');
  boton.type = 'button';
  pintarCaptura(li, boton, estaCapturado(pokemon.id));

  boton.addEventListener('click', () => {
    pintarCaptura(li, boton, alternarCaptura(pokemon.id));
    if (form.elements.capturados.checked) dibujar(filtrar());
  });

  li.append(a, boton);
  return li;
}

function pintarCaptura(li, boton, capturado) {
  li.classList.toggle('pokemon-card--capturado', capturado);
  boton.className = `boton boton--chico ${capturado ? 'boton--rojo' : 'boton--borde-rojo'}`;
  boton.setAttribute('aria-pressed', capturado);
  boton.textContent = capturado ? '✓ Capturado' : 'Capturar';
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


// PASO 3 — filtra y ordena según el formulario

// Minúsculas y sin tildes: "Eléctrico" -> "electrico"
function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const ordenes = {
  'numero-asc': (a, b) => a.id - b.id,
  'numero-desc': (a, b) => b.id - a.id,
  'nombre-asc': (a, b) => a.nombre.localeCompare(b.nombre),
  'nombre-desc': (a, b) => b.nombre.localeCompare(a.nombre),
  'tamano-asc': (a, b) => a.tamano - b.tamano,
  'tamano-desc': (a, b) => b.tamano - a.tamano,
};

function filtrar() {
  const datos = new FormData(form);
  const nombre = normalizar(datos.get('nombre') ?? '');
  const tipo = datos.get('tipo') ?? '';
  const soloCapturados = datos.get('capturados') === 'si';
  const etapa = datos.get('etapa') ?? 'todas';
  const orden = ordenes[datos.get('orden')] ?? ordenes['numero-asc'];

  return pokedex
    .filter((p) => normalizar(p.nombre).includes(nombre))
    .filter((p) => !tipo || p.tipos.some((t) => normalizar(t) === tipo))
    .filter((p) => !soloCapturados || estaCapturado(p.id))
    .filter((p) => etapa === 'todas' || p.etapa === etapa)
    .sort(orden);
}

// submit: evita que la página se recargue; input: filtra en vivo
form.addEventListener('submit', (e) => {
  e.preventDefault();
  dibujar(filtrar());
});
form.addEventListener('input', () => dibujar(filtrar()));

// Primer dibujado al cargar la página
dibujar(filtrar());

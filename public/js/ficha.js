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
const contador = document.querySelector('.contador');

// Nombres para mostrar de cada estadística
const nombresStats = {
  hp: 'PS',
  ataque: 'Ataque',
  defensa: 'Defensa',
  ataqueEsp: 'Ataque especial',
  defensaEsp: 'Defensa especial',
  velocidad: 'Velocidad',
};

// "eléctrico" -> "Eléctrico"
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// "eléctrico" -> "electrico" (para el nombre de la clase CSS)
function sinTildes(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// "#007 Squirtle"
function etiqueta(p) {
  return `${numeroPokedex(p.id)} ${p.nombre}`;
}


// PASO 2 — arma el contenido de la ficha
// innerHTML es seguro aquí: los datos son nuestros (datos.js), no del usuario
function dibujarFicha(p) {
  const tipos = p.tipos.map((t) => `
    <li class="tipo tipo--${sinTildes(t)}">${capitalizar(t)}</li>`).join('');

  const habilidades = p.habilidades.map((h) => `
    <li>
      <strong>${h.nombre}${h.oculta ? ' (oculta)' : ''}:</strong>
      ${h.descripcion}
    </li>`).join('');

  const stats = Object.entries(p.stats).map(([clave, valor]) => `
    <tr>
      <td>${nombresStats[clave]}</td>
      <td>${valor}</td>
    </tr>`).join('');

  const mayorStat = Math.max(...Object.values(p.stats));
  const destacadas = Object.entries(p.stats)
    .filter(([, valor]) => valor === mayorStat)
    .map(([clave]) => nombresStats[clave])
    .join(', ');

  // El actual va resaltado; los que no están en la Pokédex (p. ej. Pichu) van sin enlace
  const evoluciones = p.evolucion.map((nombre) => {
    const evo = pokedex.find((x) => x.nombre === nombre);
    if (evo?.id === p.id) return `<li><span aria-current="page">${nombre}</span></li>`;
    if (evo) return `<li><a href="detalle.html?id=${evo.id}">${nombre}</a></li>`;
    return `<li><span>${nombre}</span></li>`;
  }).join('');

  ficha.innerHTML = `
    <h1>
      <span class="ficha-pokemon__numero">${numeroPokedex(p.id)}</span>
      ${p.nombre}
    </h1>
    <nav aria-label="Secciones de la ficha">
      <ul>
        <li><a href="#detalles">Detalles</a></li>
        <li><a href="#habilidades">Habilidades</a></li>
        <li><a href="#estadisticas">Estadísticas</a></li>
        <li><a href="#mas-informacion">Más información</a></li>
      </ul>
    </nav>
    <p>${p.descripcion}</p>

    <div class="ficha-pokemon__resumen">
      <figure class="ficha-pokemon__imagen">
        <img src="assets/${p.slug}-grande.png" alt="${p.nombre}" width="300">
      </figure>

      <section id="detalles">
        <h2>Detalles</h2>
        <dl class="ficha-pokemon__datos">
          <dt>Categoría</dt><dd>${p.genus}</dd>
          <dt>Peso</dt><dd>${p.peso.toFixed(1)} kg</dd>
          <dt>Tamaño</dt><dd>${p.tamano.toFixed(1)} m</dd>
          <dt>Tipo</dt><dd><ul class="tipos">${tipos}</ul></dd>
        </dl>

        <h3>Cadena evolutiva</h3>
        <ol class="cadena-evolutiva">${evoluciones}</ol>
      </section>
    </div>

    <section id="habilidades">
      <h2>Habilidades</h2>
      <ul>${habilidades}</ul>
    </section>

    <section id="estadisticas">
      <h2>Estadísticas</h2>
      <table class="stats-table">
        <thead>
          <tr><th>Estadística</th><th>Valor</th></tr>
        </thead>
        <tbody>${stats}</tbody>
        <tfoot>
          <tr class="stats-table__total"><th>Total</th><td>${totalStats(p)}</td></tr>
        </tfoot>
      </table>
    </section>

    <section id="mas-informacion">
      <h2>Más información</h2>
      <h3>¿Cómo se leen las estadísticas?</h3>
      <p>Estos valores son las estadísticas base de la especie: permiten comparar
        sus características con las de otros Pokémon. Los PS son los Puntos de
        Salud; el Ataque y la Defensa corresponden a movimientos físicos, y el
        Ataque especial y la Defensa especial a movimientos especiales.
        La Velocidad influye en el orden de los turnos.</p>
      <p>En ${p.nombre}, el valor base más alto es ${mayorStat} y corresponde a:
        ${destacadas}. El total de la tabla suma las seis estadísticas;
        no representa el nivel del Pokémon ni garantiza ganar un combate.</p>

      <h3>¿Qué es una habilidad oculta?</h3>
      <p>Es una habilidad alternativa que se obtiene por métodos especiales.
        No se suma a la habilidad habitual: un Pokémon tiene una habilidad
        activa a la vez. En esta ficha las identificamos con la palabra
        «oculta» junto al nombre.</p>

      <h3>Seguir explorando</h3>
      <p><a href="https://pokemondb.net/pokedex/${p.slug}" target="_blank" rel="noopener noreferrer">Consultar más información de ${p.nombre} en Pokémon Database</a>
        (se abre en una pestaña nueva).</p>
    </section>
  `;
}


// PASO 3 — carrusel circular: dos antes, el actual y dos después
function dibujarCarrusel(p) {
  const n = pokedex.length;
  const i = pokedex.findIndex((x) => x.id === p.id);
  carrusel.replaceChildren();

  for (let k = -2; k <= 2; k++) {
    const vecino = pokedex[(i + k + n) % n];   // % hace que el índice dé la vuelta
    const li = document.createElement('li');
    li.dataset.pos = k;

    if (k === 0) {
      const actual = document.createElement('span');
      actual.setAttribute('aria-current', 'page');
      actual.textContent = etiqueta(vecino);
      li.append(actual);
    } else {
      const a = document.createElement('a');
      a.href = `detalle.html?id=${vecino.id}`;
      a.textContent = etiqueta(vecino);
      li.append(a);
    }

    carrusel.append(li);
  }
}


// PASO 1 — leer el id de la dirección y buscar el Pokémon
const id = Number(new URLSearchParams(location.search).get('id'));
const pokemon = buscarPorId(id);

if (!pokemon) {
  ficha.innerHTML = `
    <h1>Pokémon no encontrado</h1>
    <p>No hay ningún Pokémon con ese número. <a href="index.html">Volver a la lista</a>.</p>
  `;
} else {
  if (contador) contador.textContent = `${pokedex.length} Pokémon`;
  document.title = `Pokédex - ${pokemon.nombre}`;
  dibujarFicha(pokemon);
  dibujarCarrusel(pokemon);
}

// =============================================================
//  datos.js  —  La Pokédex como datos, no como HTML quemado.
//  Un solo lugar con la información; las páginas la leen de aquí.
//  Para cambiar, agregar o quitar un Pokémon, se edita este arreglo.
// =============================================================

export const pokedex = [
  {
    id: 1, nombre: 'Bulbasaur', slug: 'bulbasaur',
    tipos: ['planta', 'veneno'],
    peso: 6.9, tamano: 0.7,
    stats: { hp: 45, ataque: 49, defensa: 49, ataqueEsp: 65, defensaEsp: 65, velocidad: 45 },
    habilidades: [
      { nombre: 'Espesura', oculta: false, descripcion: 'Potencia sus movimientos de tipo Planta cuando le quedan pocos PS.' },
      { nombre: 'Clorofila', oculta: true, descripcion: 'Sube su Velocidad cuando hace sol.' },
    ],
    evolucion: ['Bulbasaur', 'Ivysaur', 'Venusaur'],
    etapa: 'inicial',
    capturado: true,
    genus: 'Pokémon Semilla',
    descripcion: 'Bulbasaur carga una semilla en el lomo que crece junto con él.',
  },
  {
    id: 2, nombre: 'Ivysaur', slug: 'ivysaur',
    tipos: ['planta', 'veneno'],
    peso: 13, tamano: 1,
    stats: { hp: 60, ataque: 62, defensa: 63, ataqueEsp: 80, defensaEsp: 80, velocidad: 60 },
    habilidades: [
      { nombre: 'Espesura', oculta: false, descripcion: 'Potencia sus movimientos de tipo Planta cuando le quedan pocos PS.' },
      { nombre: 'Clorofila', oculta: true, descripcion: 'Sube su Velocidad cuando hace sol.' },
    ],
    evolucion: ['Bulbasaur', 'Ivysaur', 'Venusaur'],
    etapa: 'media',
    capturado: false,
    genus: 'Pokémon Semilla',
    descripcion: 'El bulbo de su espalda ya empezó a abrirse en una flor.',
  },
  {
    id: 3, nombre: 'Venusaur', slug: 'venusaur',
    tipos: ['planta', 'veneno'],
    peso: 100, tamano: 2,
    stats: { hp: 80, ataque: 82, defensa: 83, ataqueEsp: 100, defensaEsp: 100, velocidad: 80 },
    habilidades: [
      { nombre: 'Espesura', oculta: false, descripcion: 'Potencia sus movimientos de tipo Planta cuando le quedan pocos PS.' },
      { nombre: 'Clorofila', oculta: true, descripcion: 'Sube su Velocidad cuando hace sol.' },
    ],
    evolucion: ['Bulbasaur', 'Ivysaur', 'Venusaur'],
    etapa: 'final',
    capturado: false,
    genus: 'Pokémon Semilla',
    descripcion: 'La flor de su espalda libera un aroma que calma a quienes la huelen.',
  },
  {
    id: 4, nombre: 'Charmander', slug: 'charmander',
    tipos: ['fuego'],
    peso: 8.5, tamano: 0.6,
    stats: { hp: 39, ataque: 52, defensa: 43, ataqueEsp: 60, defensaEsp: 50, velocidad: 65 },
    habilidades: [
      { nombre: 'Mar Llamas', oculta: false, descripcion: 'Potencia sus movimientos de tipo Fuego cuando le quedan pocos PS.' },
      { nombre: 'Poder Solar', oculta: true, descripcion: 'Si hace sol, sube su Ataque Especial, pero pierde PS en cada turno.' },
    ],
    evolucion: ['Charmander', 'Charmeleon', 'Charizard'],
    etapa: 'inicial',
    capturado: true,
    genus: 'Pokémon Lagartija',
    descripcion: 'La llama de su cola indica su estado de ánimo y su salud.',
  },
  {
    id: 5, nombre: 'Charmeleon', slug: 'charmeleon',
    tipos: ['fuego'],
    peso: 19, tamano: 1.1,
    stats: { hp: 58, ataque: 64, defensa: 58, ataqueEsp: 80, defensaEsp: 65, velocidad: 80 },
    habilidades: [
      { nombre: 'Mar Llamas', oculta: false, descripcion: 'Potencia sus movimientos de tipo Fuego cuando le quedan pocos PS.' },
      { nombre: 'Poder Solar', oculta: true, descripcion: 'Si hace sol, sube su Ataque Especial, pero pierde PS en cada turno.' },
    ],
    evolucion: ['Charmander', 'Charmeleon', 'Charizard'],
    etapa: 'media',
    capturado: false,
    genus: 'Pokémon Llama',
    descripcion: 'Más agresivo que Charmander; su cola arde con más fuerza al pelear.',
  },
  {
    id: 6, nombre: 'Charizard', slug: 'charizard',
    tipos: ['fuego', 'volador'],
    peso: 90.5, tamano: 1.7,
    stats: { hp: 78, ataque: 84, defensa: 78, ataqueEsp: 109, defensaEsp: 85, velocidad: 100 },
    habilidades: [
      { nombre: 'Mar Llamas', oculta: false, descripcion: 'Potencia sus movimientos de tipo Fuego cuando le quedan pocos PS.' },
      { nombre: 'Poder Solar', oculta: true, descripcion: 'Si hace sol, sube su Ataque Especial, pero pierde PS en cada turno.' },
    ],
    evolucion: ['Charmander', 'Charmeleon', 'Charizard'],
    etapa: 'final',
    capturado: false,
    genus: 'Pokémon Llama',
    descripcion: 'Vuela buscando rivales fuertes y escupe fuego capaz de fundir rocas.',
  },
  {
    id: 7, nombre: 'Squirtle', slug: 'squirtle',
    tipos: ['agua'],
    peso: 9, tamano: 0.5,
    stats: { hp: 44, ataque: 48, defensa: 65, ataqueEsp: 50, defensaEsp: 64, velocidad: 43 },
    habilidades: [
      { nombre: 'Torrente', oculta: false, descripcion: 'Potencia sus movimientos de tipo Agua cuando le quedan pocos PS.' },
      { nombre: 'Cura Lluvia', oculta: true, descripcion: 'Recupera PS de forma gradual cuando llueve.' },
    ],
    evolucion: ['Squirtle', 'Wartortle', 'Blastoise'],
    etapa: 'inicial',
    capturado: false,
    genus: 'Pokémon Tortuguita',
    descripcion: 'Su caparazón reduce la resistencia del agua y le permite nadar rápido.',
  },
  {
    id: 8, nombre: 'Wartortle', slug: 'wartortle',
    tipos: ['agua'],
    peso: 22.5, tamano: 1,
    stats: { hp: 59, ataque: 63, defensa: 80, ataqueEsp: 65, defensaEsp: 80, velocidad: 58 },
    habilidades: [
      { nombre: 'Torrente', oculta: false, descripcion: 'Potencia sus movimientos de tipo Agua cuando le quedan pocos PS.' },
      { nombre: 'Cura Lluvia', oculta: true, descripcion: 'Recupera PS de forma gradual cuando llueve.' },
    ],
    evolucion: ['Squirtle', 'Wartortle', 'Blastoise'],
    etapa: 'media',
    capturado: false,
    genus: 'Pokémon Tortuga',
    descripcion: 'Las orejas y la cola peludas le ayudan a mantener el equilibrio al nadar.',
  },
  {
    id: 9, nombre: 'Blastoise', slug: 'blastoise',
    tipos: ['agua'],
    peso: 85.5, tamano: 1.6,
    stats: { hp: 79, ataque: 83, defensa: 100, ataqueEsp: 85, defensaEsp: 105, velocidad: 78 },
    habilidades: [
      { nombre: 'Torrente', oculta: false, descripcion: 'Potencia sus movimientos de tipo Agua cuando le quedan pocos PS.' },
      { nombre: 'Cura Lluvia', oculta: true, descripcion: 'Recupera PS de forma gradual cuando llueve.' },
    ],
    evolucion: ['Squirtle', 'Wartortle', 'Blastoise'],
    etapa: 'final',
    capturado: false,
    genus: 'Pokémon Armazón',
    descripcion: 'Los cañones de agua de su caparazón disparan con gran presión y puntería.',
  },
  {
    id: 25, nombre: 'Pikachu', slug: 'pikachu',
    tipos: ['eléctrico'],
    peso: 6, tamano: 0.4,
    stats: { hp: 35, ataque: 55, defensa: 40, ataqueEsp: 50, defensaEsp: 50, velocidad: 90 },
    habilidades: [
      { nombre: 'Electricidad Estática', oculta: false, descripcion: 'El contacto puede paralizar al que lo toca.' },
      { nombre: 'Pararrayos', oculta: true, descripcion: 'Atrae los movimientos de tipo Eléctrico y le suben el Ataque Especial.' },
    ],
    evolucion: ['Pichu', 'Pikachu', 'Raichu'],
    etapa: 'media',
    capturado: true,
    genus: 'Pokémon Ratón',
    descripcion: 'Acumula electricidad en las mejillas y la libera cuando se siente amenazado.',
  },
];

// --- Funciones de ayuda (se importan donde hagan falta) ---

// Número con ceros: 7 -> "007"
export function numeroPokedex(id) {
  return '#' + String(id).padStart(3, '0');
}

// Suma de las seis estadísticas base
export function totalStats(pokemon) {
  return Object.values(pokemon.stats).reduce((suma, n) => suma + n, 0);
}

// Buscar uno por id (lo usa la ficha)
export function buscarPorId(id) {
  return pokedex.find((p) => p.id === id);
}
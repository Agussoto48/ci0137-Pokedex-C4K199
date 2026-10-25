// Práctica de JS (arreglos, objetos y funciones). No lo usa ninguna página.
const pokedex = [
  { id: 25, nombre: 'Pikachu', tipos: ['eléctrico'], hp: 35, ataque: 55, defensa: 40, velocidad: 90 },
  { id: 1, nombre: 'Bulbasaur', tipos: ['planta', 'veneno'], hp: 45, ataque: 49, defensa: 49, velocidad: 45 },
  { id: 2, nombre: 'Ivysaur', tipos: ['planta', 'veneno'], hp: 60, ataque: 62, defensa: 63, velocidad: 60 },
  { id: 3, nombre: 'Venusaur', tipos: ['planta', 'veneno'], hp: 80, ataque: 82, defensa: 83, velocidad: 80 },
  { id: 4, nombre: 'Charmander', tipos: ['fuego'], hp: 39, ataque: 52, defensa: 43, velocidad: 65 },
  { id: 5, nombre: 'Charmeleon', tipos: ['fuego'], hp: 58, ataque: 64, defensa: 58, velocidad: 80 },
  { id: 6, nombre: 'Charizard', tipos: ['fuego', 'volador'], hp: 78, ataque: 84, defensa: 78, velocidad: 100 },
  { id: 7, nombre: 'Squirtle', tipos: ['agua'], hp: 44, ataque: 48, defensa: 65, velocidad: 43 },
  { id: 8, nombre: 'Wartortle', tipos: ['agua'], hp: 59, ataque: 63, defensa: 80, velocidad: 58 },
  { id: 9, nombre: 'Blastoise', tipos: ['agua'], hp: 79, ataque: 83, defensa: 100, velocidad: 78 },
];

function describir(pokemon) {
  return pokemon.nombre + ' #' + pokemon.id + ' (' + pokemon.tipos.join(', ') + ')';
}

// Una función también es un valor: se puede guardar en otra variable
const alias = describir;
console.log(alias(pokedex[2]));
console.log(describir.length);   // cantidad de parámetros
console.log(describir.name);

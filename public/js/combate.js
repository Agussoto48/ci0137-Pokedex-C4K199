// =============================================================
//  combate.js  —  Máquina de estados: un combate por turnos
//  entre dos Pokémon, usando los datos de datos.js.
// =============================================================
import { buscarPorId } from './datos.js';

// Para cada estado: qué evento lleva a qué estado.
// Si un evento no está aquí, no se puede hacer.
const TRANSICIONES = {
  esperando: { atacar: 'resolviendo' },
  resolviendo: { seguir: 'esperando', terminar: 'terminado' },
  terminado: {},
};

// Arma un peleador con lo que el combate necesita
function crearPeleador(id) {
  const pokemon = buscarPorId(id);
  if (!pokemon) throw new Error(`No existe un Pokémon con id ${id}`);

  const { hp, ataque, defensa } = pokemon.stats;
  return { nombre: pokemon.nombre, hp, ataque, defensa };
}

export class Combate {
  #estado = 'esperando';

  constructor(idA, idB) {
    this.a = crearPeleador(idA);
    this.b = crearPeleador(idB);
    this.turno = this.a;
    this.ganador = null;
  }

  // Solo lectura: desde afuera no se puede cambiar el estado
  get estado() {
    return this.#estado;
  }

  // Único lugar donde cambia el estado
  #mover(evento) {
    const siguiente = TRANSICIONES[this.#estado][evento];
    if (!siguiente) {
      throw new Error(`No se puede "${evento}" en el estado "${this.#estado}"`);
    }
    this.#estado = siguiente;
  }

  // El que tiene el turno ataca al otro. Devuelve qué pasó.
  atacar() {
    this.#mover('atacar');

    const atacante = this.turno;
    const defensor = atacante === this.a ? this.b : this.a;

    // Más ataque pega más, más defensa aguanta más (mínimo 1)
    const dano = Math.max(1, Math.round((atacante.ataque * 0.5) - (defensor.defensa * 0.2)));
    defensor.hp = Math.max(0, defensor.hp - dano);

    const mensaje = `${atacante.nombre} ataca a ${defensor.nombre}: -${dano} PS (quedan ${defensor.hp})`;

    if (defensor.hp === 0) {
      this.#mover('terminar');
      this.ganador = atacante.nombre;
      return `${mensaje}. ¡Gana ${atacante.nombre}!`;
    }

    this.#mover('seguir');
    this.turno = defensor;
    return mensaje;
  }
}

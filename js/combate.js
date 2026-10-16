// =============================================================
//  combate.js  —  (OPCIONAL, reto del final) Máquina de estados:
//  un combate por turnos usando los datos de datos.js.
//  Se construye en clase si da el tiempo; si no, queda de tarea.
// =============================================================
import { buscarPorId } from './datos.js';

// -------------------------------------------------------------
// Pistas:
//   1. Una TABLA de transiciones: para cada estado, qué evento
//      lleva a qué estado. Ej.:
//        esperando   -> (atacar)   -> resolviendo
//        resolviendo -> (seguir)   -> esperando
//        resolviendo -> (terminar) -> terminado
//   2. class Combate con:
//        - un campo privado  #estado = 'esperando'
//        - un getter  get estado()  (solo lectura)
//        - un método privado #mover(evento) que revisa la tabla
//          y lanza error si la movida no existe
//        - atacar(): baja la vida del otro y mueve de estado;
//          si la vida llega a 0, pasa a 'terminado'
// -------------------------------------------------------------
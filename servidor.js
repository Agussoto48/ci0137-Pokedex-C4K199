// http, fs y path ya vienen con Node (no se instalan).
const http = require('http');
const fs = require('fs');
const path = require('path');
const { tipoDe } = require('./mime');

const PUERTO = 3000;
const PUBLICO = path.join(__dirname, 'public');

// Traduce la URL a un archivo dentro de public/.
// Devuelve null si intenta salirse de public/ (ej. /../servidor.js).
function archivoDe(url) {
  let ruta = decodeURIComponent(new URL(url, 'http://localhost').pathname);
  if (ruta === '/') ruta = '/index.html';

  const archivo = path.join(PUBLICO, path.normalize(ruta));
  if (!archivo.startsWith(PUBLICO + path.sep)) return null;
  return archivo;
}

// Responde con la página 404.
function noEncontrado(respuesta) {
  fs.readFile(path.join(PUBLICO, '404.html'), (error, pagina) => {
    respuesta.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    respuesta.end(error ? '404 - No encontrado' : pagina);
  });
}

// createServer recibe una función que se ejecuta en CADA petición.
const servidor = http.createServer((peticion, respuesta) => {
  const archivo = archivoDe(peticion.url);
  if (!archivo) return noEncontrado(respuesta);

  fs.readFile(archivo, (error, contenido) => {
    if (error) return noEncontrado(respuesta);
    respuesta.writeHead(200, { 'Content-Type': tipoDe(path.extname(archivo)) });
    respuesta.end(contenido);
  });
});

// listen deja el servidor "escuchando" pedidos en el puerto 3000.
servidor.listen(PUERTO, () => {
  console.log(`Servidor en http://localhost:${PUERTO}`);
});

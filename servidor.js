// http, fs y path ya vienen con Node (no se instalan).
const http = require('http');
const fs = require('fs');
const path = require('path');
const { tipoDe } = require('./mime');

const PUERTO = 3000;
const RAIZ = __dirname;

// Solo se sirve lo que está en estas carpetas (y el favicon).
// Así nadie puede pedir servidor.js, .git, etc.
const PERMITIDOS = ['html', 'css', 'js', 'assets'];

// Traduce la URL pedida a un archivo de nuestro proyecto.
// Las páginas viven en html/, pero se piden desde la raíz:
//   /                        -> html/index.html
//   /detalle.html?id=7       -> html/detalle.html
//   /css/styles.css          -> css/styles.css
function archivoDe(url) {
  let ruta = decodeURIComponent(new URL(url, 'http://localhost').pathname);

  if (ruta === '/') ruta = '/index.html';
  if (path.extname(ruta) === '.html' && !ruta.startsWith('/html/')) {
    ruta = '/html' + ruta;
  }

  const archivo = path.join(RAIZ, path.normalize(ruta));
  const carpeta = path.relative(RAIZ, archivo).split(path.sep)[0];

  if (archivo === path.join(RAIZ, 'favicon.ico')) return archivo;
  if (PERMITIDOS.includes(carpeta)) return archivo;
  return null;
}

// createServer recibe una función que se ejecuta en CADA petición.
const servidor = http.createServer((peticion, respuesta) => {
  const archivo = archivoDe(peticion.url);

  if (!archivo) {
    respuesta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    respuesta.end('404 - No encontrado');
    return;
  }

  fs.readFile(archivo, (error, contenido) => {
    if (error) {
      respuesta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      respuesta.end('404 - No encontrado');
      return;
    }
    respuesta.writeHead(200, { 'Content-Type': tipoDe(path.extname(archivo)) });
    respuesta.end(contenido);
  });
});

// listen deja el servidor "escuchando" pedidos en el puerto 3000.
servidor.listen(PUERTO, () => {
  console.log(`Servidor en http://localhost:${PUERTO}`);
});

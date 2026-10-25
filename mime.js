// Este archivo se encarga solo de una cosa: dado el tipo de archivo,
// decir qué Content-Type le corresponde.
const tipos = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function tipoDe(extension) {
  return tipos[extension] ?? 'application/octet-stream';
}

// Lo que este módulo OFRECE al resto del proyecto:
module.exports = { tipoDe };

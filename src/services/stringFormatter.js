export function getDateString(fechaMilisegundos) {
  const fecha = new Date(Number.parseInt(fechaMilisegundos));

  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear().toString().slice(-2);

  const hora = fecha.getHours().toString().padStart(2, '0');
  const minuto = fecha.getMinutes().toString().padStart(2, '0');
  const segundo = fecha.getSeconds().toString().padStart(2, '0');

  return `${dia}/${mes}/${anio} ${hora}:${minuto}:${segundo}`;
}

export function getImageUrl(originalUrl) {
  const regex = /^https:\/\/drive\.google\.com\/file\/d\//;
  if (!regex.test(originalUrl)) {
    return originalUrl;
  }

  const id = originalUrl.split("/")[5];
  return `https://drive.google.com/uc?id=${id}`;
}

export function getDepto(deptoId) {
  const arrayDeptos = ['Copán', 'Ocotepeque', 'Lempira', 'Santa Bárbara']
  return arrayDeptos[deptoId];
}
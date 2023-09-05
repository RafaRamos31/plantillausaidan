const arrayNivelesOrganizacion = ['Nacional', 'Departamental', 'Municipal', 'Comunitario']

export function getArrayNivelesOrganizacion() {
  return arrayNivelesOrganizacion
}

export function getElementNivelesOrganizacion(i) {
  return arrayNivelesOrganizacion[i];
}

export function getIndexNivelesOrganizacion(string) {
  return arrayNivelesOrganizacion.indexOf(string)
}


export function getTipoIndicador(i) {
  const arrayNivelesOrganizacion = ['Resultado', 'Proceso', 'Impacto', 'Objetivo']
  return arrayNivelesOrganizacion[i];
}

export function getArrayTiposIndicador(i) {
  return ['Resultado', 'Proceso', 'Impacto', 'Objetivo']
}
const arrayNivelesOrganizacion = ['Nacional', 'Regional/Departamental', 'Municipal', 'Comunitario']

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


const arraySectores = ['Publico', 'Privado', 'Cooperación']

export function getArraySectores() {
  return arraySectores
}

export function getElementSectores(i) {
  return arraySectores[i];
}

export function getIndexSectores(string) {
  return arraySectores.indexOf(string)
}

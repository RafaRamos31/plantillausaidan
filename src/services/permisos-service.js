export const permisos = {
  vistas: {
    'Clientes': {
      'Beneficiarios': false,
      'Organizaciones': false,
      'Tipos de Organizaciones': false,
      'Cargos': false,
      'Sectores': false
    },
    'Inversiones': {
      'Inversiones': false,
      'Áreas Temáticas': false,
      'Categorias': false,
      'Sub Categorias': false,
    },
    'Planificación': {
      'Resultados': false,
      'Indicadores': false,
      'Estrategias': false,
      'Actividades': false,
      'Tareas': false,
      'Monitoreo': false,
    },
    'Indicadores': {
      'Indicadores': false,
      'Registro': false,
      'Monitoreo': false,
      'Reportes': false
    },
    'Reportes': {
      'Reportes': false
    },
    'Configuración': {
      'Usuarios': false,
      'Roles': false,
      'Componentes': false,
      'Departamentos': false,
      'Municipios': false,
      'Aldeas': false,
      'Caserios': false,
      'Áreas Temáticas': false,
      'Sub Áreas Temáticas': false,
    }
  },
  acciones: {
    'Usuarios': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Roles': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Componentes': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Departamentos': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Municipios': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Aldeas': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Caserios': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Áreas Temáticas': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Sub Áreas Temáticas': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Sectores': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Organizaciones': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Tipos de Organizaciones': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Cargos': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Beneficiarios': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    }
  }
}

export const getPermisosActuales = (type, permisosUsuario) => {
  let newPermisos = {}
  // Combinar los arreglos
  if(type === 'vistas'){
    for (let key in permisos.vistas) {
      newPermisos[key] = {...permisos.vistas[key], ...permisosUsuario[key]}
    }
  }
  if(type === 'acciones'){
    for (let key in permisos.acciones) {
      newPermisos[key] = {...permisos.acciones[key], ...permisosUsuario[key]}
    }
  }
  return newPermisos
}
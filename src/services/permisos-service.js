export const permisos = {
  vistas: {
    'Clientes': {
      'Beneficiarios': false,
      'Organizaciones': false,
      'Tipos de Organizaciones': false,
      'Cargos': false,
      'Sectores': false,
      'Monitoreo': false,
    },
    'Planificación': {
      'Resultados': false,
      'Sub Resultados': false,
      'Actividades': false,
      'Sub Actividades': false,
      'Tareas': false,
      'Años Fiscales': false,
      'Trimestres': false,
      'Monitoreo': false,
    },
    'Indicadores': {
      'Indicadores': false,
      'Áreas Temáticas': false,
      'Monitoreo': false,
    },
    'Eventos': {
      'Registro': false,
      'Seguimiento': false,
      'Calendario': false,
    },
    'Inversiones': {
      'Inversiones': false,
      'Áreas Temáticas': false,
      'Categorias': false,
      'Sub Categorias': false,
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
      'Caserios': false
    }
  },
  acciones: {
    'Beneficiarios': {
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
    'Sectores': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Resultados': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Sub Resultados': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Actividades': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Sub Actividades': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Tareas': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Años Fiscales': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Trimestres': {
      'Ver Eliminados': false,
      'Ver Historial': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Indicadores': {
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
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
      'Monitoreo': false,
    },
    'Indicadores': {
      'Indicadores': false,
      'Áreas Temáticas': false,
      'Años Fiscales': false,
      'Trimestres': false,
      'Monitoreo': false,
    },
    'Eventos': {
      'Planificación': false,
      'Tablero': false,
      'Calendario': false,
      'Aprobación': false,
      'Finalización': false,
      'Digitación': false,
      'Consolidar': false
    },
    'Inversiones': {
      'Presupuestar Evento': false,
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
      'Caserios': false,
      'Tipos de Eventos': false,
      'Niveles': false,
      'Ajustes Generales': false
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
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Cargos': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Sectores': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Resultados': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Sub Resultados': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Actividades': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Sub Actividades': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Tareas': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Revisar': false,
      'Eliminar': false,
    },
    'Años Fiscales': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Trimestres': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Indicadores': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Áreas Temáticas': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Usuarios': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Roles': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Componentes': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Departamentos': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Municipios': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Aldeas': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Caserios': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Tipos de Eventos': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Niveles': {
      'Ver Eliminados': false,
      'Crear': false,
      'Modificar': false,
      'Eliminar': false,
    },
    'Eventos': {
      'Ver Global': false,
      'Crear': false,
      'Finalizar': false,
      'Aprobar Finalizar': false,
      'Digitalizar': false,
      'Aprobar Digitalizar': false,
      'Presupuestar': false,
      'Consolidar': false,
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
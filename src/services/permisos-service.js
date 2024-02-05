export const permisos = {
  vistas: {
    'Clientes': {
      'Beneficiarios': false,
      'Organizaciones': false,
      'Tipos de Organizaciones': false,
      'Cargos': false
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
    }
  }
}

export const getPermisosActuales = ({permisosActuales, permisosUsuario}) => {
  // Combinar los arreglos
  var resultado = { ...permisosActuales, ...permisosUsuario };

  // Eliminar propiedades que no están en arreglo1
  for (var key in resultado) {
    if (!permisosActuales.hasOwnProperty(key)) {
      delete resultado[key];
    }
  }

  // Mostrar el resultado final
  console.log(resultado);
}
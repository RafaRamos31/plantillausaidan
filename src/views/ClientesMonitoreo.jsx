import { ClientesNavBar } from "../components/navBars/ClientesNavBar.jsx";
import { Layout } from "./Layout.jsx";
import { ReportChart } from "../components/ReportChart.jsx";
import useForm from "../hooks/useForm.js";
import { Box, Chip, ListItemText, MenuItem, Select } from "@mui/material";

export const ClientesMonitoreo = () => {

  const reportes = [
    {nombre: 'Departamento', value: 'departamentoId'},
    {nombre: 'Municipio', value: 'municipioId'},
    {nombre: 'Sexo', value: 'sexo'},
    {nombre: 'Tipo de Beneficiario', value: 'tipoBeneficiario'},
    {nombre: 'Sector', value: 'sectorId'},
    {nombre: 'Tipo de Organización', value: 'tipoOrganizacionId'},
  ]

  const { values, handleChange } = useForm({
    reportes: ['departamentoId'],
  });
  

  return(
    <>
    <Layout pagina={'Clientes - Monitoreo'} SiteNavBar={ClientesNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/clientes', nombre: 'Clientes'},
        {link: '/clientes/monitoreo', nombre: 'Monitoreo'}
    ]}>
      <h2 className="view-title"><i className="bi bi-clipboard2-data-fill"></i>{` Monitoreo de Beneficiarios`}</h2>
      <div className="d-flex mb-4">
        <h4 className="my-auto">Reportes:</h4>
        <Select
          className="mx-2"
          id="reportes"
          name="reportes"
          autoWidth
          multiple
          onChange={handleChange}
          value={values.reportes}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={reportes.find(reporte => reporte.value === value).nombre} />
              ))}
            </Box>
          )}
        >
          {reportes.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <ListItemText primary={item.nombre} />
            </MenuItem>
          ))}
        </Select>
      </div>
      
      {
        values.reportes.map((reporte, index) => <ReportChart key={index}  endpoint={'beneficiarios'} param={reporte} />)
      }
      
    </Layout>
    </>
  );
}
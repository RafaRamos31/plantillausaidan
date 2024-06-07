import { useEffect, useState } from "react";
import { useFetchGetBody } from "../hooks/useFetch";
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const ReportChart = ({endpoint, param}) => {

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

  const titulos = {
    'departamentoId' : 'Beneficiarios por Departamento',
    'municipioId' : 'Beneficiarios por Municipio',
    'sectorId' : 'Beneficiarios por Sector',
    'tipoOrganizacionId' : 'Beneficiarios por Tipo de Organización',
    'sexo' : 'Beneficiarios por Sexo',
    'tipoBeneficiario' : 'Beneficiarios por Tipo',
  }

  const leyendas = {
    'departamentoId' : 'Departamento',
    'municipioId' : 'Municipio',
    'sectorId' : 'Sector',
    'tipoOrganizacionId' : 'Tipo de Organización',
    'sexo' : 'Sexo',
    'tipoBeneficiario' : 'Tipo de Beneficiario',
  }

  const findParams = {
    param: param
  }
  const [values, setValues] = useState([])
  const { data: dataDB, isLoading, error } = useFetchGetBody(endpoint + '/reporte', findParams);

  useEffect(() => {
    if(dataDB && !isLoading){
      if(param === 'departamentoId'){
        setValues(dataDB.map(item => ({...item, nombre: item.departamento?.nombre})))
      }
      else if(param === 'municipioId'){
        setValues(dataDB.map(item => ({...item, nombre: item.municipio?.nombre})))
      }
      else if(param === 'sectorId'){
        setValues(dataDB.map(item => ({...item, nombre: item.sector?.nombre})))
      }
      else if(param === 'tipoOrganizacionId'){
        setValues(dataDB.map(item => ({...item, nombre: item.tipoOrganizacion?.nombre})))
      }
      else if(param === 'sexo'){
        setValues(dataDB.map(item => ({...item, nombre: item.sexo})))
      }
      else if(param === 'tipoBeneficiario'){
        setValues(dataDB.map(item => ({...item, nombre: item.tipoBeneficiario})))
      }
      else{
        setValues(dataDB)
      }
    }
  
  }, [dataDB, isLoading, error, param])

  try {
    return (
    <>
    <h4>{titulos[param]}</h4>
    <ResponsiveContainer maxHeight={500}>
      <BarChart
        data={values}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nombre" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cantidad" name={leyendas[param]} stackId="a" fill="#8884d8" >
          {values.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 6]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </>
  )
  } catch (error) {
    <div></div>
  }
  
}

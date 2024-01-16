import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie } from 'recharts';
import { ClientesNavBar } from "../components/navBars/ClientesNavBar.jsx";
import { useRefreshAuth } from "../hooks/useAuth.js";
import { useFetchGetBody } from "../hooks/useFetch.js";
import { Layout } from "./Layout.jsx";
import { ClientesFilter } from '../components/filterBars/ClientesFilter.jsx';
import { Col, Row } from 'react-bootstrap';
import useForm from "../hooks/useForm.js";

export const Clientes = () => {
  useRefreshAuth();

  const {values, handleChange} = useForm({
    idDepartamento: '',
    idMunicipio: '',
    idAldea: '',
    idCaserio: '',
    idOrganizacion: '',
    idCargo: ''
  })
  const { data, setRefetch } = useFetchGetBody('getstatsbeneficiarios', values);

  /*const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];*/
  
  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
  ];
  

  return(
    <>
    <Layout pagina={'Clientes'} SiteNavBar={ClientesNavBar}>
      <ClientesFilter values={values} handleChange={handleChange} setRefetch={setRefetch}/>
        <Row className='w-100'>
          <Col>
            <h5 className='text-center mt-3'>Registros según Edad/Sexo</h5>
              <BarChart
                data={data?.sexo || null}
                width={600}
                height={320}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                
                <Bar dataKey="m" stackId="a" fill="#8884d8" />
                <Bar dataKey="f" stackId="a" fill="#82ca9d" />
              </BarChart>
          </Col>
          <Col>
            <h5 className='text-center mt-3'>Registros según Organización/Cargo</h5>
              <PieChart width={400} height={350}>
                <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={90} fill="#8884d8" />
                <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={100} outerRadius={120} fill="#82ca9d" label />
                <Tooltip />
              </PieChart>
          </Col>
        </Row>  
    </Layout>
    </>
  );
}

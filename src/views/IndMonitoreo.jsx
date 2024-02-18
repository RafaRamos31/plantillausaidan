import { Button, ButtonGroup, Grid, Paper } from "@mui/material";
import { Layout } from "./Layout.jsx";
import { ProgressBar } from "react-bootstrap";
import { IndicadorPaper } from "../components/IndicadorPaper.jsx";
import { useEffect, useState } from "react";
import { IndicadoresNavBar } from "../components/navBars/IndicadoresNavBar.jsx";

export const IndMonitoreo = () => {
  const [globalPercent, setGlobalPercent] = useState(0)
  const [year, setYear] = useState('LOP');
  const [trimestre, setTrimestre] = useState('Total');

  const indicadores = [
    {
      titulo: '1. EG.3-2',
      descripcion: 'Número de personas que participan en los programas de seguridad alimentaria del Gobierno de los Estados Unidos.',
      medida: 'Personas',
      metas: {
        'AF24': {
          'T1': 0,
          'T2': 790,
          'T3': 2368,
          'T4': 2368,
          'Total': 5526,
        },
        'AF25': {
          'T1': 2368,
          'T2': 2368,
          'T3': 2368,
          'T4': 2368,
          'Total': 8843,
        },
        'AF26': {
          'T1': 2368,
          'T2': 2368,
          'T3': 2368,
          'T4': 2368,
          'Total': 8843,
        },
        'AF27': {
          'T1': 2368,
          'T2': 2368,
          'T3': 2368,
          'T4': 2368,
          'Total': 8843,
        },
        'AF28': {
          'T1': 2368,
          'T2': 2368,
          'T3': 2368,
          'T4': 2368,
          'Total': 8843,
        },
        'LOP': {
          'T1': 35000,
          'T2': 35000,
          'T3': 35000,
          'T4': 35000,
          'Total': 35000
        },
      },
      progresos: {
        'AF24': {
          'T1': 0,
          'T2': 500,
          'T3': 2000,
          'T4': 1500,
          'Total': 4000,
        },
        'AF25': {
          'T1': 0,
          'T2': 500,
          'T3': 2000,
          'T4': 1500,
          'Total': 4000,
        },
        'AF26': {
          'T1': 0,
          'T2': 500,
          'T3': 2000,
          'T4': 1500,
          'Total': 4000,
        },
        'AF27': {
          'T1': 0,
          'T2': 500,
          'T3': 2000,
          'T4': 1500,
          'Total': 4000,
        },
        'AF28': {
          'T1': 0,
          'T2': 500,
          'T3': 2000,
          'T4': 1500,
          'Total': 4000,
        },
        'LOP': {
          'T1': 3500,
          'T2': 3500,
          'T3': 3500,
          'T4': 3500,
          'Total': 3500
        },
      }
    },
    {
      titulo: '2. HL.9-4',
      descripcion: 'Número de personas que reciben capacitación profesional relacionada con la nutrición a través de programas respaldados por el Gobierno de los Estados Unidos.',
      medida: 'Personas',
      metas: {
        'AF24': {
          'T1': 0,
          'T2': 62,
          'T3': 169,
          'T4': 169,
          'Total': 400,
        },
        'AF25': {
          'T1': 165,
          'T2': 165,
          'T3': 165,
          'T4': 165,
          'Total': 660,
        },
        'AF26': {
          'T1': 165,
          'T2': 165,
          'T3': 165,
          'T4': 165,
          'Total': 660,
        },
        'AF27': {
          'T1': 110,
          'T2': 110,
          'T3': 110,
          'T4': 110,
          'Total': 440,
        },
        'AF28': {
          'T1': 110,
          'T2': 110,
          'T3': 110,
          'T4': 110,
          'Total': 440,
        },
        'LOP': {
          'T1': 2500,
          'T2': 2500,
          'T3': 2500,
          'T4': 2500,
          'Total': 2500
        },
      },
      progresos: {
        'AF24': {
          'T1': 0,
          'T2': 70,
          'T3': 100,
          'T4': 120,
          'Total': 280,
        },
        'AF25': {
          'T1': 70,
          'T2': 90,
          'T3': 60,
          'T4': 100,
          'Total': 400,
        },
        'AF26': {
          'T1': 70,
          'T2': 90,
          'T3': 60,
          'T4': 100,
          'Total': 400,
        },
        'AF27': {
          'T1': 70,
          'T2': 90,
          'T3': 60,
          'T4': 100,
          'Total': 400,
        },
        'AF28': {
          'T1': 70,
          'T2': 90,
          'T3': 60,
          'T4': 100,
          'Total': 400,
        },
        'LOP': {
          'T1': 2000,
          'T2': 2000,
          'T3': 2000,
          'T4': 2000,
          'Total': 2000
        },
      }
    },
    {
      titulo: '3. CUSTOM',
      descripcion: 'Monto de los fondos apalancados por Feed the Future Honduras Avanzando la Nutrición en apoyo de los objetivos de desarrollo de los Estados Unidos.',
      medida: 'Efectivo',
      metas: {
        'AF24': {
          'T1': 0,
          'T2': 220000,
          'T3': 690000,
          'T4': 690000,
          'Total': 1600000,
        },
        'AF25': {
          'T1': 525000,
          'T2': 525000,
          'T3': 525000,
          'T4': 525000,
          'Total': 2100000,
        },
        'AF26': {
          'T1': 525000,
          'T2': 525000,
          'T3': 525000,
          'T4': 525000,
          'Total': 2100000,
        },
        'AF27': {
          'T1': 525000,
          'T2': 525000,
          'T3': 525000,
          'T4': 525000,
          'Total': 2100000,
        },
        'AF28': {
          'T1': 525000,
          'T2': 525000,
          'T3': 525000,
          'T4': 525000,
          'Total': 2100000,
        },
        'LOP': {
          'T1': 10000000,
          'T2': 10000000,
          'T3': 10000000,
          'T4': 10000000,
          'Total': 10000000
        },
      },
      progresos: {
        'AF24': {
          'T1': 0,
          'T2': 200000,
          'T3': 200000,
          'T4': 200000,
          'Total': 600000,
        },
        'AF25': {
          'T1': 200000,
          'T2': 200000,
          'T3': 200000,
          'T4': 200000,
          'Total': 600000,
        },
        'AF26': {
          'T1': 200000,
          'T2': 200000,
          'T3': 200000,
          'T4': 200000,
          'Total': 600000,
        },
        'AF27': {
          'T1': 200000,
          'T2': 200000,
          'T3': 200000,
          'T4': 200000,
          'Total': 600000,
        },
        'AF28': {
          'T1': 200000,
          'T2': 200000,
          'T3': 200000,
          'T4': 200000,
          'Total': 600000,
        },
        'LOP': {
          'T1': 6000000,
          'T2': 6000000,
          'T3': 6000000,
          'T4': 6000000,
          'Total': 6000000
        },
      }
    }
  ]

  useEffect(() => {
    if(year === 'LOP'){
      setTrimestre('Total')
    }

    const suma = indicadores.reduce((acum, indicador) => {
      if(indicador.metas[year][trimestre] === 0){
        return acum + 100
      }
      const progreso = indicador.progresos[year][trimestre] > indicador.metas[year][trimestre] ? indicador.metas[year][trimestre] : indicador.progresos[year][trimestre]
      return acum + (progreso / indicador.metas[year][trimestre] * 100)
    }, 0)
    console.log(suma)
    setGlobalPercent(Number.parseInt(suma/indicadores.length))
    // eslint-disable-next-line
  }, [year, trimestre])

  return(
    <>
    <Layout pagina={'Planificación - Monitoreo'} SiteNavBar={IndicadoresNavBar} breadcrumbs={[
        {link: '/', nombre: 'Inicio'},
        {link: '/indicadores', nombre: 'Indicadores'},
        {link: '/indicadores/monitoreo', nombre: 'Monitoreo'}
    ]}>
      <h2 className="view-title"><i className="bi bi-clipboard2-data-fill"></i>{` Monitoreo de Indicadores`}</h2>
      <ButtonGroup variant="outlined">
        <Button color="success" variant={year === 'AF24' ? 'contained' : 'outlined'} onClick={() => setYear('AF24')}>AF24</Button>
        <Button color="success" variant={year === 'AF25' ? 'contained' : 'outlined'} onClick={() => setYear('AF25')}>AF25</Button>
        <Button color="success" variant={year === 'AF26' ? 'contained' : 'outlined'} onClick={() => setYear('AF26')}>AF26</Button>
        <Button color="success" variant={year === 'AF27' ? 'contained' : 'outlined'} onClick={() => setYear('AF27')}>AF27</Button>
        <Button color="success" variant={year === 'AF28' ? 'contained' : 'outlined'} onClick={() => setYear('AF28')}>AF28</Button>
        <Button color="success" variant={year === 'LOP' ? 'contained' : 'outlined'} onClick={() => setYear('LOP')}>LOP</Button>
      </ButtonGroup>
      <br />
      <ButtonGroup variant="outlined" className="my-3" disabled={year==='LOP'}>
        <Button color="success" variant={trimestre === 'T1' ? 'contained' : 'outlined'} onClick={() => setTrimestre('T1')}>T1</Button>
        <Button color="success" variant={trimestre === 'T2' ? 'contained' : 'outlined'} onClick={() => setTrimestre('T2')}>T2</Button>
        <Button color="success" variant={trimestre === 'T3' ? 'contained' : 'outlined'} onClick={() => setTrimestre('T3')}>T3</Button>
        <Button color="success" variant={trimestre === 'T4' ? 'contained' : 'outlined'} onClick={() => setTrimestre('T4')}>T4</Button>
        <Button color="success" variant={trimestre === 'Total' ? 'contained' : 'outlined'} onClick={() => setTrimestre('Total')}>Total</Button>
      </ButtonGroup>

      <Paper elevation={8} className='px-5 py-4' style={{textAlign: 'center', backgroundColor: '#A9CCE3'}}>
        <h6 className='my-0' style={{textAlign: 'end', fontWeight: 'bold'}}>{`${year}${trimestre !== 'Total' ? '-' + trimestre : ''}`}</h6>
        <i className="bi bi-flag" style={{fontSize: '3rem', fontWeight:'bold'}}></i>
        <h2 className="pb-4">Mejora de la calidad de las dietas en los municipios destinatarios.</h2>
        <ProgressBar>
          <ProgressBar striped variant="success" now={globalPercent} label={`${globalPercent}%`}/>
        </ProgressBar>
      </Paper>
      <Grid  className="my-4" container spacing={2}>
        {
          indicadores && indicadores.map((indicador, index) => (
            <IndicadorPaper 
              key={index}
              titulo={indicador.titulo}
              descripcion={indicador.descripcion}
              medida={indicador.medida}
              metas={indicador.metas}
              progresos={indicador.progresos}
              trimestre={trimestre}
              year={year}
            />
          ))
        }
      </Grid>
    </Layout>
    </>
  );
}


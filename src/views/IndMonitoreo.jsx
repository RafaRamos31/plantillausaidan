import { Button, ButtonGroup, Grid, Paper } from "@mui/material";
import { Layout } from "./Layout.jsx";
import { ProgressBar } from "react-bootstrap";
import { IndicadorPaper } from "../components/IndicadorPaper.jsx";
import React, { useEffect, useState } from "react";
import { IndicadoresNavBar } from "../components/navBars/IndicadoresNavBar.jsx";
import { useFetchGetPaged } from "../hooks/useFetch.js";
import { LoadingScreen } from "./LoadingScreen.jsx";

export const IndMonitoreo = () => {
  const [globalPercent, setGlobalPercent] = useState(0)
  const [year, setYear] = useState('LOP');
  const [trimestre, setTrimestre] = useState('Total');

  //Obtener indicadores
  
  const [indicadores, setIndicadores] = useState([]);

  const tableState = {
    page: 0,
    pageSize: 20,
    filter: '{}',
    sort: '{}',
    reviews: false,
    deleteds: false,
  }

  const { data, isLoading } = useFetchGetPaged(`indicadores/paged`, tableState);

  useEffect(() => {
    if(data && !isLoading){
      setIndicadores(data.rows)

      const suma = data.rows.reduce((acum, indicador) => {
        if(indicador.metas[year][trimestre] === 0){
          return acum + 100
        }
        const progreso = indicador.progresos[year][trimestre] > indicador.metas[year][trimestre] ? indicador.metas[year][trimestre] : indicador.progresos[year][trimestre]
        return acum + (progreso / indicador.metas[year][trimestre] * 100)
      }, 0)

      setGlobalPercent(data.rows.length > 0 ? Number.parseInt(suma/data.rows.length) : 0)
    }
    // eslint-disable-next-line
  }, [data, isLoading])
  
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

    setGlobalPercent(indicadores.length > 0 ? Number.parseInt(suma/indicadores.length) : 0)
    
    // eslint-disable-next-line
  }, [year, trimestre])

  if(isLoading){
    return(
      <LoadingScreen />
    )
  }

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
              titulo={indicador.nombre}
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


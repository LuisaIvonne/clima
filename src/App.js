import React, {Fragment, useState, useEffect} from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Clima from './componentes/Clima';
import Error from './componentes/Error';

function App() {

  //State del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais:''
  });
  
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  //extraer ciudad y pais
  const {ciudad, pais} = busqueda;

  //console.log(consulta);
  useEffect(() => {
    const consultarAPI = async() => {

        if (consultar) {
          const appId = '4e16cbba0f2781441b4a627a0ae91df4';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
          const respuesta = await fetch(url);
          const resultado =  await respuesta.json();
          guardarResultado(resultado);
          guardarConsultar(false);

          //Detecta si hubo resultados correctos en la consulta
          if (resultado.cod === "404") {
            guardarError(true);
          }else{
            guardarError(false);
          }
        }
    }
    consultarAPI();
    //eslint-disable-next-line
  }, [consultar])

  let componente;
  if (error) {
    componente = <Error  mensaje ="No hay resultado"/>
  } else {
    componente = <Clima resultado = {resultado} />
  }
  

  return (
    <Fragment>
        <Header
            titulo='Clima React App'
        />
        <div className="contenedor-form">
            <div className="container">
              <div className="row">
                <div className="col m6 s12">
                    <Formulario
                      busqueda={busqueda}
                      guardarBusqueda={guardarBusqueda}
                      guardarConsultar={guardarConsultar}
                    />
                </div>
                <div className="col m6 s12">
                  {componente}
                </div>
              </div>
            </div>
        </div>
    </Fragment>
  );
}

export default App;

import { useState } from 'react';
import Header from './Header';
import Resultados from './Resultados';
import CONFIG from './config/config';
import { mock1 } from './constants/mock';
import './App.css';

// Se recomienda hacer la validación fuera del componente[cite: 10]
const validarCoordenadas = (lat, lon) => {
  if (lat === '' || isNaN(lat) || lat < -90 || lat > 90) {
    return "Error: La latitud introducida no es válida. Debe ser un número entre -90 y 90.";
  }
  if (lon === '' || isNaN(lon) || lon < -180 || lon > 180) {
    return "Error: La longitud introducida no es válida. Debe ser un número entre -180 y 180.";
  }
  return null;
};

function App() {
  const [latitud, setLatitud] = useState(CONFIG.default_lat);
  const [longitud, setLongitud] = useState(CONFIG.default_lon);
  const [datos, setDatos] = useState(null);
  
  // Nuevo estado para almacenar y mostrar errores
  const [errorMsg, setErrorMsg] = useState(null);

  const handleBuscar = async () => {
    // 1. Validar las entradas del usuario
    const errorValidacion = validarCoordenadas(latitud, longitud);
    if (errorValidacion) {
      setErrorMsg(errorValidacion);
      setDatos(null); // Ocultar resultados si hay error[cite: 10]
      return; 
    }

    // Si pasamos la validación, limpiamos posibles errores previos
    setErrorMsg(null);

    // 2. Comprobar si usamos servidor o mock[cite: 9]
    if (!CONFIG.use_server) {
      setDatos(mock1);
      return;
    }

    // 3. Llamada real a la API[cite: 9]
    try {
      // Construcción exacta de la URL requerida
      const url = `${CONFIG.server_url}?key=${CONFIG.api_key}&q=${latitud},${longitud}&days=3`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (response.status === 200) {
        setDatos(data);
      } else {
        // Manejo del error devuelto por la API de weatherapi[cite: 9]
        setErrorMsg(`Error del servidor (Código ${data.error.code}): ${data.error.message}`);
        setDatos(null);
      }
    } catch (err) {
      setErrorMsg("Error de conexión con el servidor.");
      setDatos(null);
    }
  };

  return (
    <div className="App">
      <Header />
      <h2 id="titulo">El tiempo</h2>

      <div className="buscador">
        <div>
          <label htmlFor="latitud">Latitud: </label>
          <input
            id="latitud"
            type="text"
            value={latitud}
            onChange={(e) => setLatitud(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="longitud">Longitud: </label>
          <input
            id="longitud"
            type="text"
            value={longitud}
            onChange={(e) => setLongitud(e.target.value)}
          />
        </div>

        <button id="buscar" onClick={handleBuscar}>
          Buscar
        </button>
      </div>

      {/* Si hay error, se renderiza el div exigido por los tests[cite: 9, 10] */}
      {errorMsg && <div id="error" className="error-mensaje">{errorMsg}</div>}

      <Resultados numitems={CONFIG.num_items_show} datos={datos} />
    </div>
  );
}

export default App;
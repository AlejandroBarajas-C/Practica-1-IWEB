import { useState } from 'react';
import Header from './Header';
import Resultados from './Resultados';
import CONFIG from './config/config';
import { mock1 } from './constants/mock';
import './App.css';

function App() {
  const [latitud, setLatitud] = useState(CONFIG.default_lat);
  const [longitud, setLongitud] = useState(CONFIG.default_lon);
  
  // Estado para almacenar los datos recibidos
  const [datos, setDatos] = useState(null);

  const handleBuscar = () => {
    if (!CONFIG.use_server) {
      setDatos(mock1); // Usamos mock1 en lugar de mockData
    } else {
      console.log("Modo servidor activado");
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

      {/* Se pasan las props exigidas: numitems y datos */}
      <Resultados numitems={CONFIG.num_items_show} datos={datos} />
    </div>
  );
}

export default App;
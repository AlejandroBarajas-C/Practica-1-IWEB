import { useState } from 'react'
import Header from './Header'
import CONFIG from './config/config'
import './App.css'

function App() {
  // Estado para los inputs inicializados con la configuración por defecto
  const [latitud, setLatitud] = useState(CONFIG.default_lat)
  const [longitud, setLongitud] = useState(CONFIG.default_lon)

  // Función manejadora del botón Buscar (por ahora imprimirá en consola)
  const handleBuscar = () => {
    console.log("Buscar pulsado. Latitud:", latitud, "Longitud:", longitud)
  }

  return (
    <div className="App">
      {/* Requisito 1: Componente Header (1 punto) */}
      <Header />

      {/* Requisito 2: Título de la app (0.5 puntos) */}
      <h2 id="titulo">El tiempo</h2>

      {/* Requisitos 3 y 4: Inputs controlados y botón (2 puntos) */}
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
    </div>
  )
}

export default App
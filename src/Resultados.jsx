import React from 'react';
import Tarjeta from './Tarjeta';

function Resultados({ numitems, datos }) {
  // Si no hay datos cargados todavía, no se renderiza nada
  if (!datos) return null;

  // Extraemos datos de ciudad, país y zona horaria
  const ciudad = datos.ciudad || datos.location?.name;
  const pais = datos.pais || datos.location?.country;
  const timezone = datos.timezone || datos.location?.tz_id;

  // Extraemos la lista de predicciones diarias
  const listaDias = datos.daily || datos.forecast?.forecastday || [];

  return (
    <div id="resultados">
      <h3>Ciudad: {ciudad}</h3>
      <h3>País: {pais}</h3>
      <h3>Código Timezone: {timezone}</h3>
      <h3>El tiempo en los próximos días será:</h3>

      <div className="contenedor-tarjetas">
        {/* Recortamos el array de días según numitems */}
        {listaDias.slice(0, numitems).map((dia, index) => (
          <Tarjeta key={dia.dt || dia.date_epoch || index} dia={dia} />
        ))}
      </div>
    </div>
  );
}

export default Resultados;
import React from 'react';

function Tarjeta({ dia }) {
  // Convertimos el timestamp UNIX (en segundos) a milisegundos multiplicando por 1000
  const fechaUnix = dia.dt || dia.date_epoch;
  const fechaFormateada = new Date(fechaUnix * 1000).toLocaleDateString();

  // Aseguramos que la URL del icono tenga el protocolo completo
  const iconUrl = dia.icon || dia.day?.condition?.icon || '';
  const srcFinal = iconUrl.startsWith('//') ? `https:${iconUrl}` : iconUrl;

  return (
    <div className="tarjeta">
      <h4>{fechaFormateada}</h4>
      {/* Requisito estricto: la clase de la imagen debe ser "tiempoimg" */}
      <img className="tiempoimg" src={srcFinal} alt="Tiempo" />
      <p>Temp: {dia.temp || dia.day?.avgtemp_c}°C</p>
      <p>Humedad: {dia.humidity || dia.day?.avghumidity}%</p>
      <p>Viento: {dia.wind || dia.day?.maxwind_kph}m/s</p>
    </div>
  );
}

export default Tarjeta;

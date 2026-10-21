import React from 'react';

function Tarjeta({ dia }) {
  const fechaUnix = dia.dt || dia.date_epoch;
  // Requisito estricto del enunciado para pasar el test:
  const fechaFormateada = new Date(fechaUnix * 1000).toLocaleDateString('es-ES', { timeZone: 'UTC' });

  const iconUrl = dia.icon || dia.day?.condition?.icon || '';
  const srcFinal = iconUrl.startsWith('//') ? `https:${iconUrl}` : iconUrl;

  return (
    <div className="tarjeta">
      <h4>{fechaFormateada}</h4>
      <img className="tiempoimg" src={srcFinal} alt="Tiempo" />
      <p>Temp: {dia.temp || dia.day?.avgtemp_c}°C</p>
      <p>Humedad: {dia.humidity || dia.day?.avghumidity}%</p>
      {/* Cambiado m/s por km/h según la maqueta */}
      <p>Viento: {dia.wind || dia.day?.maxwind_kph} km/h</p>
    </div>
  );
}

export default Tarjeta;

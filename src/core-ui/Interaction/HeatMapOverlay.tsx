import { useEffect, useRef } from 'react';
import heatExample from '../../assets/heatExample.png';

// Componente para crear una capa con zonas de calor simuladas
const HeatMapLayer = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
    useEffect(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
  
        if (ctx) {
          // Obtener dimensiones reales del contenedor del canvas
          const canvasWidth = canvas.clientWidth;
          const canvasHeight = canvas.clientHeight;
  
          // Ajustar el tamaño del canvas
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
  
          // Limpiar el canvas antes de redibujar
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
          // 1. Dibujar una capa azul con 35% de transparencia
          ctx.fillStyle = 'rgba(0, 0, 255, 0.35)'; // Azul con 35% de transparencia
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
          // 2. Generar zonas de calor aleatorias
          const numZones = 10; // Número de zonas de calor
          const heatZones = Array.from({ length: numZones }, () => ({
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
            radius: 50 + Math.random() * 50, // Radio entre 50 y 100
          }));
  
          // 3. Dibujar las zonas de calor con mezcla de colores
          ctx.globalCompositeOperation = 'lighter'; // Mezcla de colores más clara
  
          heatZones.forEach((zone) => {
            const gradient = ctx.createRadialGradient(
              zone.x,
              zone.y,
              zone.radius * 0.1, // Centro de la zona
              zone.x,
              zone.y,
              zone.radius // Borde externo
            );
  
            // Definir colores con mayor opacidad para mejor visibilidad
            gradient.addColorStop(0, 'rgba(255, 0, 0, 0.9)');   // Rojo intenso
            gradient.addColorStop(0.2, 'rgba(255, 165, 0, 0.8)'); // Naranja
            gradient.addColorStop(0.4, 'rgba(255, 255, 0, 0.7)'); // Amarillo
            gradient.addColorStop(0.6, 'rgba(0, 255, 0, 0.6)');   // Verde
            gradient.addColorStop(0.8, 'rgba(0, 0, 255, 0.5)');   // Azul
            gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');       // Transparente
  
            // Dibujar el círculo con el degradado
            ctx.beginPath();
            ctx.arc(zone.x, zone.y, zone.radius, 0, 2 * Math.PI);
            ctx.fillStyle = gradient;
            ctx.fill();
          });
  
          // Restaurar la composición a su modo normal
          ctx.globalCompositeOperation = 'source-over';
        }
      }
    }, []);
  
    return (
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '800px',
          height: '704px',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    );
  };
  

// Componente principal que muestra la imagen con la capa de calor
export const HeatMapOverlay = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden', // Evitar desbordamiento
      }}
    >
      {/* Imagen de fondo */}
      <img
        src={heatExample}
        alt="Fondo con zonas de calor"
        style={{
          width: '800px',
          height: '704',
          objectFit: 'fill', // Llenar todo el contenedor
        }}
      />

      {/* Capa de calor */}
      <HeatMapLayer />
    </div>
  );
};

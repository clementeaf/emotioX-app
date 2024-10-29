import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import { Stage as PixiStage, Container, Graphics, Sprite } from '@pixi/react';
import { Graphics as PixiGraphics } from '@pixi/graphics';
import { Box, Typography, Button } from '@mui/material';
import Konva from 'konva';
import heatExample from '../../assets/heatExample.png';

// Definir la interfaz para el rectángulo
interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}

// Definir la interfaz para el punto de calor
interface HeatPoint {
  x: number;
  y: number;
  intensity: number;
}

// Generar datos aleatorios para el mapa de calor
const generateRandomHeatmapData = (numPoints: number): HeatPoint[] => {
  const data: HeatPoint[] = [];
  for (let i = 0; i < numPoints; i++) {
    data.push({
      x: Math.random() * 800,
      y: Math.random() * 600,
      intensity: Math.random(),
    });
  }
  return data;
};

// Función para obtener color de gradiente basado en la intensidad
const getGradientColor = (intensity: number): number => {
  const r = Math.round(255 * intensity); // Rojo
  const g = Math.round(255 * (1 - intensity)); // Verde
  const b = Math.round(255 * (0.5 - Math.abs(intensity - 0.5))); // Azul
  return (r << 16) + (g << 8) + b; // Convertir a formato hexadecimal
};

// Componente para el mapa de calor con @pixi/react
const HeatmapLayer: React.FC<{ data: HeatPoint[] }> = ({ data }) => {
  const drawHeatmap = (graphics: PixiGraphics) => {
    graphics.clear(); // Limpiar gráficos previos

    data.forEach((point) => {
      const color = getGradientColor(point.intensity); // Obtener color de gradiente
      graphics.beginFill(color, point.intensity); // Aplicar color con opacidad
      graphics.drawCircle(point.x, point.y, 15); // Reducir tamaño del círculo
      graphics.endFill(); // Finalizar el dibujo
    });
  };

  return <Graphics draw={drawHeatmap} />;
};

// Componente para el rectángulo seleccionable con Konva
const SelectableRect: React.FC<RectProps & {
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: RectProps) => void;
}> = ({ x, y, width, height, id, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  return (
    <>
      <Rect
        ref={shapeRef}
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={isSelected ? 'green' : 'blue'}
        strokeWidth={2}
        draggable
        dragBoundFunc={(pos) => {
          // Restringir el movimiento del rectángulo dentro de los límites de la imagen
          const newX = Math.max(0, Math.min(800 - width, pos.x));
          const newY = Math.max(0, Math.min(600 - height, pos.y));
          return { x: newX, y: newY };
        }}
        onClick={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
            width,
            height,
            id,
          });
        }}
      />
      {isSelected && shapeRef.current && (
        <Transformer
          ref={trRef}
          nodes={[shapeRef.current]}
          boundBoxFunc={(oldBox, newBox) => {
            // Limitar el tamaño mínimo del rectángulo
            if (newBox.width < 5 || newBox.height < 5) return oldBox;
            return newBox;
          }}
        />
      )}
    </>
  );
};

// Componente principal
export const HeatmapSelector: React.FC = () => {
  const [rects, setRects] = useState<RectProps[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatPoint[]>(generateRandomHeatmapData(50));

  const handleNewRect = () => {
    const newRect: RectProps = {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      id: `rect${rects.length + 1}`,
    };
    setRects((prevRects) => [...prevRects, newRect]);
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleChange = (newAttrs: RectProps) => {
    const updatedRects = rects.map((rect) =>
      rect.id === selectedId ? newAttrs : rect
    );
    setRects(updatedRects);
  };

  const handleDelete = () => {
    setRects(rects.filter((rect) => rect.id !== selectedId));
    setSelectedId(null);
  };

  const regenerateHeatmap = () => {
    setHeatmapData(generateRandomHeatmapData(50));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Heatmap Selector</Typography>

      {/* Contenedor combinado para Pixi y Konva */}
      <div style={{ position: 'relative', width: '800px', height: '600px' }}>
        {/* Canvas de Pixi para el mapa de calor y la imagen de fondo */}
        <PixiStage width={800} height={600} options={{ backgroundColor: 0xffffff }}>
          <Container>
            {/* Renderizar la imagen de fondo */}
            <Sprite
              image={heatExample}
              x={0}
              y={0}
              width={800}
              height={600}
              alpha={0.5}
            />
            {/* Capa del mapa de calor */}
            <HeatmapLayer data={heatmapData} />
          </Container>
        </PixiStage>

        {/* Canvas de Konva para elementos interactivos */}
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          <Stage width={800} height={600}>
            <Layer>
              {rects.map((rect) => (
                <SelectableRect
                  key={rect.id}
                  {...rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => handleSelect(rect.id)}
                  onChange={handleChange}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>

      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleNewRect}>
        Agregar Rectángulo
      </Button>

      {selectedId && (
        <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleDelete}>
          Eliminar Rectángulo
        </Button>
      )}

      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={regenerateHeatmap}>
        Regenerar Mapa de Calor
      </Button>

      {/* Lista de áreas seleccionadas */}
      <Box sx={{ mt: 3, width: '100%' }}>
        {rects.map((rect, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography>Área #{index + 1}</Typography>
            <Typography>{`X: ${rect.x}, Y: ${rect.y}, W: ${rect.width}, H: ${rect.height}`}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HeatmapSelector;

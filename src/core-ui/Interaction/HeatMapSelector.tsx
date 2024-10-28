import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Transformer } from 'react-konva';
import useImage from 'use-image';
import { Box, Typography, Button } from '@mui/material';
import h337 from 'heatmap.js';
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

// Dataset simulado de la máscara de calor
const heatmapData = [
  { x: 50, y: 40, value: 1 }, // Menor intensidad
  { x: 200, y: 120, value: 2 }, // Media intensidad
  { x: 350, y: 200, value: 3 }, // Alta intensidad
  { x: 500, y: 300, value: 5 }, // Máxima intensidad
];

// Componente para gestionar el rectángulo seleccionable
interface SelectableRectProps {
  rect: RectProps;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (rect: RectProps) => void;
}

const SelectableRect: React.FC<SelectableRectProps> = ({ rect, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef<Konva.Rect | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        ref={shapeRef}
        {...rect}
        fill="transparent"
        stroke="blue"
        strokeWidth={2}
        dash={[5, 5]}
        draggable
        onClick={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...rect,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...rect,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

// Componente principal
export const HeatmapSelector = () => {
  const [rects, setRects] = useState<RectProps[]>([]); // Estado con tipo definido
  const [selectedId, setSelectedId] = useState<string | null>(null); // ID del rectángulo seleccionado
  const [image] = useImage(heatExample); // Cargar imagen de fondo
  const heatmapRef = useRef<HTMLDivElement | null>(null); // Ref para heatmap.js

  // Inicializar el mapa de calor al montar el componente
  useEffect(() => {
    if (heatmapRef.current) {
      const heatmapInstance = h337.create({
        container: heatmapRef.current,
        maxOpacity: 0.6,
        radius: 50,
        blur: 0.9,
        gradient: {
          0.2: 'yellow',
          0.5: 'orange',
          0.8: 'red',
        },
      });

      heatmapInstance.setData({
        max: 5,
        data: heatmapData,
      });
    }
  }, []);

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Heatmap Selector</Typography>

      {/* Canvas interactivo */}
      <Box
        ref={heatmapRef}
        sx={{
          position: 'relative',
          width: '800px',
          height: '600px',
          marginBottom: '16px',
          backgroundColor: '#fff',
        }}
      >
        <Stage
          width={800}
          height={600}
          onMouseDown={(e) => {
            const clickedOnEmpty = e.target === e.target.getStage();
            if (clickedOnEmpty) setSelectedId(null);
          }}
        >
          <Layer>
            {/* Imagen de fondo */}
            {image && (
              <KonvaImage
                image={image}
                width={800}
                height={600}
              />
            )}

            {/* Rectángulos seleccionables */}
            {rects.map((rect, index) => (
              <SelectableRect
                key={index}
                rect={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => handleSelect(rect.id)}
                onChange={handleChange}
              />
            ))}
          </Layer>
        </Stage>
      </Box>

      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleNewRect}>
        Agregar Rectángulo
      </Button>

      {selectedId && (
        <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleDelete}>
          Eliminar Rectángulo
        </Button>
      )}

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

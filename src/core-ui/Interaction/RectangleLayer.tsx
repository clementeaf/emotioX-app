import { Stage, Layer, Rect, Transformer } from 'react-konva';
import { useRef, useState, useEffect } from 'react';
import type { KonvaEventObject } from 'konva/lib/Node';
import { Button, Typography } from '@mui/material';
import Konva from 'konva';

export interface RectZone {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}

export interface HeatZone {
  x: number;
  y: number;
  radius: number;
}

export const RectangleLayer = ({
  containerWidth,
  containerHeight,
  rectangles,
  setRectangles,
  heatZones,
  addLogEntry,
}: {
  containerWidth: number;
  containerHeight: number;
  rectangles: RectZone[];
  setRectangles: React.Dispatch<React.SetStateAction<RectZone[]>>;
  heatZones: HeatZone[];
  addLogEntry: (log: string) => void;
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  // Usar el Transformer en el rectángulo seleccionado
  useEffect(() => {
    const transformer = transformerRef.current;
    if (transformer && selectedId) {
      const selectedNode = transformer.getStage()?.findOne<Konva.Rect>(`#${selectedId}`);
      if (selectedNode) {
        transformer.nodes([selectedNode]);
        transformer.getLayer()?.batchDraw();
      } else {
        transformer.nodes([]);
      }
    }
  }, [selectedId, rectangles]);

  // Calcular intersección entre rectángulo y zonas de calor
  const detectHeatZoneIntersections = (rect: RectZone) => {
    heatZones.forEach((zone) => {
      const distX = Math.abs(zone.x - (rect.x + rect.width / 2));
      const distY = Math.abs(zone.y - (rect.y + rect.height / 2));
      const distance = Math.sqrt(distX ** 2 + distY ** 2);

      // Verificar si hay superposición
      if (distance < zone.radius) {
        const intensity = 1 - distance / zone.radius;
        const rectArea = rect.width * rect.height;
        const overlapArea = Math.PI * (zone.radius ** 2) * intensity;
        const proportion = Math.min(overlapArea / rectArea, 1);

        addLogEntry(
          `Rect ${rect.id} intersecta con la zona de calor en (${zone.x.toFixed(2)}, ${zone.y.toFixed(2)}) ` +
          `con intensidad ${(intensity * 100).toFixed(1)}% y proporción ${(proportion * 100).toFixed(1)}%.`
        );
      }
    });
  };

  // Crear un nuevo rectángulo
  const addRectangle = () => {
    const newRect: RectZone = {
      x: 375,
      y: 312,
      width: 120,
      height: 80,
      id: `${Date.now()}`,
    };
    setRectangles((prev) => [...prev, newRect]);
    setSelectedId(newRect.id);
    detectHeatZoneIntersections(newRect);
  };

  return (
    <>
      <Button
        onClick={addRectangle}
        variant="contained"
        style={{ position: 'absolute', bottom: 150, left: 10, zIndex: 999 }}
      >
        <Typography>Agregar Rectángulo</Typography>
      </Button>

      <Stage
        width={containerWidth}
        height={containerHeight}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 3 }}
        onMouseDown={(e: KonvaEventObject<MouseEvent>) => {
          if (e.target === e.target.getStage()) {
            setSelectedId(null);
          }
        }}
      >
        <Layer>
          {rectangles.map((rect) => (
            <Rect
              key={rect.id}
              id={rect.id}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill="rgba(255, 255, 255, 0.3)"
              stroke={rect.id === selectedId ? 'blue' : 'red'}
              strokeWidth={rect.id === selectedId ? 2 : 1}
              draggable
              onClick={() => setSelectedId(rect.id)}
              onDragMove={(e) => {
                const node = e.target;

                // Calcular nuevas coordenadas, limitadas dentro del contenedor
                const newX = Math.max(0, Math.min(node.x(), containerWidth - rect.width));
                const newY = Math.max(0, Math.min(node.y(), containerHeight - rect.height));

                node.x(newX);
                node.y(newY);
              }}
              onDragEnd={(e) => {
                const node = e.target;
                const newX = Math.max(0, Math.min(node.x(), containerWidth - rect.width));
                const newY = Math.max(0, Math.min(node.y(), containerHeight - rect.height));

                setRectangles((prev) =>
                  prev.map((r) => (r.id === rect.id ? { ...r, x: newX, y: newY } : r))
                );

                // Detectar intersección después de mover el rectángulo
                detectHeatZoneIntersections({ ...rect, x: newX, y: newY });
              }}
              onTransformEnd={(e) => {
                const node = e.target as Konva.Rect;
                const newWidth = Math.max(20, node.width() * node.scaleX());
                const newHeight = Math.max(20, node.height() * node.scaleY());

                // Limitar la posición y dimensiones del rectángulo dentro del contenedor
                let newX = Math.max(0, Math.min(node.x(), containerWidth - newWidth));
                let newY = Math.max(0, Math.min(node.y(), containerHeight - newHeight));

                // Ajustar el ancho y alto si el rectángulo se sale del contenedor
                if (newY + newHeight > containerHeight) {
                  newY = containerHeight - newHeight;
                }
                if (newX + newWidth > containerWidth) {
                  newX = containerWidth - newWidth;
                }

                setRectangles((prev) =>
                  prev.map((r) =>
                    r.id === rect.id
                      ? { ...r, x: newX, y: newY, width: newWidth, height: newHeight }
                      : r
                  )
                );

                node.scaleX(1);
                node.scaleY(1);
                node.x(newX);
                node.y(newY);
                node.width(newWidth);
                node.height(newHeight);

                // Detectar intersección después de redimensionar
                detectHeatZoneIntersections({
                  ...rect,
                  x: newX,
                  y: newY,
                  width: newWidth,
                  height: newHeight,
                });
              }}
              ref={(node) => {
                if (node && node.id() === selectedId) {
                  transformerRef.current?.nodes([node]);
                }
              }}
            />
          ))}
          {selectedId && (
            <Transformer
              ref={transformerRef}
              resizeEnabled={true}
              rotateEnabled={false}
              keepRatio={false}
              enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
            />
          )}
        </Layer>
      </Stage>
    </>
  );
};

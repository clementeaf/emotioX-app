import { Stage, Layer, Rect, Transformer } from 'react-konva';
import { useRef, useState, useEffect } from 'react';
import type { KonvaEventObject } from 'konva/lib/Node';
import Konva from 'konva';
import { Button, Typography } from '@mui/material';

export interface RectZone {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}

export const RectangleLayer = ({
  containerWidth,
  containerHeight,
}: {
  containerWidth: number;
  containerHeight: number;
}) => {
  const [rectangles, setRectangles] = useState<RectZone[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

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
  };

  // Usar el `Transformer` en el rectángulo seleccionado
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

  return (
    <>
      <Button
        onClick={addRectangle}
        variant='contained'
        style={{ position: 'absolute', bottom: 150, left: 10, zIndex: 999 }}
      >
        <Typography>Agregar Rectángulo</Typography>
      </Button>

      <Stage
        width={containerWidth}
        height={containerHeight}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 3 }}
        onMouseDown={(e: KonvaEventObject<MouseEvent>) => {
          // Desactivar la selección si se hace clic en el fondo
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
                // Limitar el arrastre en tiempo real dentro del área visible
                const node = e.target;
                const newX = Math.max(0, Math.min(node.x(), 800 - rect.width));
                const newY = Math.max(0, Math.min(node.y(), 475 - rect.height));

                node.x(newX);
                node.y(newY);
              }}
              onDragEnd={(e) => {
                const node = e.target;
                const newX = Math.max(0, Math.min(node.x(), 800 - rect.width));
                const newY = Math.max(0, Math.min(node.y(), 475 - rect.height));

                setRectangles((prev) =>
                  prev.map((r) =>
                    r.id === rect.id ? { ...r, x: newX, y: newY } : r
                  )
                );
              }}
              onTransformEnd={(e) => {
                const node = e.target as Konva.Rect;
                let newWidth = node.width() * node.scaleX();
                let newHeight = node.height() * node.scaleY();
                
                // Limitar ancho y alto dentro del área visible
                const newX = Math.max(0, Math.min(node.x(), 800 - newWidth));
                const newY = Math.max(0, Math.min(node.y(), 475 - newHeight));

                // Ajustar ancho y alto si exceden el límite
                if (newX + newWidth > 800) {
                  newWidth = 800 - newX;
                }
                if (newY + newHeight > 475) {
                  newHeight = 475 - newY;
                }

                setRectangles((prev) =>
                  prev.map((r) =>
                    r.id === rect.id
                      ? {
                          ...r,
                          x: newX,
                          y: newY,
                          width: newWidth,
                          height: newHeight,
                        }
                      : r
                  )
                );

                // Resetear la escala después de la transformación
                node.scaleX(1);
                node.scaleY(1);
                node.x(newX);
                node.y(newY);
                node.width(newWidth);
                node.height(newHeight);
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

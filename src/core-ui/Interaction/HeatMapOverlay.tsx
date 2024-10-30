import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import Konva from 'konva';
import heatExample from '../../assets/heatExample.png';
import type { KonvaEventObject } from 'konva/lib/Node';

interface RectZone {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}

interface HeatZone {
  x: number;
  y: number;
  radius: number;
}

const HeatMapLayer = ({
  containerWidth,
  containerHeight,
  heatZones,
}: {
  containerWidth: number;
  containerHeight: number;
  heatZones: HeatZone[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = containerWidth;
        canvas.height = containerHeight;
        ctx.clearRect(0, 0, containerWidth, containerHeight);

        ctx.fillStyle = 'rgba(0, 0, 255, 0.35)';
        ctx.fillRect(0, 0, containerWidth, containerHeight);

        ctx.globalCompositeOperation = 'lighter';
        heatZones.forEach((zone) => {
          const gradient = ctx.createRadialGradient(
            zone.x,
            zone.y,
            zone.radius * 0.1,
            zone.x,
            zone.y,
            zone.radius
          );

          gradient.addColorStop(0, 'rgba(255, 0, 0, 0.9)');
          gradient.addColorStop(0.2, 'rgba(255, 165, 0, 0.8)');
          gradient.addColorStop(0.4, 'rgba(255, 255, 0, 0.7)');
          gradient.addColorStop(0.6, 'rgba(0, 255, 0, 0.6)');
          gradient.addColorStop(0.8, 'rgba(0, 0, 255, 0.5)');
          gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');

          ctx.beginPath();
          ctx.arc(zone.x, zone.y, zone.radius, 0, 2 * Math.PI);
          ctx.fillStyle = gradient;
          ctx.fill();
        });

        ctx.globalCompositeOperation = 'source-over';
      }
    }
  }, [containerWidth, containerHeight, heatZones]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 115,
        width: 800,
        height: 475,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
};

const RectangleLayer = ({
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
      x: containerWidth / 2 - 50,
      y: containerHeight / 2 - 50,
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
      <button
        onClick={addRectangle}
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 4 }}
      >
        Agregar Rectángulo
      </button>

      <Stage
        width={containerWidth}
        height={containerHeight}
        style={{ position: 'absolute', zIndex: 3, top: 115 }}
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
              onDragEnd={(e) => {
                setRectangles((prev) =>
                  prev.map((r) =>
                    r.id === rect.id ? { ...r, x: e.target.x(), y: e.target.y() } : r
                  )
                );
              }}
              onTransformEnd={(e) => {
                const node = e.target as Konva.Rect;
                const newWidth = node.width() * node.scaleX();
                const newHeight = node.height() * node.scaleY();

                setRectangles((prev) =>
                  prev.map((r) =>
                    r.id === rect.id
                      ? {
                          ...r,
                          x: node.x(),
                          y: node.y(),
                          width: newWidth,
                          height: newHeight,
                        }
                      : r
                  )
                );

                // Resetear la escala después de la transformación
                node.scaleX(1);
                node.scaleY(1);
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

export const HeatMapOverlay = () => {
  const heatZonesRef = useRef<HeatZone[]>([]);
  const containerWidth = 800;
  const containerHeight = 704;

  if (heatZonesRef.current.length === 0) {
    const numZones = 10;
    const zones = Array.from({ length: numZones }, () => ({
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      radius: 50 + Math.random() * 50,
    }));

    heatZonesRef.current = zones;
  }

  return (
    <div style={{ maxWidth: '800px', maxHeight: '780px', margin: '0 auto', overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: containerWidth, height: containerHeight }}>
        <img
          src={heatExample}
          alt="Fondo con zonas de calor"
          style={{
            width: '800px',
            height: '704px',
            position: 'absolute',
            top: 0,
            left: 0,
            objectFit: 'contain',
            zIndex: 1,
          }}
        />

        <HeatMapLayer
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          heatZones={heatZonesRef.current}
        />

        <RectangleLayer containerWidth={containerWidth} containerHeight={containerHeight} />
      </div>
    </div>
  );
};

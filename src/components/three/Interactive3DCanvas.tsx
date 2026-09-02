"use client";

import {
  Canvas,
  useThree,
  useFrame,
} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { BoxGeometry, MeshStandardMaterial } from "three";

const INITIAL_BOX_SIZE = 2;
const BOX_SPACING = 4;
const COLORS = [
  "#7C6AFF",
  "#6B8AFF",
  "#A78BFA",
  "#6C5CE7",
  "#805AD5",
];

interface Interactive3DCanvasProps {
  className?: string;
}

export default function Interactive3DCanvas({
  className,
}: Interactive3DCanvasProps) {
  const { camera, size } = useThree();
  const [interacted, setInteracted] = useState(false);
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);

  const [reducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? /Mobi|Android|iPhone|iPad/.test(navigator.userAgent) : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (_: MediaQueryListEvent) => {
      // no-op
    };
    handler(mq as any);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handlePointerOver = (boxId: number) => {
    if (reducedMotion || isMobile) return;
    setHoveredBox(boxId);
  };

  const handlePointerOut = () => {
    setHoveredBox(null);
  };

  const handlePointerDown = (boxId: number) => {
    if (reducedMotion || isMobile) return;
    setInteracted(true);
    setHoveredBox(boxId);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInteracted(false);
        setHoveredBox(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const boxes = Array.from({ length: COLORS.length }, (_, i) => ({
    position: [
      (i % 5) * BOX_SPACING - 8,
      Math.floor(i / 5) * BOX_SPACING - 4,
      0,
    ] as [number, number, number],
    color: COLORS[i],
    id: i,
  }));

  const baseClassName = [
    "relative",
    "overflow-hidden",
    reducedMotion ? "reduced-motion" : "",
    isMobile ? "mobile-3d" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={baseClassName} style={{ height: isMobile ? "250px" : "400px" }}>
      {!reducedMotion && !isMobile && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            rotateSpeed={0.3}
          />
        </div>
      )}

      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 10] }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x23212C, 1);
        }}
      >
        <group>
          {boxes.map((box, i) => (
            <mesh
              key={i}
              position={box.position}
              onPointerOver={() => handlePointerOver(box.id)}
              onPointerOut={handlePointerOut}
              onPointerDown={() => handlePointerDown(box.id)}
            >
              <boxGeometry
                args={[INITIAL_BOX_SIZE, INITIAL_BOX_SIZE, INITIAL_BOX_SIZE]}
              />
              <meshStandardMaterial
                color={box.color}
                flatShading={false}
              />
            </mesh>
          ))}
        </group>
      </Canvas>

      {reducedMotion && (
        <div
          style={{
            background: "rgba(35,33,44,0.8)",
            color: "#F1F5F9",
            fontFamily: "sans-serif",
          }}
        >
          <p className="text-center text-sm">
            Interactive 3D experience — reduced motion preference detected.
            Viewing static project showcase instead.
          </p>
        </div>
      )}

      {isMobile && !reducedMotion && (
        <div
          style={{
            background: "rgba(35,33,44,0.8)",
            color: "#F1F5F9",
            fontFamily: "sans-serif",
          }}
        >
          <p className="text-center text-sm">
            Touch devices — showing simplified 3D project showcase.
          </p>
        </div>
      )}
    </div>
  );
}
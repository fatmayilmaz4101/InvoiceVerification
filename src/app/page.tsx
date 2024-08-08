"use client";

import { Card } from "primereact/card";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function Home() {
  return (
    <Card
      style={{
        height: "calc(100vh - 12rem)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
        <Fireworks
          key={x}
          decorateOptions={(options: any) => {
            return {
              ...options,
              particleCount: 500,
              origin: { x: 1 * Math.random(), y: 0.6 * Math.random() },
            };
          }}
          autorun={{ speed: 1, delay: 3 }}
        />
      ))}

      <h1 className="">Tebrikler IPhone 17 Pro Max kazandınız</h1>
    </Card>
  );
}

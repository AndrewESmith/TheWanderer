import React, { useState, useEffect } from "react";
import { getDominantColor } from "../utils/colorExtractor";
import { ICONS } from "../maze";

/**
 * Demo component to showcase dominant color extraction for soil and rock
 */
export const ColorDemo: React.FC = () => {
  const [colors, setColors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadColors = async () => {
      try {
        const soilColor = await getDominantColor(ICONS.soil);
        const rockColor = await getDominantColor(ICONS.rock);

        setColors({
          soil: soilColor,
          rock: rockColor,
        });
      } catch (error) {
        console.error("Failed to load colors:", error);
        setColors({
          soil: "#a1887f",
          rock: "#795548",
        });
      } finally {
        setLoading(false);
      }
    };

    loadColors();
  }, []);

  if (loading) {
    return <div>Loading dominant colors...</div>;
  }

  return (
    <div style={{ padding: "20px", background: "#f0f0f0", margin: "10px" }}>
      <h3>Dominant Color Extraction Demo</h3>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div>Original Soil</div>
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundImage: `url(${ICONS.soil})`,
              backgroundSize: "cover",
              border: "2px solid #333",
            }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <div>Extracted Color</div>
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: colors.soil,
              border: "2px solid #333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "#fff",
              textShadow: "1px 1px 1px #000",
            }}
          >
            {colors.soil}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div>Original Rock</div>
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundImage: `url(${ICONS.rock})`,
              backgroundSize: "cover",
              border: "2px solid #333",
            }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <div>Extracted Color</div>
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: colors.rock,
              border: "2px solid #333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "#fff",
              textShadow: "1px 1px 1px #000",
            }}
          >
            {colors.rock}
          </div>
        </div>
      </div>
    </div>
  );
};

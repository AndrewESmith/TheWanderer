import React, { useState, useEffect } from "react";
import { SOUND_ASSETS } from "../config/sound-config";
import {
  runSoundDiagnostics,
  type DiagnosticResult,
} from "../utils/sound-diagnostics";

export const SoundDebugger: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    try {
      const results = await runSoundDiagnostics();
      setDiagnostics(results);
    } catch (error) {
      console.error("Error running diagnostics:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const testDirectAccess = async (path: string) => {
    try {
      const response = await fetch(path);
      console.log(
        `Direct test of ${path}:`,
        response.status,
        response.statusText
      );
      return response.ok;
    } catch (error) {
      console.error(`Direct test of ${path} failed:`, error);
      return false;
    }
  };

  const testAllDirectAccess = async () => {
    console.log("Testing direct access to all sound files...");
    for (const [soundId, asset] of Object.entries(SOUND_ASSETS)) {
      const path = asset.src[0];
      if (path) {
        const accessible = await testDirectAccess(path);
        console.log(`${soundId}: ${path} -> ${accessible ? "OK" : "FAILED"}`);
      }
    }
  };

  useEffect(() => {
    // Run diagnostics on mount
    runDiagnostics();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "12px",
        maxWidth: "400px",
        maxHeight: "300px",
        overflow: "auto",
        zIndex: 1000,
      }}
    >
      <h3>Sound Debugger</h3>
      <button onClick={runDiagnostics} disabled={isRunning}>
        {isRunning ? "Running..." : "Run Diagnostics"}
      </button>
      <button onClick={testAllDirectAccess} style={{ marginLeft: "5px" }}>
        Test Direct Access
      </button>

      {diagnostics.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <h4>
            Results ({diagnostics.filter((d) => d.accessible).length}/
            {diagnostics.length} accessible):
          </h4>
          {diagnostics.map((result) => (
            <div
              key={result.soundId}
              style={{
                marginBottom: "5px",
                color: result.accessible ? "#90EE90" : "#FFB6C1",
              }}
            >
              <strong>{result.soundId}</strong>:{" "}
              {result.accessible ? "✅" : "❌"}
              <br />
              <small>
                {result.originalPath} → {result.resolvedPath || "FAILED"}
              </small>
              {result.error && <br />}
              {result.error && (
                <small style={{ color: "#FF6B6B" }}>
                  Error: {result.error}
                </small>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

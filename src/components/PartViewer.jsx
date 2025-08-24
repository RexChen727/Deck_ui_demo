// src/components/PartViewer.jsx
import React from "react";

function Thumb({ part, onClick, isActive }) {
  return (
    <button
      className={`thumb ${isActive ? "thumb--active" : ""}`}
      onClick={onClick}
      title={part.name}
    >
      <img
        src={part.image}
        alt={part.name}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
    </button>
  );
}

export default function PartViewer({ activePart, allParts, onSelect }) {
  return (
     <div className="viewer-wrap">
      <div className="grid">
        <div className="main">
          <div className="panel">
            <div className="panel__title">{activePart.name}</div>
            <div className="panel__desc">
              <img
                src={activePart.image}
                alt={activePart.name}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>

        <div className="side equal-height">
          {allParts.map((p) => (
            <Thumb
              key={p.id}
              part={p}
              onClick={() => onSelect(p.id)}
              isActive={p.id === activePart.id}
            />
          ))}
        </div>
      </div>
    </div>

  );
}



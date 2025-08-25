// src/components/PartViewer.jsx
import React from "react";

function Thumb({ part, onClick, isActive }) {
  return (
    <button
      className={`thumb ${isActive ? "thumb--active" : ""}`}
      onClick={onClick}
      title={part.name}
      style={{
        width: "60px",
        height: "60px",
        marginRight: "8px",
        border: isActive ? "2px solid #007bff" : "1px solid #ccc",
        borderRadius: "4px",
        overflow: "hidden",
        padding: 0,
      }}
    >
      <img
        src={part.image}
        alt={part.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </button>
  );
}

export default function PartViewer2({ activePart, allParts, onSelect }) {
  return (
    <div className="viewer-wrap">
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

      {/* 缩略图排成一行，靠左对齐 */}
      <div
        className="thumbnails-row"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "12px",
        }}
      >
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
  );
}
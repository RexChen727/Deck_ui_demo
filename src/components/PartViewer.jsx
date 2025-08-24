// src/components/PartViewer.jsx
import React from "react";

function Thumb({ part, onClick }) {
  return (
    <button className="thumb" onClick={onClick} title={part.name}>
      <div className="thumb__inner">{part.name}</div>
    </button>
  );
}

export default function PartViewer({ activePart, otherParts, onSelect }) {
  return (
    <div className="grid">
      <div className="main">
        <div className="panel">
          <div className="panel__title">{activePart.name}</div>
          <div className="panel__desc">{activePart.preview}</div>
          {/* 这里可替换成真实渲染（图片/Canvas/3D/D3） */}
        </div>
      </div>
      <div className="side equal-height">
        {otherParts.map((p) => (
          <Thumb key={p.id} part={p} onClick={() => onSelect(p.id)} />
        ))}
      </div>
    </div>
  );
}

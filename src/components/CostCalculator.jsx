// components/CostCalculator.jsx
import { useMemo, useState } from "react";

/**
 * 雏形说明：
 * - 完全独立于上面的 Stage 2 状态；后续你要联动也很容易（把 props 接进来即可）
 * - 默认包含 4 行：Stumps / Bearers / Joists / Boards
 * - 每行字段：显示名称、规格(可填)、长度(米, 可填)、Waste(%)、单价($/m)；右侧实时显示小计
 * - 下面显示总米数、总价；有 Save 与 Calculate Cost 两个按钮
 */

const defaultRows = [
  { key: "stumps",  label: "Stumps",  size: "160 × 160", length: 0, waste: 5, price: 0 },
  { key: "bearers", label: "Bearers", size: "200 × 45",  length: 0, waste: 5, price: 0 },
  { key: "joists",  label: "Joists",  size: "100 × 45",  length: 0, waste: 5, price: 0 },
  { key: "boards",  label: "Boards",  size: "89 × 19",   length: 0, waste: 5, price: 0 },
];

export default function CostCalculator({
  initial = defaultRows,
  onSave,             // 可选：保存时回调 rows
  onCalculate,        // 可选：计算时回调 {rows, totalMeters, totalCost}
  title = "STAGE 3 — Cost Calculator",
}) {
  const [rows, setRows] = useState(initial);

  const update = (idx, patch) => {
    setRows((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], ...patch };
      return next;
    });
  };

  const withWaste = (length, wastePercent) =>
    Number(length) * (1 + Number(wastePercent || 0) / 100);

  const subtotal = (r) => withWaste(r.length || 0, r.waste || 0) * (Number(r.price) || 0);

  const totalMeters = useMemo(
    () => rows.reduce((sum, r) => sum + withWaste(r.length || 0, r.waste || 0), 0),
    [rows]
  );
  const totalCost = useMemo(
    () => rows.reduce((sum, r) => sum + subtotal(r), 0),
    [rows]
  );

  const handleSave = () => {
    onSave?.(rows);
    console.log("Saved rows:", rows);
  };

  const handleCalculate = () => {
    const payload = { rows, totalMeters, totalCost };
    onCalculate?.(payload);
    console.log("Calculated:", payload);
  };

    return (
    <section className="cost-card">
      <div className="cost-header">
        <h2 className="cost-title">{title}</h2>
      </div>

      <div className="cost-table">
        {/* 表头：Size + Length 合并 */}
        <div className="cost-head">
          <div>Part</div>
          <div>Data (from Stage 2)</div>
          <div>Waste (%)</div>
          <div>Price ($ / m)</div>
          <div className="right">Subtotal ($)</div>
        </div>

        {rows.map((r, i) => (
          <div className="cost-row" key={r.key}>
            {/* Part */}
            <div className="label">{r.label}</div>

            {/* 合并列：只显示占位 */}
            <div className="muted">data from inputs</div>

            {/* Waste */}
            <div className="waste-wrap">
              <span className="plus">+</span>
              <input
                className="input waste"
                type="number"
                min="0"
                step="1"
                value={r.waste}
                onChange={(e) => update(i, { waste: Number(e.target.value) })}
              />
              <span className="suffix">%</span>
            </div>

            {/* Price */}
            <div className="price-wrap">
              <span className="at">@</span>
              <span className="dollar">$</span>
              <input
                className="input price"
                type="number"
                min="0"
                step="0.01"
                value={r.price}
                onChange={(e) => update(i, { price: Number(e.target.value) })}
              />
              <span className="unit">/ m</span>
            </div>

            {/* Subtotal */}
            <div className="right subtotal">
              {subtotal(r).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="cost-footer">
        <div className="totals">
          <div>
            <span className="muted">Total with Waste:</span>{" "}
            <strong>{totalMeters.toFixed(2)} m</strong>
          </div>
          <div>
            <span className="muted">Total Cost:</span>{" "}
            <strong>${totalCost.toFixed(2)}</strong>
          </div>
        </div>
        <div className="actions">
          <button className="btn" onClick={handleSave}>Save</button>
          <button className="btn primary" onClick={handleCalculate}>Calculate Cost</button>
        </div>
      </div>
    </section>
  );
;
}

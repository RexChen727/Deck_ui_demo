import { useMemo, useState } from "react";
import "./App.css";

const partNames = ["Stumps", "Bearers", "Joists", "Deck Boards"];

const defaultParts = partNames.map((n) => ({
  id: n.toLowerCase().replace(/\s+/g, "-"),
  name: n,
  preview: n + " preview",
}));

const defaultForm = {
  input1: 0,       // 数字
  input2: "A",     // 下拉
  input3: 50,      // 滑块
};

function Thumb({ part, onClick }) {
  return (
    <button className="thumb" onClick={onClick} title={part.name}>
      <div className="thumb__inner">{part.name}</div>
    </button>
  );
}

export default function App() {
  const [parts] = useState(defaultParts);
  const [activeId, setActiveId] = useState(parts[0].id);
  const [formState, setFormState] = useState(
    Object.fromEntries(parts.map((p) => [p.id, { ...defaultForm }]))
  );

  const activePart = useMemo(() => parts.find((p) => p.id === activeId), [parts, activeId]);
  const otherParts = useMemo(() => parts.filter((p) => p.id !== activeId), [parts, activeId]); // 正好 3 个

  const setField = (key, value) => {
    setFormState((prev) => ({
      ...prev,
      [activePart.id]: {
        ...(prev[activePart.id] || {}),
        [key]: value,
      },
    }));
  };

  const values = formState[activePart.id] || defaultForm;

  return (
    <div className="wrap">
      <header className="topbar">
        <h1>STAGE 2 </h1>
        <div className="hint"></div>
      </header>

      {/* 上半区：左大面板 + 右侧 3 个缩略 */}
      <div className="grid">
        <div className="main">
          <div className="panel">
            <div className="panel__title">{activePart.name}</div>
            <div className="panel__desc">{activePart.preview}</div>
            {/* 这里可替换成真实渲染（图片/Canvas/3D） */}
          </div>
        </div>
        <div className="side equal-height">
          {otherParts.map((p) => (
            <Thumb key={p.id} part={p} onClick={() => setActiveId(p.id)} />
          ))}
        </div>
      </div>

      {/* 下半区：表单 + 右侧 3 个缩略（同上） */}
      <div className="grid">
        <div className="main">
          <div className="form">
            <div className="form__title">{activePart.name} Parameters</div>

            <div className="form__grid">
              {/* Input 1：数字 */}
              <label className="field">
                <span className="field__label">Input 1（数字）</span>
                <input
                  className="field__input"
                  type="number"
                  value={values.input1}
                  onChange={(e) => setField("input1", Number(e.target.value))}
                  placeholder="请输入数字"
                />
              </label>

              {/* Input 2：下拉 */}
              <label className="field">
                <span className="field__label">Input 2（选择）</span>
                <select
                  className="select"
                  value={values.input2}
                  onChange={(e) => setField("input2", e.target.value)}
                >
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                </select>
              </label>

              {/* Input 3：滑块 */}
              <label className="field field--full">
                <span className="field__label">Input 3（拖拽滑块）</span>
                <div className="range-row">
                  <input
                    type="range"
                    className="range"
                    min="0"
                    max="100"
                    value={values.input3}
                    onChange={(e) => setField("input3", Number(e.target.value))}
                  />
                  <span className="range-val">{values.input3}</span>
                </div>
              </label>
            </div>

            <div className="actions">
              <button
                onClick={() =>
                  alert("已保存（示例）。当前 JSON：\n" + JSON.stringify(formState[activePart.id] || {}, null, 2))
                }
              >
                保存当前部位
              </button>
              <button onClick={() => console.log("全部表单：", formState)}>在控制台查看全部 JSON</button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

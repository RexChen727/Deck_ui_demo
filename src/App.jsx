import { useMemo, useState } from "react";
import "./App.css";
import PartViewer from "./components/PartViewer";
import StumpsPanel from "./components/panels/StumpsPanel";
import BearersPanel from "./components/panels/BearersPanel";
import JoistsPanel from "./components/panels/JoistsPanel";
import DeckBoardsPanel from "./components/panels/DeckBoardsPanel";
import CostCalculator from "./components/CostCalculator";

const partNames = ["Stumps", "Bearers", "Joists", "Deck Boards"];


const imageMap = {
  "stumps": "1.jpg",
  "bearers": "2.jpg",
  "joists": "3.jpg",
  "deck-boards": "4.jpg",
};

const defaultParts = partNames.map((n) => {
  const id = n.toLowerCase().replace(/\s+/g, "-");  // 生成 id
  return {
    id,
    name: n,
    preview: n + " preview",
    image: `/images/${imageMap[id]}`, // 使用映射表
  };
});

const defaultForm = {
  input1: 0, // 数字
  input2: "A", // 下拉
  input3: 50, // 滑块
};

export default function App() {
  const [parts] = useState(defaultParts);
  const [activeId, setActiveId] = useState(parts[0].id);
  const [formState, setFormState] = useState(
    Object.fromEntries(parts.map((p) => [p.id, { ...defaultForm }]))
  );

  const activePart = useMemo(
    () => parts.find((p) => p.id === activeId),
    [parts, activeId]
  );
  const otherParts = useMemo(
    () => parts.filter((p) => p.id !== activeId),
    [parts, activeId]
  );

  return (
    <div className="wrap">
      <header className="topbar">
        <h1>STAGE 2</h1>
      </header>

      {/* 上半区：组件化展示 */}
      <PartViewer
        activePart={activePart}
        allParts={parts}
        onSelect={setActiveId}
      />

      {/* 下半区：表单显示所有部件 */}

      <div className="form">
        <div className="form__title">All Parts Parameters</div>

        <StumpsPanel
          values={formState["stumps"] || defaultForm}
          onChange={(newValues) =>
            setFormState((prev) => ({ ...prev, stumps: newValues }))
          }
        />
        <BearersPanel
          values={formState["bearers"] || defaultForm}
          onChange={(newValues) =>
            setFormState((prev) => ({ ...prev, bearers: newValues }))
          }
        />
        <JoistsPanel
          values={formState["joists"] || defaultForm}
          onChange={(newValues) =>
            setFormState((prev) => ({ ...prev, joists: newValues }))
          }
        />
        <DeckBoardsPanel
          values={formState["deck-boards"] || defaultForm}
          onChange={(newValues) =>
            setFormState((prev) => ({ ...prev, "deck-boards": newValues }))
          }
        />
        </div>

        <CostCalculator
            onSave={(rows) => console.log("CostCalculator saved:", rows)}
            onCalculate={(data) => console.log("CostCalculator calculated:", data)}
          />
      </div>
      
  );
}

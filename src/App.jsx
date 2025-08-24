import { useMemo, useState } from "react";
import "./App.css";
import PartViewer from "./components/PartViewer";
import StumpsPanel from "./components/panels/StumpsPanel";
import BearersPanel from "./components/panels/BearersPanel";
import JoistsPanel from "./components/panels/JoistsPanel";
import DeckBoardsPanel from "./components/panels/DeckBoardsPanel";

const partNames = ["Stumps", "Bearers", "Joists", "Deck Boards"];

const defaultParts = partNames.map((n) => ({
  id: n.toLowerCase().replace(/\s+/g, "-"),
  name: n,
  preview: n + " preview",
}));

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
        otherParts={otherParts}
        onSelect={setActiveId}
      />

      {/* 下半区：表单显示所有部件 */}
      <div className="grid">
        <div className="main">
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
        </div>
      </div>
    </div>
  );
}

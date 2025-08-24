export default function BearersPanel({ values = { input1: 0, input2: "A", input3: 50 }, onChange }) {
  return (
    <div className="form__section">
      <h3>Bearers</h3>
      <div className="form__grid">
        {/* Input 1 */}
        <label className="field">
          <span className="field__label">Input 1（数字）</span>
          <input
            className="field__input"
            type="number"
            value={values.input1}
            onChange={(e) => onChange({ ...values, input1: Number(e.target.value) })}
          />
        </label>

        {/* Input 2 */}
        <label className="field">
          <span className="field__label">Input 2（选择）</span>
          <select
            className="select"
            value={values.input2}
            onChange={(e) => onChange({ ...values, input2: e.target.value })}
          >
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
          </select>
        </label>

        {/* Input 3 */}
        <label className="field field--full">
          <span className="field__label">Input 3（滑块）</span>
          <div className="range-row">
            <input
              type="range"
              className="range"
              min="0"
              max="100"
              value={values.input3}
              onChange={(e) => onChange({ ...values, input3: Number(e.target.value) })}
            />
            <span className="range-val">{values.input3}</span>
          </div>
        </label>

        <div className="actions">
          <button
            onClick={() =>
              alert("已保存（示例）。当前 JSON：\n" + JSON.stringify(values, null, 2))
            }
          >
            保存 Bearers
          </button>
        </div>
      </div>
    </div>
  );
}


export default function DateRangeFilter({
  mode,
  setMode,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form_group m-0">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="form_control"
          >
            <option value="yearly">Yearly (12 months)</option>
            <option value="weekly">Weekly (7 days)</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>
      {mode === "custom" && (
        <div className="col-md-6">
          <div className="row">
            <div className="col-6">
              <div className="form_group m-0">
                <input type="date" className="form_control" />
              </div>
            </div>
            <div className="col-6">
              <div className="form_group m-0">
                <input type="date" className="form_control" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TargetInput({
  target,
  setTarget,
  onScan,
  loading
}) {
  return (
    <section className="target-section">
      <div className="target-header">
        <div>
          <h2>Start Reconnaissance</h2>
          <p>
            Enter an authorized domain or IP address to begin
            security reconnaissance.
          </p>
        </div>

        <div className="target-icon">
          🔍
        </div>
      </div>

      <label htmlFor="target">
        Target Domain or IP Address
      </label>

      <div className="target-input-row">
        <input
          id="target"
          type="text"
          placeholder="example.com"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={onScan}
          disabled={loading}
          className={loading ? "scanning-button" : ""}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Scanning Target...
            </>
          ) : (
            <>
              <span>▶</span>
              Start Scan
            </>
          )}
        </button>
      </div>

      <div className="authorization-note">
        <span className="authorization-icon">⚠️</span>

        <div>
          <strong>Authorized Security Testing Only</strong>
          <p>
            Only scan domains or IP addresses that you
            own or have explicit permission to assess.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TargetInput;
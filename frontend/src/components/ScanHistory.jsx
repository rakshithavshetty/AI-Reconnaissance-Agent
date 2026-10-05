function ScanHistory({
  history,
  onSelectScan
}) {
  if (!history || history.length === 0) {
    return (
      <section className="history-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              SESSION ACTIVITY
            </span>

            <h2>Scan History</h2>

            <p>
              Previous reconnaissance scans from
              this browser session.
            </p>
          </div>

          <div className="section-icon">
            🗂️
          </div>
        </div>

        <div className="history-empty">
          <div className="history-empty-icon">
            🕘
          </div>

          <h3>No Scan History</h3>

          <p>
            Completed scans will appear here during
            your current session.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="history-section">
      <div className="section-heading">
        <div>
          <span className="section-label">
            SESSION ACTIVITY
          </span>

          <h2>Scan History</h2>

          <p>
            Previous reconnaissance scans from
            this browser session.
          </p>
        </div>

        <div className="section-icon">
          🗂️
        </div>
      </div>

      <div className="history-count">
        <span>{history.length}</span>

        {history.length === 1
          ? " scan completed"
          : " scans completed"}
      </div>

      <div className="history-list">
        {history.map((scan) => {
          const riskClass =
            scan.riskLevel.toLowerCase();

          return (
            <div
              className="history-card"
              key={scan.id}
            >
              <div className="history-main">
                <div className="history-target">
                  <div className="history-target-icon">
                    🎯
                  </div>

                  <div>
                    <h3>{scan.target}</h3>

                    <span>
                      {scan.timestamp}
                    </span>
                  </div>
                </div>

                <div className="history-risk">
                  <span
                    className={`history-risk-badge history-${riskClass}`}
                  >
                    {scan.riskLevel}
                  </span>

                  <strong>
                    {scan.riskScore}/100
                  </strong>
                </div>
              </div>

              <div className="history-details">
                <span>
                  🔍 {scan.findings}{" "}
                  {scan.findings === 1
                    ? "finding"
                    : "findings"}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    onSelectScan(scan)
                  }
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ScanHistory;
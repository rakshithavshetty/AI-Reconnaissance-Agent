function Findings({ findings }) {
  if (!findings || findings.length === 0) {
    return (
      <section className="findings-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              AI ANALYSIS
            </span>

            <h2>Security Findings</h2>

            <p>
              Potential security observations identified
              from the reconnaissance data.
            </p>
          </div>

          <div className="section-icon">
            🔍
          </div>
        </div>

        <div className="no-findings-card">
          <div className="no-findings-icon">
            ✓
          </div>

          <div>
            <h3>No Significant Findings</h3>

            <p>
              The AI analysis did not identify any
              significant security findings from the
              supplied reconnaissance data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="findings-section">
      <div className="section-heading">
        <div>
          <span className="section-label">
            AI ANALYSIS
          </span>

          <h2>Security Findings</h2>

          <p>
            Potential security observations identified
            from the reconnaissance data.
          </p>
        </div>

        <div className="section-icon">
          🔍
        </div>
      </div>

      <div className="findings-count">
        <span>
          {findings.length}
        </span>

        {findings.length === 1
          ? " security finding identified"
          : " security findings identified"}
      </div>

      <div className="findings-list">
        {findings.map((finding, index) => {
          const severity =
            finding.severity || "LOW";

          const severityClass =
            severity.toLowerCase();

          return (
            <article
              className={`finding-card finding-${severityClass}`}
              key={index}
            >
              <div className="finding-top">
                <div className="finding-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <span className="finding-severity">
                  {severity}
                </span>
              </div>

              <div className="finding-content">
                <h3>
                  {finding.title ||
                    "Security Observation"}
                </h3>

                <div className="finding-block">
                  <span className="finding-block-label">
                    DESCRIPTION
                  </span>

                  <p>
                    {finding.description ||
                      "No description was provided by the AI analysis."}
                  </p>
                </div>

                <div className="finding-block recommendation-block">
                  <span className="finding-block-label">
                    RECOMMENDATION
                  </span>

                  <p>
                    {finding.recommendation ||
                      "Review the identified observation and apply appropriate security controls."}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Findings;
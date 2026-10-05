function Recommendations({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <section className="recommendations-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              SECURITY GUIDANCE
            </span>

            <h2>Security Recommendations</h2>

            <p>
              Recommended actions based on the AI
              security assessment.
            </p>
          </div>

          <div className="section-icon">
            💡
          </div>
        </div>

        <div className="no-recommendations-card">
          <div className="recommendation-icon">
            ✓
          </div>

          <div>
            <h3>No Additional Recommendations</h3>

            <p>
              No additional security recommendations
              were generated from the available
              reconnaissance data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="recommendations-section">
      <div className="section-heading">
        <div>
          <span className="section-label">
            SECURITY GUIDANCE
          </span>

          <h2>Security Recommendations</h2>

          <p>
            Recommended actions based on the AI
            security assessment.
          </p>
        </div>

        <div className="section-icon">
          💡
        </div>
      </div>

      <div className="recommendations-count">
        <span>{recommendations.length}</span>

        {recommendations.length === 1
          ? " recommended action"
          : " recommended actions"}
      </div>

      <div className="recommendations-list">
        {recommendations.map(
          (recommendation, index) => (
            <article
              className="recommendation-card"
              key={index}
            >
              <div className="recommendation-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="recommendation-content">
                <span className="recommendation-label">
                  RECOMMENDED ACTION
                </span>

                <p>
                  {recommendation}
                </p>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}

export default Recommendations;
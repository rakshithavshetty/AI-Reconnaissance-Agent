function SummaryCards({ reconnaissance }) {
  if (!reconnaissance) {
    return null;
  }

  const dnsRecords =
    reconnaissance.dns_records || {};

  const subdomains =
    reconnaissance.subdomains || [];

  const ports =
    reconnaissance.ports?.results || [];

  const dnsCount = Object.values(dnsRecords)
    .reduce((total, records) => {
      return total + (records?.length || 0);
    }, 0);

  const subdomainCount =
    subdomains.length;

  const openPorts =
    ports.filter(
      (port) => port.state === "open"
    ).length;

  const summaryData = [
    {
      title: "DNS Records",
      value: dnsCount,
      description: "Records discovered",
      icon: "🌐",
      className: "summary-blue"
    },
    {
      title: "Subdomains",
      value: subdomainCount,
      description: "Subdomains discovered",
      icon: "🔗",
      className: "summary-purple"
    },
    {
      title: "Open Ports",
      value: openPorts,
      description:
        openPorts > 0
          ? "Potentially exposed services"
          : "No open ports detected",
      icon: "🔌",
      className:
        openPorts > 0
          ? "summary-orange"
          : "summary-green"
    }
  ];

  return (
    <section className="summary-section">
      <div className="summary-header">
        <div>
          <span className="section-label">
            SCAN OVERVIEW
          </span>

          <h2>Reconnaissance Summary</h2>
        </div>
      </div>

      <div className="summary-cards">
        {summaryData.map(
          (item, index) => (
            <div
              className={`summary-card ${item.className}`}
              key={index}
            >
              <div className="summary-card-top">
                <div className="summary-icon">
                  {item.icon}
                </div>

                <span className="summary-indicator">
                  ✓
                </span>
              </div>

              <div className="summary-value">
                {item.value}
              </div>

              <div className="summary-label">
                {item.title}
              </div>

              <p className="summary-description">
                {item.description}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default SummaryCards;